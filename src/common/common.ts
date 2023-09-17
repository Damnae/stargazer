export interface Grouped<TElement>
{
    [groupBy: string]: TElement[]
}

export interface Grouped2<TElement>
{
    [groupBy: string]: {[groupBy: string]: TElement[]}
}

export function cleanupNumber(value?:number) : string
{
    if (value === undefined)
        return 'undefined'
    return parseFloat(value.toFixed(4)).toString();
}

export function cleanupMarkup(value?:string) : string
{
    if (value === undefined)
        return 'undefined'

    return value
        .replace(/(<([^>]+)>)/gi, "")
        .replace(/\\n/gi, " ")
}

export function cleanupTaskName(value: string) 
{
    var parts = value.split('.');
    if (parts.length === 3)
        return  parts[2].split(/([A-Z][a-z]+)/).filter(e => e).join(' ');
    return value;
}

export function cleanupFilename(path:string) : string
{
    if (!path)
        return ''

    var filename = path.split('/').pop();
    return filename?.substring(0, filename.lastIndexOf('.')) ?? ''
}

export function taskTypeToComponentName(value: string) 
{
    var parts = value.split('.');
    if (parts.length === 3)
        return parts[2];
    return value;
}

export function delay(ms: number) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}