import { retrieveJson } from '../datasource';
import translate from '../translate';
import { CreatureSkill } from './skill';

export interface MonsterSkill extends CreatureSkill
{
    PhaseList: string[]
}

export interface MonsterSkillConfig
{
    [key: number]: MonsterSkill
}

const missingMonsterSkill:MonsterSkill = 
{
    SkillID: -1,
    SkillName: { Hash: 750427067, Text: 'Unknown', },
    SkillTag: { Hash: 750427067, Text: 'Unknown', },
    SkillTypeDesc: { Hash: 750427067, Text: 'Unknown', },
    SkillDesc: { Hash: 750427067, Text: 'Unknown', },
    SimpleSkillDesc: { Hash: 750427067, Text: 'Unknown', },
    SkillTriggerKey: '',
    PhaseList: [],
    ParamList: [{ Value: 0, }],
    ShowStanceList: []
}

const monsterSkillConfigCache:{[commitId: string]: MonsterSkillConfig} = {}
export async function getMonsterSkills(commitId:string) : Promise<MonsterSkillConfig>
{
    let config = monsterSkillConfigCache[commitId]
    if (config == undefined)
    {
        const results = await retrieveJson('ExcelOutput/MonsterSkillConfig.json', commitId, false) as MonsterSkillConfig
        for (const skillKey in results)
        {
            const skill = results[skillKey]
            await translate(commitId, skill.SkillName)
            await translate(commitId, skill.SkillTag)
            await translate(commitId, skill.SkillTypeDesc)
            await translate(commitId, skill.SkillDesc)
            await translate(commitId, skill.SimpleSkillDesc)
        }
        config = monsterSkillConfigCache[commitId] = results
        console.log('cached monster skill config for ' + commitId)
    }
    return config
}

export async function getMonsterSkill(commitId:string, monsterSkillId:number) : Promise<MonsterSkill>
{
    return (await getMonsterSkills(commitId))[monsterSkillId] ?? missingMonsterSkill
}

export async function getMonsterSkillsByIds(commitId:string, monsterSkillIds:number[]) : Promise<MonsterSkill[]>
{
    const result:MonsterSkill[] = []
    for (const avatarSkillId of monsterSkillIds)
        result.push(await getMonsterSkill(commitId, avatarSkillId))
    return result
}