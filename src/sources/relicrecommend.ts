import { retrieveJson } from '@/common/datasource';
import { Mutex } from '@/common/mutex';

// Status

export interface RelicRecommend
{
    AvatarID: number
    Set4IDList: number[]
    Set2IDList: number[]
    PropertyList: 
    [
        {
            RelicType:string
            PropertyType:string
        }
    ]
}

export interface RelicRecommendConfig
{
    [key: string]: RelicRecommend
}

const relicRecommendConfigCache:{[commitId: string]: RelicRecommendConfig} = {}
const relicRecommendConfigMutex = new Mutex()

export async function getRelicRecommends(commitId:string) : Promise<RelicRecommendConfig>
{
    return relicRecommendConfigMutex.runExclusive(async () => 
    {
        let config = relicRecommendConfigCache[commitId]
        if (config == undefined)
        {
            const relicRecommends = await retrieveJson('ExcelOutput/AvatarRelicRecommend.json', commitId, false) as RelicRecommendConfig
    
            config = relicRecommendConfigCache[commitId] = relicRecommends
            console.log('cached relic recommend config for ' + commitId)
        }
        return config
    })
}

export async function getRelicRecommend(commitId:string, characterId:number) : Promise<RelicRecommend>
{
    return (await getRelicRecommends(commitId))[characterId]
}