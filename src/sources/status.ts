import { cleanupMarkup } from '@/common/common';
import { retrieveJson } from '@/common/datasource';
import { Mutex } from '@/common/mutex';
import translate, { Translatable, } from '@/common/translate';

// Status

export interface Status
{
    StatusID: number
    StatusName: Translatable
    StatusDesc: Translatable
    StatusEffect: Translatable
    ModifierName: string
    StatusType: string
    CanDispel: boolean
    ReadParamList:string[]
    SearchKeywords:string[]
}

export interface StatusConfig
{
    [key: string]: Status
}

const statusConfigCache:{[commitId: string]: StatusConfig} = {}
const statusConfigMutex = new Mutex()
export async function getStatuses(commitId:string) : Promise<StatusConfig>
{
    return statusConfigMutex.runExclusive(async () => 
    {
        let config = statusConfigCache[commitId]
        if (config == undefined)
        {
            const statuses = {
                ...await retrieveJson('ExcelOutput/StatusConfig.json', commitId, false) as StatusConfig,
                ...await retrieveJson('ExcelOutput/AvatarStatusConfig.json', commitId, false) as StatusConfig,
                ...await retrieveJson('ExcelOutput/MonsterStatusConfig.json', commitId, false) as StatusConfig,
            }
            for (const key in statuses)
            {
                const status = statuses[key]
                await translate(commitId, status.StatusName, text => text ? cleanupMarkup(text) : status.ModifierName)
                await translate(commitId, status.StatusDesc, text => cleanupMarkup(text))
                await translate(commitId, status.StatusEffect)
    
                status.SearchKeywords = []
                status.SearchKeywords.push(status.StatusName.Text.toLowerCase())
                if (status.StatusName.Text != status.ModifierName)
                    status.SearchKeywords.push(status.ModifierName.toLowerCase())
                if (status.StatusEffect.Text != status.StatusName.Text && status.StatusEffect.Text != status.StatusEffect.Hash.toString())
                    status.SearchKeywords.push(status.StatusEffect.Text.toLowerCase())
            }
    
            config = statusConfigCache[commitId] = statuses
            console.log('cached status config for ' + commitId)
        }
        return config
    })
}

export async function getStatus(commitId:string, statusId:number) : Promise<Status>
{
    return (await getStatuses(commitId))[statusId]
}