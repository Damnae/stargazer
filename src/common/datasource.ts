import { openDB, DBSchema } from 'idb'
import { Mutex, MutexGroup } from './mutex'
import useSettings from './settings'
import { ref } from 'vue'

const [settings, _sessionSettings] = useSettings()

const repository = settings.useCustomRepo ? settings.customRepo : 'Dimbreath/StarRailData/'
const apiBase = 'https://api.github.com/repos/' + repository
const jsonBase = 'https://raw.githubusercontent.com/' + repository

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

async function fetchJson(request:string, commit:string, useApi:boolean)
{
    if (useApi)
    {
        const url = `${apiBase}${request}`
        return fetch(url, { headers: getHeaders(), cache: 'force-cache' })
            .then(processResponse)
            .catch(error => console.log(`fileDB error: ${error}`))
    }
    else if (settings.token.length > 0)
    {
        const url = `${apiBase}contents/${request}?ref=${commit}`
        return fetch(url, { headers: getHeaders('application/vnd.github.raw'), })
            .then(processResponse)
            .catch(error => console.log(`fileDB error: ${error}`))
    }
    else
    {
        const url = commit ? `${jsonBase}${commit}/${request}` : `${jsonBase}${commit}/${request}`
        return fetch(url, { headers: getHeaders(), })
            .then(processResponse)
            .catch(error => console.log(`fileDB error: ${error}`))
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

function getHeaders(accept?:string)
{
    const headers:{[key:string]:string} = { 'Accept': accept ?? 'application/json', }
    if (settings.token.length > 0)
        headers['Authorization'] = `Bearer ${settings.token}`
    return headers
}