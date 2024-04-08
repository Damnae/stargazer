import { openDB, DBSchema } from 'idb'
import { Mutex, MutexGroup } from './mutex'
import useSettings from './settings'
import { ref } from 'vue'

const [settings, _sessionSettings] = useSettings()

const repository = settings.useCustomRepo ? settings.customRepo : 'Dimbreath/StarRailData/'
const apiBase = 'https://api.github.com/repos/' + repository
const jsonBase = 'https://raw.githubusercontent.com/' + repository

export function getRepositoryFileUrl(commitId:string,path:string)
{
    return `https://github.com/${repository}blob/${commitId}/${path}`
}

const configDBVersion = 1
interface ConfigDBv1 extends DBSchema 
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
}

const configDB = openDB<ConfigDBv1>('configDB', configDBVersion, 
{
    upgrade(db, oldVersion, newVersion, _transaction, _event) 
    {
        console.log(`fileDB upgrading from ${oldVersion} to ${newVersion}`)
        db.createObjectStore('files', { keyPath: ['hash', 'path'], })
    },
    blocked(currentVersion, blockedVersion, _event) 
    {
        console.log(`fileDB blocked: currentVersion: ${currentVersion}, blockedVersion: ${blockedVersion}`)
    },
    blocking(currentVersion, blockedVersion, _event) 
    {
        console.log(`fileDB blocking: currentVersion: ${currentVersion}, blockedVersion: ${blockedVersion}`)
    },
    terminated() 
    {
        console.log(`fileDB terminated`)
    },
})

const retrieveJsonMutex = new MutexGroup()
export async function retrieveJson(request:string, commit:string, useApi:boolean) : Promise<any>
{
    const key = `${useApi}|${commit}|${request}`
    return await retrieveJsonMutex.runExclusive(key, async () =>
    {
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

export async function getCommitVersion(commitId:string) : Promise<string>
{
    const commits = await retrieveCommits()
    const entry = commits.find(c => c.sha == commitId)
    const message = entry?.commit.message ?? 'missing'
    return message.replace(/\s+/, ' ').split(' ')[0] ?? message
}

export interface DataSourceCompareFile
{
    Path:string
}

export interface DataSourceCompare
{
    AddedFiles: DataSourceCompareFile[]
    RemovedFiles: DataSourceCompareFile[]
}

export async function retrieveCompare(fromCommit:string, toCommit:string) : Promise<DataSourceCompare>
{
    const compare:DataSourceCompare = 
    {
        AddedFiles: [],
        RemovedFiles: [],
    }
    await compareProcessTree(compare, fromCommit, toCommit, 'Config/ConfigAbility')
    await compareProcessTree(compare, fromCommit, toCommit, 'Config/ConfigGlobalModifier')
    await compareProcessTree(compare, fromCommit, toCommit, 'Config/ConfigGlobalTaskListTemplate')
    await compareProcessTree(compare, fromCommit, toCommit, 'ExcelOutput')
    return compare
}

async function compareProcessTree(compare:DataSourceCompare, fromCommit:string, toCommit:string, path:string) : Promise<undefined>
{
    const from = await retrieveTree(path, fromCommit, true) as DataSourceTreeItem[]
    const to = await retrieveTree(path, toCommit, true) as DataSourceTreeItem[]

    const fileFilter = (f:DataSourceTreeItem) => 
        f.type == 'blob' && 
        f.path.endsWith('.json') && 
        !f.path.endsWith('.layout.json') && 
        !f.path.includes('/Camera/')
    const filesFrom = from.filter(fileFilter)
    const filesTo = to.filter(fileFilter)
    
    const convert = (f:DataSourceTreeItem) => <DataSourceCompareFile>{ Path: `${path}/${f.path}` }
    compare.AddedFiles = compare.AddedFiles.concat(filesTo.filter(f => !filesFrom.some(f2 => f.path == f2.path)).map(convert))
    compare.RemovedFiles = compare.RemovedFiles.concat(filesFrom.filter(f => !filesTo.some(f2 => f.path == f2.path)).map(convert))
}

function getHeaders(accept?:string)
{
    const headers:{[key:string]:string} = { 'Accept': accept ?? 'application/json', }
    if (settings.token.length > 0)
        headers['Authorization'] = `Bearer ${settings.token}`
    return headers
}