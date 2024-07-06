import { retrieveJson } from '@/common/datasource';
import { Mutex } from '@/common/mutex';
import translate from '@/common/translate';
import { CreatureSkill } from './skill';

export interface AvatarSkill extends CreatureSkill
{
    Level: number
    MaxLevel: number
    RatedSkillTreeID: [],
    RatedRankID: [],
    SPBase?: { Value: number },
    SPMultipleRatio?: { Value: number },
    BPNeed?: { Value: number },
    BPAdd?: { Value: number },
    DelayRatio?: { Value: number },
    SkillComboValueDelta?: { Value: number },
    SkillNeed?: { Hash: number },
}

export interface AvatarSkillRanks
{
    [key: number]: AvatarSkill
}

export interface AvatarSkillConfig
{
    [key: number]: AvatarSkillRanks
}

const missingAvatarSkill:AvatarSkill = 
{   
    Level:1,
    MaxLevel:1,
    SkillID: -1,
    SkillName: { Hash: 750427067, Text: 'Unknown', },
    SkillTag: { Hash: 750427067, Text: 'Unknown', },
    SkillTypeDesc: { Hash: 750427067, Text: 'Unknown', },
    SkillDesc: { Hash: 750427067, Text: 'Unknown', },
    SimpleSkillDesc: { Hash: 750427067, Text: 'Unknown', },
    SkillTriggerKey: '',
    RatedSkillTreeID: [],
    RatedRankID: [],
    ParamList: [],
    SimpleParamList: [],
    ShowStanceList: []
}

const avatarSkillConfigCache:{[commitId: string]: AvatarSkillConfig} = {}
const avatarSkillConfigMutex = new Mutex()

export async function getAvatarSkills(commitId:string) : Promise<AvatarSkillConfig>
{
    return avatarSkillConfigMutex.runExclusive(async () => 
    {
        let config = avatarSkillConfigCache[commitId]
        if (config == undefined)
        {
            const results = await retrieveJson('ExcelOutput/AvatarSkillConfig.json', commitId, false) as AvatarSkillConfig
            for (const skillKey in results)
            {
                const ranks = results[skillKey]        
                for (const rankKey in ranks)
                {
                    const skill = ranks[rankKey]
                    await translate(commitId, skill.SkillName)
                    await translate(commitId, skill.SkillTag)
                    await translate(commitId, skill.SkillTypeDesc)
                    await translate(commitId, skill.SkillDesc)
                    await translate(commitId, skill.SimpleSkillDesc)
                }
            }
            config = avatarSkillConfigCache[commitId] = results
            console.log('cached avatar skill config for ' + commitId)
        }
        return config
    })
}

export async function getAvatarSkill(commitId:string, avatarSkillId:number) : Promise<AvatarSkill>
{
    const ranks = (await getAvatarSkills(commitId))[avatarSkillId]
    if (ranks)
    {
        let skill = ranks[Object.keys(ranks).length * 2 / 3] ?? ranks[1]
        if (skill)
            return skill
    }
    return missingAvatarSkill
}

export async function getAvatarSkillsByIds(commitId:string, avatarSkillIds:number[]) : Promise<AvatarSkill[]>
{
    const result:AvatarSkill[] = []
    for (const avatarSkillId of avatarSkillIds)
        result.push(await getAvatarSkill(commitId, avatarSkillId))
    return result
}