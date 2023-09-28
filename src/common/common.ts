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
    return parseFloat(value.toFixed(5)).toString();
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

const agoNames = ['second', 'minute', 'hour', 'day', 'month', 'year']
const agoDivisors = [60, 60, 24, 365 / 12, 12]
const agoThreshold = [1, 1, 2, 2, 1]

export function toTimeAgo(date:Date|string) : string
{
    if (typeof(date) == 'string')
        date = new Date(date)

    const delta = (+date - +new Date())
    const isAgo = delta < 0
    const seconds = Math.abs(delta / 1000)

    let time = seconds
    let timeIndex = 0
    while (timeIndex < agoDivisors.length && time > agoDivisors[timeIndex] * agoThreshold[timeIndex])
    {
        time /= agoDivisors[timeIndex]
        timeIndex++
    }

    time = Math.floor(time)
    let timeWord = agoNames[timeIndex]
    if (time > 1)
        timeWord += 's'

    return isAgo ? `${time} ${timeWord} ago` : `in ${time} ${timeWord}`
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