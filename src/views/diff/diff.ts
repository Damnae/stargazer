
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

function diffAny(from:any, to:any) : DiffNode
{
    if (from === to) 
        return {
            Type:DiffNodeType.Value,
            Change:DiffNodeChange.Same,
            FromValue:from,
            ToValue:to,
        }
    
    if (Array.isArray(from) && Array.isArray(to)) 
      return diffArray(from, to)
  
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
    
    for (const key of Object.keys(to))
    {
        if (from[key] === undefined)
            content[key] = {
                Type:findType(to[key]),
                Change:DiffNodeChange.Added,
                FromValue:from[key],
                ToValue:to[key],
            }
        else content[key] = diffAny(from[key], to[key])
    }
    
    for (const key of Object.keys(from))
        if (to[key] === undefined)
            content[key] = {
                Type:findType(from[key]),
                Change:DiffNodeChange.Removed,
                FromValue:from[key],
                ToValue:to[key],
            }

    result.Change = Object.values(content).some(c => c.Change != DiffNodeChange.Same) ? 
        DiffNodeChange.Changed : DiffNodeChange.Same

    // If it's a collection of *only* objects, strip entries that didn't change
    if (result.Change != DiffNodeChange.Same && !Object.values(content).some(c => c.Type != DiffNodeType.Object))
        result.Content = content = Object.fromEntries(Object.entries(content).filter(([_k, c]) => c.Change != DiffNodeChange.Same))

    return result
}

function diffArray(from:Array<any>, to:Array<any>) : DiffNode
{
    let content = <DiffNode[]>[]
    const result = <DiffNode>{
        Type:DiffNodeType.Array,
        Change:DiffNodeChange.Same,
        FromValue:from,
        ToValue:to,
        Content:content
    }

    let top = 0
    while (top < from.length || top < to.length)
    {
        content.push(diffAny(from[top], to[top]))
        top++
    }

    result.Change = Object.values(content).some(c => c.Change != DiffNodeChange.Same) ? 
        DiffNodeChange.Changed : DiffNodeChange.Same

        // If it's a collection of *only* objects, strip entries that didn't change
    if (result.Change != DiffNodeChange.Same && !Object.values(content).some(c => c.Type != DiffNodeType.Object))
        result.Content = content = content.filter(c => c.Change != DiffNodeChange.Same)

    return result
}

function findType(value:any) : DiffNodeType
{
    if (Array.isArray(value))
        return DiffNodeType.Array
    if (typeof value === 'object')
        return DiffNodeType.Object
    return DiffNodeType.Value
}