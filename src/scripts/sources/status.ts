import { retrieveJson } from '../datasource';
import translate, { Translatable, } from '../translate';

// Status

export interface Status
{
    StatusID: Number
    StatusName: Translatable
    StatusDesc: Translatable
    StatusEffect: Translatable
    ModifierName: string
    StatusType: string
    CanDispel: boolean
    ReadParamList: string[]
}

export interface StatusConfig
{
    [key: string]: Status
}

const statusConfigCache:{[commitId: string]: StatusConfig} = {}
export async function getStatuses(commitId:string) : Promise<StatusConfig>
{
    let config = statusConfigCache[commitId]
    if (config == undefined)
    {
        const statuses = await retrieveJson('ExcelOutput/StatusConfig.json', commitId, false) as StatusConfig
        for (const key in statuses)
        {
            const status = statuses[key]
            await translate(commitId, status.StatusName)
            await translate(commitId, status.StatusDesc)
            await translate(commitId, status.StatusEffect)
        }

        config = statusConfigCache[commitId] = statuses
        console.log('cached status config for ' + commitId)
    }
    return config
}

export async function getStatus(commitId:string, statusId:number) : Promise<Status>
{
    return (await getStatuses(commitId))[statusId]
}