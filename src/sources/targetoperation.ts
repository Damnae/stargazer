import { retrieveJson } from '@/common/datasource';
import { Mutex } from '@/common/mutex';
import { GamecoreTargetType } from './gamecore';

export interface TargetOperationConfig
{
    OperationDict:
    {
        [key: string]: GamecoreTargetType
    }
}

const targetOperationConfigCache:{[commitId: string]: TargetOperationConfig} = {}
const targetOperationConfigMutex = new Mutex()
export async function getTargetOperations(commitId:string) : Promise<TargetOperationConfig>
{
    return targetOperationConfigMutex.runExclusive(async () => 
    {
        let config = targetOperationConfigCache[commitId]
        if (config == undefined)
        {
            const targetOperations = await retrieveJson('Config/GlobalConfig/TargetOperationConfig.json', commitId, false) as TargetOperationConfig

            config = targetOperationConfigCache[commitId] = targetOperations
            console.log('cached target operation config for ' + commitId)
        }
        return config
    })
}