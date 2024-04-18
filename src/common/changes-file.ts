import { MutexGroup } from "./mutex"
import { filterInterestingFiles, retrieveTree, DataSourceTreeItem, } from "./datasource"

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
    Avatar = 'Avatar',
    Monster = 'Monster',
    BattleEvent = 'BattleEvent',
    AI = 'AI',
    Global = 'Global',
    Ability = 'Ability',
    AdventureAbility = 'AdventureAbility',
    Modifier = 'Modifier',
    AdventureModifier = 'AdventureModifier',
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
            await fileCompareProcessTree(compare, fromCommitId, toCommitId, 'Config/ConfigCharacter/Avatar', FileCompareType.Avatar)
            await fileCompareProcessTree(compare, fromCommitId, toCommitId, 'Config/ConfigCharacter/Monster', FileCompareType.Monster)
            //await fileCompareProcessTree(compare, fromCommitId, toCommitId, 'Config/ConfigCharacter/BattleEvent', FileCompareType.BattleEvent) missing
            await fileCompareProcessTree(compare, fromCommitId, toCommitId, 'Config/ConfigAI', FileCompareType.AI)
            await fileCompareProcessTree(compare, fromCommitId, toCommitId, 'Config/GlobalConfig', FileCompareType.Global)
            await fileCompareProcessTree(compare, fromCommitId, toCommitId, 'Config/ConfigAbility', FileCompareType.Ability)
            await fileCompareProcessTree(compare, fromCommitId, toCommitId, 'Config/ConfigAdventureAbility/LocalPlayer', FileCompareType.AdventureAbility)
            await fileCompareProcessTree(compare, fromCommitId, toCommitId, 'Config/ConfigAdventureModifier', FileCompareType.AdventureModifier)
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
    const from = (await retrieveTree(path, fromCommit, true)).filter(filterInterestingFiles)
    const to = (await retrieveTree(path, toCommit, true)).filter(filterInterestingFiles)

    const convert = (f:DataSourceTreeItem) => <FileCompareEntry>{ Sha: f.sha, Path: `${path}/${f.path}`, Type: type, }
    compare.Added = compare.Added.concat(to.filter(f => !from.some(f2 => f.path == f2.path)).map(convert))
    compare.Removed = compare.Removed.concat(from.filter(f => !to.some(f2 => f.path == f2.path)).map(convert))
    compare.Changed = compare.Changed.concat(from.filter(f => to.some(f2 => f.path == f2.path && f.sha != f2.sha)).map(convert))
}
