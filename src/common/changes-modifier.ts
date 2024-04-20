import { deepEquals } from "./common"
import { MutexGroup } from "./mutex"
import { FileCompare, retrieveFileCompare } from "./changes-file"
import { Modifier, TaskContextType, getTaskContext } from "@/sources/ability"

interface ModifierPair
{
    From: Modifier
    To: Modifier
}

export interface ModifierCompare
{
    Added: Modifier[]
    Removed: Modifier[]
    Changed: ModifierPair[]
}

const modifierCompareCache:{[key: string]: ModifierCompare} = {}
const modifierCompareMutex = new MutexGroup()
export async function retrieveModifierCompare(fromCommitId:string, toCommitId:string, contextType:TaskContextType) : Promise<ModifierCompare>
{
    const key = `${contextType}|${fromCommitId}|${toCommitId}`
    return modifierCompareMutex.runExclusive(key, async () => 
    {
        let result = modifierCompareCache[key]
        if (result == undefined)
        {
            const compare:ModifierCompare = 
            {
                Added: [],
                Removed: [],
                Changed:[],
            }
            if (contextType != TaskContextType.Empty)
            {
                const taskContextFrom = await getTaskContext(fromCommitId, contextType)
                const taskContextTo = await getTaskContext(toCommitId, contextType)
                const fileCompare = await retrieveFileCompare(fromCommitId, toCommitId)
    
                compare.Added = Object.values(taskContextTo.Modifiers)
                    .filter(v => taskContextFrom.Modifiers[v.Name] == undefined)
                    .sort((a, b) => a.Name > b.Name ? 1 : -1)
                compare.Removed = Object.values(taskContextFrom.Modifiers)
                    .filter(v => taskContextTo.Modifiers[v.Name] == undefined)
                    .sort((a, b) => a.Name > b.Name ? 1 : -1)
                compare.Changed = Object.values(taskContextFrom.Abilities)
                    .map(v => <ModifierPair>{ From:v, To: taskContextTo.Modifiers[v.Name] })
                    .filter(v => v.To && checkChanged(v.From, v.To, fileCompare))
                    .sort((a, b) => a.To.Name > b.To.Name ? 1 : -1)
            }

            result = modifierCompareCache[key] = compare
            console.log('cached modifier compare for ' + key)
        }
        return result
    })
}

function checkChanged(from:Modifier, to:Modifier, fileCompare:FileCompare) : boolean
{
    if (!fileCompare.Changed.some(e => e.Path == to.SourceFile) && (from.SourceFile == to.SourceFile))
        return false

    return !deepEquals(from, to)
}