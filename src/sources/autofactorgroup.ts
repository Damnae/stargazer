import { retrieveJson } from '@/common/datasource';
import { GamecoreTask } from './gamecore';
import { Mutex } from '@/common/mutex';

export interface AIFactor
{
    CombineOperator: string
    Source: GamecoreTask
    Mapper: GamecoreTask
    PostProcess?: GamecoreTask
}

export interface AIFactorGroup
{
    CombineOperator: string
    Factors: AIFactor[]
    IsBpGroup: boolean
}

export interface AIFactorGroupConfig
{
    GroupsMap: 
    {
        [key:string]: AIFactorGroup
    }
}

const aiFactorGroupConfigCache:{[commitId: string]: AIFactorGroupConfig} = {}
const aiFactorGroupConfigMutex = new Mutex()
export async function getAIFactorGroups(commitId:string) : Promise<AIFactorGroupConfig>
{
    return aiFactorGroupConfigMutex.runExclusive(async () => 
    {
        let config = aiFactorGroupConfigCache[commitId]
        if (config == undefined)
        {
            const aiFactorGroups = await retrieveJson('Config/ConfigAI/ComplexSkillAIGlobalGroup/Global_FactorGroups.json', commitId, false) as AIFactorGroupConfig

            config = aiFactorGroupConfigCache[commitId] = aiFactorGroups
            console.log('cached auto ai config for ' + commitId)
        }
        return config
    })
}

export async function getAIFactorGroup(commitId:string, id:string) : Promise<AIFactorGroup>
{
    return (await getAIFactorGroups(commitId)).GroupsMap[id]
}