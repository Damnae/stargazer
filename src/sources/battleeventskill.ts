import { retrieveJson } from '@/common/datasource';
import { Mutex } from '@/common/mutex';
import translate from '@/common/translate';
import { CreatureSkill } from './skill';

export interface BattleEventSkill extends CreatureSkill
{
}

export interface BattleEventSkillConfig
{
    [key: number]: BattleEventSkill
}

const missingBattleEventSkill:BattleEventSkill = 
{
    SkillID: -1,
    SkillName: { Hash: 750427067, Text: 'Unknown', },
    SkillTag: { Hash: 750427067, Text: 'Unknown', },
    SkillTypeDesc: { Hash: 750427067, Text: 'Unknown', },
    SkillDesc: { Hash: 750427067, Text: 'Unknown', },
    SimpleSkillDesc: { Hash: 750427067, Text: 'Unknown', },
    SkillTriggerKey: '',
    ParamList: [],
    SimpleParamList: [],
    ShowStanceList: []
}

const battleEventSkillConfigCache:{[commitId: string]: BattleEventSkillConfig} = {}
const battleEventSkillConfigMutex = new Mutex()
export async function getBattleEventSkills(commitId:string) : Promise<BattleEventSkillConfig>
{
    return battleEventSkillConfigMutex.runExclusive(async () => 
    {
        let config = battleEventSkillConfigCache[commitId]
        if (config == undefined)
        {
            const results = await retrieveJson('ExcelOutput/BattleEventSkillConfig.json', commitId, false) as BattleEventSkillConfig
            for (const skillKey in results)
            {
                const skill = results[skillKey]
                await translate(commitId, skill.SkillName)
                await translate(commitId, skill.SkillTag)
                await translate(commitId, skill.SkillTypeDesc)
                await translate(commitId, skill.SkillDesc)
                await translate(commitId, skill.SimpleSkillDesc)
            }
            config = battleEventSkillConfigCache[commitId] = results
            console.log('cached battle event skill config for ' + commitId)
        }
        return config
    })
}

export async function getBattleEventSkill(commitId:string, battleEventSkillId:number) : Promise<BattleEventSkill>
{
    return (await getBattleEventSkills(commitId))[battleEventSkillId] ?? missingBattleEventSkill
}

export async function getBattleEventSkillsByIds(commitId:string, battleEventSkillIds:number[]) : Promise<BattleEventSkill[]>
{
    const result:BattleEventSkill[] = []
    for (const battleEventSkillId of battleEventSkillIds)
        result.push(await getBattleEventSkill(commitId, battleEventSkillId))
    return result
}