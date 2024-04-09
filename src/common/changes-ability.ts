import { deepEquals } from "./common"
import { MutexGroup } from "./mutex"
import { FileCompare, retrieveFileCompare } from "./changes-file"
import { Ability, TaskContextType, getTaskContext } from "@/sources/ability"

export interface AbilityCompare
{
    Added: Ability[]
    Removed: Ability[]
    Changed: Ability[]
}

const abilityCompareCache:{[key: string]: AbilityCompare} = {}
const abilityCompareMutex = new MutexGroup()
export async function retrieveAbilityCompare(fromCommitId:string, toCommitId:string, contextType:TaskContextType) : Promise<AbilityCompare>
{
    const key = `${contextType}|${fromCommitId}|${toCommitId}`
    return abilityCompareMutex.runExclusive(key, async () => 
    {
        let result = abilityCompareCache[key]
        if (result == undefined)
        {
            const compare:AbilityCompare = 
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
    
                compare.Added = Object.values(taskContextTo.Abilities)
                    .filter(v => taskContextFrom.Abilities[v.Name] == undefined)
                    .sort((a, b) => a.Name > b.Name ? 1 : -1)
                compare.Removed = Object.values(taskContextFrom.Abilities)
                    .filter(v => taskContextTo.Abilities[v.Name] == undefined)
                    .sort((a, b) => a.Name > b.Name ? 1 : -1)
                compare.Changed = Object.values(taskContextFrom.Abilities)
                    .filter(v => {
                        const to = taskContextTo.Abilities[v.Name]
                        return to && checkChanged(v, to, fileCompare)
                    })
                    .sort((a, b) => a.Name > b.Name ? 1 : -1)
            }

            result = abilityCompareCache[key] = compare
            console.log('cached ability compare for ' + key)
        }
        return result
    })
}

function checkChanged(from:Ability, to:Ability, fileCompare:FileCompare) : boolean
{
    if (!fileCompare.Changed.some(e => e.Path == to.SourceFile) && (from.SourceFile == to.SourceFile))
        return false

    return !deepEquals(from, to)
}