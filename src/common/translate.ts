import { retrieveJson } from './datasource'

export interface Translatable
{
    Hash: number
    Text: string
}

export default async function translate(commitId:string, translatable?:Translatable, process?:(s?: string) => string)
{
    if (!translatable)
        return

    let text = await translateHash(commitId, translatable.Hash)
    if (process !== undefined)
        text = process(text)
    translatable.Text = text ?? translatable.Hash.toString()
}

export async function translateFromKey(commitId:string, key:string) : Promise<string | undefined>
{
    const hash = getHash(key)
    return translateHash(commitId, hash)
}

const translationMap: {[key: string]: string} = {}
export async function translateHash(commitId:string, hash:number) : Promise<string | undefined>
{
    if (commitId in translationMap)
    {
        const translation = translationMap[commitId]
        if (translation != undefined)
            return Promise.resolve(translation[hash])
    }

    const translation = translationMap[commitId] = await retrieveJson('TextMap/TextMapEN.json', commitId, false)
    if (translation != undefined)
        return translation[hash]

    return undefined
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
    return Math.imul(hash1 + Math.imul(hash2, 1566083941), 1);
}

const pathInternalNameToHash:{[key:string]: number} = 
{
    Warrior: 209078842,     // Destruction
    Rogue: 612363369,       // The Hunt
    Mage: -953720572,       // Erudition
    Shaman: -194205685,     // Harmony
    Warlock: -1760289626,   // Nihility
    Knight: -1357005099,    // Preservation
    Priest: 1371878256,     // Abundance
    Unknown: 1775162783,    // Unknown
}

export async function translatePath(commitId:string, pathInternalName:string) : Promise<string>
{
    const hash = pathInternalNameToHash[pathInternalName]
    if (hash === undefined)
        return pathInternalName

    return await translateHash(commitId, hash) ?? pathInternalName
}