import { retrieveJson } from './datasource'

interface TranslationMap 
{
    [key: string]: any
}

const translationMap: TranslationMap = {}

export default async function translate(commitId:string, hash:number) : Promise<string>
{
    if (commitId in translationMap)
    {
        const translation = translationMap[commitId]
        return Promise.resolve(translation[hash] ?? hash.toString())
    }

    const translation = translationMap[commitId] = await retrieveJson('TextMap/TextMapEN.json', commitId, false)
    return translation[hash] ?? hash.toString()
}