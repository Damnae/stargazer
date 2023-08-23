import { retrieveJson } from './datasource'

export interface Translatable
{
    Hash: number
    Text: string
}

export default async function translate(commitId:string, translatable:Translatable, process?:(s: string) => string)
{
    if (!translatable)
        return

    let text = await translateHash(commitId, translatable.Hash)
    if (process !== undefined)
        text = process(text)
    translatable.Text = text
}

const translationMap: {[key: string]: string} = {}
export async function translateHash(commitId:string, hash:number) : Promise<string>
{
    if (commitId in translationMap)
    {
        const translation = translationMap[commitId]
        return Promise.resolve(translation[hash] ?? hash.toString())
    }

    const translation = translationMap[commitId] = await retrieveJson('TextMap/TextMapEN.json', commitId, false)
    return translation[hash] ?? hash.toString()
}

export function getHash(key:string) : number
{
    var hash1 = 5381;
    var hash2 = 5381;
    for (let i = 0; i < key.length; i += 2) 
    {
      hash1 = Math.imul((hash1 << 5) + hash1, 1) ^ key.charCodeAt(i);
      if (i === key.length - 1) 
        break;
      hash2 = Math.imul((hash2 << 5) + hash2, 1) ^ key.charCodeAt(i + 1);
    }
    return hash1 + Math.imul(hash2, 1566083941);
}