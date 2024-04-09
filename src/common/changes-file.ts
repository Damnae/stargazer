import { MutexGroup } from "./mutex"
import { retrieveTree, DataSourceTreeItem,  } from "./datasource"

export interface FileCompareEntry
{
    Sha:string
    Path:string
    Type:FileCompareType
}

export interface FileCompare
{
    Added: FileCompareEntry[]
    Removed: FileCompareEntry[]
    Changed: FileCompareEntry[]
}

export enum FileCompareType
{
    Ability = 'Ability',
    Modifier = 'Modifier',
    TaskTemplate = 'TaskTemplate',
    Data = 'Data',
}

const fileCompareCache:{[commitIdPair: string]: FileCompare} = {}
const fileCompareMutex = new MutexGroup()
export async function retrieveFileCompare(fromCommitId:string, toCommitId:string) : Promise<FileCompare>
{
    const commitIdPair = `${fromCommitId}|${toCommitId}`
    return fileCompareMutex.runExclusive(commitIdPair, async () => 
    {
        let result = fileCompareCache[commitIdPair]
        if (result == undefined)
        {
            const compare:FileCompare = 
            {
                Added: [],
                Removed: [],
                Changed:[],
            }
            await fileCompareProcessTree(compare, fromCommitId, toCommitId, 'Config/ConfigAbility', FileCompareType.Ability)
            await fileCompareProcessTree(compare, fromCommitId, toCommitId, 'Config/ConfigGlobalModifier', FileCompareType.Modifier)
            await fileCompareProcessTree(compare, fromCommitId, toCommitId, 'Config/ConfigGlobalTaskListTemplate', FileCompareType.TaskTemplate)
            await fileCompareProcessTree(compare, fromCommitId, toCommitId, 'ExcelOutput', FileCompareType.Data)

            result = fileCompareCache[commitIdPair] = compare
            console.log('cached file compare for ' + commitIdPair)
        }
        return result
    })
}

async function fileCompareProcessTree(compare:FileCompare, fromCommit:string, toCommit:string, path:string, type:FileCompareType) : Promise<undefined>
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
    
    const convert = (f:DataSourceTreeItem) => <FileCompareEntry>{ Sha: f.sha, Path: `${path}/${f.path}`, Type: type, }
    compare.Added = compare.Added.concat(filesTo.filter(f => !filesFrom.some(f2 => f.path == f2.path)).map(convert))
    compare.Removed = compare.Removed.concat(filesFrom.filter(f => !filesTo.some(f2 => f.path == f2.path)).map(convert))
    compare.Changed = compare.Changed.concat(filesFrom.filter(f => filesTo.some(f2 => f.path == f2.path && f.sha != f2.sha)).map(convert))
}
