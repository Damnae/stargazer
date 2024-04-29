import { openDB, DBSchema } from 'idb'
import { Mutex, MutexGroup } from './mutex'
import useSettings from './settings'
import { ref } from 'vue'

const [settings, _sessionSettings] = useSettings()

const repository = settings.useCustomRepo ? settings.customRepo : 'Dimbreath/StarRailData/'
const apiBase = 'https://api.github.com/repos/' + repository
const jsonBase = 'https://raw.githubusercontent.com/' + repository

export function getRepositoryFileUrl(commitId:string, path:string)
{
    return `https://github.com/${repository}blob/${commitId}/${path}`
}

const configDBVersion = 2
interface ConfigDBv2 extends DBSchema 
{
    files: 
    {
        key: string
        value: 
        {
            hash: string
            path: string
            content: string
        }
    }
    data: 
    {
        key: string
        value: 
        {
            sha: string
            content: string
        }
    }
}

const configDB = openDB<ConfigDBv2>('configDB', configDBVersion, 
{
    upgrade(db, oldVersion, newVersion, _transaction, _event) 
    {
        console.log(`configDB upgrading from ${oldVersion} to ${newVersion}`)
        if (oldVersion < 1)
            db.createObjectStore('files', { keyPath: ['hash', 'path'], })
        if (oldVersion < 2)
            db.createObjectStore('data', { keyPath: ['sha'], })
    },
    blocked(currentVersion, blockedVersion, _event) 
    {
        console.log(`configDB blocked: currentVersion: ${currentVersion}, blockedVersion: ${blockedVersion}`)
    },
    blocking(currentVersion, blockedVersion, _event) 
    {
        console.log(`configDB blocking: currentVersion: ${currentVersion}, blockedVersion: ${blockedVersion}`)
    },
    terminated() 
    {
        console.log(`configDB terminated`)
    },
})

const retrieveJsonMutex = new MutexGroup()
export async function retrieveJson(request:string, commit:string, useApi:boolean) : Promise<any>
{
    const key = `${useApi}|${commit}|${request}`
    return await retrieveJsonMutex.runExclusive(key, async () =>
    {
        if (!useApi)
        {
            const fileMap = await getFileMap(commit)
            const sha = fileMap[request]
            if (sha)
            {
                const existing = await (await configDB).get('data', IDBKeyRange.only([sha]));
                if (existing?.content)
                    return JSON.parse(existing.content)
        
                const result = await fetchJson(request, commit, useApi)
                if (result)
                {
                    await (await configDB).put('data', { sha:sha, content:JSON.stringify(result) })
                    console.log(`dataDB stored ${request} @${commit}`)
                }
                return result
            }
            else console.warn(`file map miss for ${request}@${commit}`)
        }

        const existing = await (await configDB).get('files', IDBKeyRange.only([commit, request]));
        if (existing?.hash)
            return JSON.parse(existing.content)

        const result = await fetchJson(request, commit, useApi)
        if (result)
        {
            await (await configDB).put('files', { hash:commit, path:request, content:JSON.stringify(result) })
            console.log(`fileDB stored ${request} @${commit}`)
        }
        return result
    })
}

export interface DataSourceFileMap
{
    [Path:string]: string
}
export const fileMapPaths =
[
    'Config/ConfigCharacter/Avatar', 'Config/ConfigCharacter/Monster', //'Config/ConfigCharacter/BattleEvent', missing
    'Config/ConfigAdventureAbility/LocalPlayer', 'Config/ConfigAdventureAbility/WhiteBox/LocalPlayer', 'Config/ConfigAdventureModifier', 
    'Config/ConfigAI', 'Config/GlobalConfig',
    'Config/ConfigAbility', 'Config/ConfigGlobalModifier', 'Config/ConfigGlobalTaskListTemplate', 
    'ExcelOutput', 'TextMap',
]
const fileMapCache:{[commitId: string]: DataSourceFileMap} = {}
const fileMapMutex = new MutexGroup()
async function getFileMap(commitId:string) : Promise<DataSourceFileMap>
{
    return fileMapMutex.runExclusive(commitId, async () => 
    {
        let fileMap = fileMapCache[commitId]
        if (fileMap == undefined)
        {
            try 
            {
                fileMapCache[commitId] = fileMap = {}
                for (const path of fileMapPaths)
                    for (const file of (await retrieveTree(path, commitId, true)).filter(filterInterestingFiles))
                        fileMap[path + '/' + file.path] = file.sha
            }
            catch (error)
            {
                console.error(error)
            }
            console.log(`cached file map for ${commitId} (${Object.keys(fileMap).length})`)
        }
        return fileMap
    })
}

export function filterInterestingFiles(file:DataSourceTreeItem) : boolean
{
    return file.type == 'blob' && 
        file.path.endsWith('.json') && 
        !file.path.endsWith('.layout.json') && 
        !file.path.includes('/Camera/') &&
        !file.path.startsWith('Adventure/MazeNPC_')
}

export interface DataSourceTreeItem
{
    path:string
    mode:string
    type:string
    size:number
    sha:string
    url:string
}

export async function retrieveTree(path:string, commit:string, recursive:boolean) : Promise<DataSourceTreeItem[]>
{
    let request = `git/trees/${commit}:${path}`
    if (recursive) request += '?recursive=true'

    const response = await retrieveJson(request, commit, true)
    const tree = response?.tree as DataSourceTreeItem[]
    if (!tree)
    {
        console.log('no tree response for ' + request)
        return []
    }
    return tree
}

async function fetchJson(request:string, commit:string, useApi:boolean)
{
    if (useApi)
    {
        const url = `${apiBase}${request}`
        return fetch(url, { headers: getHeaders(), cache: 'force-cache' })
            .then(processResponse)
            .catch(error => console.warn(`fileDB error: ${error} for ${request} (api)`))
    }
    else if (settings.token.length > 0)
    {
        const url = `${apiBase}contents/${request}?ref=${commit}`
        return fetch(url, { headers: getHeaders('application/vnd.github.raw'), })
            .then(processResponse)
            .catch(error => console.warn(`fileDB error: ${error} for ${request} (file+token)`))
    }
    else
    {
        const url = commit ? `${jsonBase}${commit}/${request}` : `${jsonBase}${commit}/${request}`
        return fetch(url, { headers: getHeaders(), })
            .then(processResponse)
            .catch(error => console.warn(`fileDB error: ${error} for ${request} (file)`))
    }
}

export const apiRemaining = ref(0)
export const apiLimit = ref(0)

async function processResponse(response:Response) : Promise<any>
{
    const remaining = response.headers.get('x-ratelimit-remaining')
    if (remaining) apiRemaining.value = parseFloat(remaining)

    const limit = response.headers.get('x-ratelimit-limit')
    if (limit) apiLimit.value = parseFloat(limit)

    if (!response.ok)
        throw new Error(`Response is not OK (${response.status})`);

    return response.json()
}

export interface DataSourceCommit
{
    sha: string
    commit:
    {
        committer:
        {
            date: string
        }
        message: string
    }
    parents:
    [
        {
            sha:string
        }
    ]
}

const commitsCache:DataSourceCommit[] = []
const commitsMutex = new Mutex()
export async function retrieveCommits() : Promise<DataSourceCommit[]>
{
    return commitsMutex.runExclusive(async () => 
    {
        if (commitsCache.length == 0)
        {
            try 
            {
                const commits = await fetch(apiBase + 'commits', { headers: getHeaders() })
                    .then(processResponse) 

                for (const c of commits)
                    commitsCache.push(c)
            }
            catch (error)
            {
                console.error(error)
            }
        }
        return commitsCache
    })
}

export async function getLatestCommitId()
{
    const commits = await retrieveCommits()
    return commits[0]?.sha
}
export async function getUpCommitId(commitId:string) : Promise<string|undefined>
{
    const commits = await retrieveCommits()
    const index = commits.findIndex(c => c.sha == commitId)
    return index >= 0 && index - 1 >= 0 ? commits[index - 1]?.sha : undefined
}
export async function getDownCommitId(commitId:string) : Promise<string|undefined>
{
    const commits = await retrieveCommits()
    const index = commits.findIndex(c => c.sha == commitId)
    return index >= 0 && commits.length > index + 1 ? commits[index + 1]?.sha : undefined
}

export async function getCommitVersion(commitId:string) : Promise<string>
{
    const commits = await retrieveCommits()
    const entry = commits.find(c => c.sha == commitId)
    const message = entry?.commit.message ?? 'Unknown'
    return message.replace(/\s+/, ' ').split(' ')[0] ?? message
}

function getHeaders(accept?:string)
{
    const headers:{[key:string]:string} = { 'Accept': accept ?? 'application/json', }
    if (settings.token.length > 0)
        headers['Authorization'] = `Bearer ${settings.token}`
    return headers
}