import { deepEquals } from "@/common/common"
import { diff as fastMeyrsDiff, diff_core as fastMeyrsDiffSlice } from "fast-myers-diff"

export enum DiffNodeType
{
    Mixed = 'Mixed',
    Object = 'Object',
    Array = 'Array',
    Value = 'Value',
}
export enum DiffNodeChange
{
    Added = 'Added',
    Removed = 'Removed',
    Replaced = 'Replaced', // This value got replaced by another
    Changed = 'Changed', // Part of this value changed (for objects and arrays)
    Same = 'Same',
}
export interface DiffNode
{
    Type:DiffNodeType
    Change:DiffNodeChange
    FromValue:any
    ToValue:any
    Content?:KeyToDiffNode|DiffNode[]
}

export interface KeyToAny
{
    [key:string]:any

}
export interface KeyToDiffNode
{
    [key:string]:DiffNode
}

export function diff(from:any, to:any) : DiffNode
{
    return diffAny(from, to)
}

function diffAny(from:any, to:any, parentKey?:string) : DiffNode
{
    if (from === to) 
        return {
            Type:DiffNodeType.Value,
            Change:DiffNodeChange.Same,
            FromValue:from,
            ToValue:to,
        }
    
    if (Array.isArray(from) && Array.isArray(to)) 
      return diffArray(from, to, parentKey)
  
    if (typeof from === "object" && from !== null 
        && typeof to === "object" && to !== null) 
    {
        if (Array.isArray(from) || Array.isArray(to))
            return {
                Type:DiffNodeType.Mixed,
                Change:DiffNodeChange.Replaced,
                FromValue:from,
                ToValue:to,
            }

        return diffObject(from, to)
    }

    if (from === undefined && to !== undefined)
        return {
            Type:findType(to),
            Change:DiffNodeChange.Added,
            FromValue:from,
            ToValue:to,
        }
    if (from !== undefined && to === undefined)
        return {
            Type:findType(from),
            Change:DiffNodeChange.Removed,
            FromValue:from,
            ToValue:to,
        }

    return {
        Type:findType(to),
        Change:DiffNodeChange.Replaced,
        FromValue:from,
        ToValue:to,
    }
}

function diffObject(from:KeyToAny, to:KeyToAny) : DiffNode
{
    let content = <KeyToDiffNode>{}
    const result = <DiffNode>{
        Type:DiffNodeType.Object,
        Change:DiffNodeChange.Same,
        FromValue:from,
        ToValue:to,
        Content:content
    }

    const toKeys = Object.keys(to)
    const fromKeys = Object.keys(from)

    for (const key of toKeys)
    {
        if (from[key] === undefined)
            content[key] = {
                Type:findType(to[key]),
                Change:DiffNodeChange.Added,
                FromValue:from[key],
                ToValue:to[key],
            }
        else content[key] = diffAny(from[key], to[key], key)
    }
    
    for (const key of fromKeys)
        if (to[key] === undefined)
            content[key] = {
                Type:findType(from[key]),
                Change:DiffNodeChange.Removed,
                FromValue:from[key],
                ToValue:to[key],
            }

    result.Change = toKeys.length != fromKeys.length || Object.values(content).some(c => c.Change != DiffNodeChange.Same) ? 
        DiffNodeChange.Changed : DiffNodeChange.Same

    // If it's a collection of *only* objects, strip entries that didn't change
    if (result.Change != DiffNodeChange.Same && !Object.values(content).some(c => c.Type != DiffNodeType.Object))
        result.Content = content = Object.fromEntries(Object.entries(content).filter(([_k, c]) => c.Change != DiffNodeChange.Same))

    return result
}

function diffArray(from:Array<any>, to:Array<any>, parentKey?:string) : DiffNode
{
    let content = <DiffNode[]>[]
    const result = <DiffNode>{
        Type:DiffNodeType.Array,
        Change:DiffNodeChange.Same,
        FromValue:from,
        ToValue:to,
        Content:content
    }

    const keyablesMap:{[key:string]: string} = {
        'SkillList': 'Name',
        'SkillAbilityList': 'Skill',
        'AbilityList': 'Name',
        'GlobalTemplates': 'Name',
        'TaskListTemplate': 'Name',
        'SubModifierList': 'Name',
        '_CallbackList': 'Event',
        'Groups': 'GroupName',
        'UITextNodes': 'TextPath',
        'TransitionList': 'Trigger',
        'PhaseList': 'PhaseNum',
        '_PriorityList': 'PriorityName',
        'OnAbilityPropertyChange': 'Property',
    }
    const mapKey = parentKey ? keyablesMap[parentKey] : undefined
    if (mapKey && allValuesAreObjectWithKey(from, mapKey) && allValuesAreObjectWithKey(to, mapKey))
    {
        // Treat it like an object
        const fromAsObject = Object.fromEntries(from.map(v => [v[mapKey] as string, v]))
        const toAsObject = Object.fromEntries(to.map(v => [v[mapKey] as string, v]))
        const objectDiff = diffObject(fromAsObject, toAsObject)
        content.push(...Object.values(objectDiff.Content as KeyToDiffNode))
    }
    else
    {
        // Deep equality
        const changes = [...fastMeyrsDiff(from, to, (i, j) => deepEquals(from[i], to[j]))]
        if (changes.length)
        {
            let index = 0
            for (const [startFrom, endFrom, startTo, endTo] of changes)
            {
                while (index < startFrom)
                {
                    content.push({
                        Type:findType(from[index]),
                        Change:DiffNodeChange.Same,
                        FromValue:from[index],
                        ToValue:from[index],
                    })
                    index++
                }
    
                if (startFrom === endFrom)
                {
                    for (let i = startTo; i < endTo; i++)
                        content.push({
                            Type:findType(to[i]),
                            Change:DiffNodeChange.Added,
                            FromValue:undefined,
                            ToValue:to[i],
                        })
                }
                else if (startTo === endTo)
                {
                    for (let i = startFrom; i < endFrom; i++)
                        content.push({
                            Type:findType(from[i]),
                            Change:DiffNodeChange.Removed,
                            FromValue:from[i],
                            ToValue:undefined,
                        })
                } 
                else
                {
                    // Soft equality by $type key
                    const replaceEqualityKey = '$type'
                    if (allValuesAreObjectWithKey(from.slice(startFrom, endFrom), replaceEqualityKey) 
                        && allValuesAreObjectWithKey(to.slice(startTo, endTo), replaceEqualityKey))
                    {
                        const softChanges = [...fastMeyrsDiffSlice(startFrom, endFrom - startFrom, startTo, endTo - startTo, 
                            (i, j) => from[i][replaceEqualityKey] == to[j][replaceEqualityKey])]

                        for (const [softStartFrom, softEndFrom, softStartTo, softEndTo] of softChanges)
                        {
                            while (index < softStartFrom)
                            {
                                content.push(diffAny(from[index], to[index + softStartTo - softStartFrom]))
                                index++
                            }
    
                            for (let i = softStartFrom; i < softEndFrom; i++)
                                content.push({
                                    Type:findType(from[i]),
                                    Change:DiffNodeChange.Removed,
                                    FromValue:from[i],
                                    ToValue:undefined,
                                })
                            for (let i = softStartTo; i < softEndTo; i++)
                                content.push({
                                    Type:findType(to[i]),
                                    Change:DiffNodeChange.Added,
                                    FromValue:undefined,
                                    ToValue:to[i],
                                })
    
                            index = softEndFrom
                        }
                        while (index < endFrom)
                        {
                            const toIndex = index + endTo - endFrom
                            content.push(diffAny(from[index], to[toIndex]))
                            index++
                        }
                    }
                    else
                    {
                        if (allValuesAreObjectWithKey(from.slice(startFrom, endFrom)) 
                            && allValuesAreObjectWithKey(to.slice(startTo, endTo)))
                            console.warn(`no $type key for soft diff in ${parentKey}`)

                        for (let i = startFrom; i < endFrom; i++)
                            content.push({
                                Type:findType(from[i]),
                                Change:DiffNodeChange.Removed,
                                FromValue:from[i],
                                ToValue:undefined,
                            })
                        for (let i = startTo; i < endTo; i++)
                            content.push({
                                Type:findType(to[i]),
                                Change:DiffNodeChange.Added,
                                FromValue:undefined,
                                ToValue:to[i],
                            })
                    }
                }
                index = endFrom
            }
            while (index < from.length)
            {
                content.push({
                    Type:findType(from[index]),
                    Change:DiffNodeChange.Same,
                    FromValue:from[index],
                    ToValue:from[index],
                })
                index++
            }
        }
    }

    result.Change = Object.values(content).some(c => c.Change != DiffNodeChange.Same) ? 
        DiffNodeChange.Changed : DiffNodeChange.Same

    // If it's a collection of *only* objects, strip entries that didn't change
    if (result.Change != DiffNodeChange.Same && !Object.values(content).some(c => c.Type != DiffNodeType.Object))
        result.Content = content = content.filter(c => c.Change != DiffNodeChange.Same)

    return result
}

function allValuesAreObjectWithKey(values:Array<any>, withKey?:string)
{
    return values.every(value => !Array.isArray(value) 
        && typeof value === 'object'
        && (!withKey || Object.keys(value).includes(withKey)))

    // TODO if withKey is not undefined, check that each entry has a different value 
}

function findType(value:any) : DiffNodeType
{
    if (Array.isArray(value))
        return DiffNodeType.Array
    if (typeof value === 'object')
        return DiffNodeType.Object
    return DiffNodeType.Value
}