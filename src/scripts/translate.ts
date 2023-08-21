import { retrieveJson } from './datasource'

export interface Translatable
{
    Hash: number
    Text: string
}

export default async function translate(commitId:string, translatable:Translatable, process?:(s: string) => string)
{
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