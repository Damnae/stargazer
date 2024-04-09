import { retrieveJson } from '@/common/datasource';
import { Mutex } from '@/common/mutex';
import { GamecoreTargetType } from './gamecore';

export interface TargetAliasConfig
{
    AliasDict:
    {
        [key: string]: GamecoreTargetType
    }
}

const targetAliasConfigCache:{[commitId: string]: TargetAliasConfig} = {}
const targetAliasConfigMutex = new Mutex()
export async function getTargetAliases(commitId:string) : Promise<TargetAliasConfig>
{
    return targetAliasConfigMutex.runExclusive(async () => 
    {
        let config = targetAliasConfigCache[commitId]
        if (config == undefined)
        {
            const targetAliases = await retrieveJson('Config/GlobalConfig/TargetAliasConfig.json', commitId, false) as TargetAliasConfig

            config = targetAliasConfigCache[commitId] = targetAliases
            console.log('cached target alias config for ' + commitId)
        }
        return config
    })
}