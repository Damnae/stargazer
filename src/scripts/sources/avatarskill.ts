import { retrieveJson } from '../datasource';
import translate, { Translatable } from '../translate';
import { AbilityParam } from './ability';

export interface AvatarSkill
{
    SkillID: number
    SkillName: Translatable
    SkillTag: Translatable
    SkillTypeDesc: Translatable
    SkillDesc: Translatable
    SimpleSkillDesc: Translatable
    SkillTriggerKey: string
    RatedSkillTreeID: number[]
    RatedRankID: number[]
    ParamList: AbilityParam[]
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
    SkillID: -1,
    SkillName: { Hash: 750427067, Text: 'Unknown', },
    SkillTag: { Hash: 750427067, Text: 'Unknown', },
    SkillTypeDesc: { Hash: 750427067, Text: 'Unknown', },
    SkillDesc: { Hash: 750427067, Text: 'Unknown', },
    SimpleSkillDesc: { Hash: 750427067, Text: 'Unknown', },
    SkillTriggerKey: '',
    RatedSkillTreeID: [],
    RatedRankID: [],
    ParamList: [ { Value: 0, }],
}

const avatarSkillConfigCache:{[commitId: string]: AvatarSkillConfig} = {}
export async function getAvatarSkills(commitId:string) : Promise<AvatarSkillConfig>
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
}

export async function getAvatarSkill(commitId:string, avatarSkillId:number) : Promise<AvatarSkill>
{
    const ranks = (await getAvatarSkills(commitId))[avatarSkillId]
    let skill = ranks[Object.keys(ranks).length * 2 / 3]
    if (skill == null)
    {
        // TODO parse these from MazeSkill.json using RelatedAvatarSkill as ID
        skill = structuredClone(missingAvatarSkill)
        skill.SkillID = avatarSkillId
        skill.SkillName.Text = avatarSkillId.toString()
        skill.SkillTypeDesc.Text = 'Maze(?)'
    }
    return skill
}

export async function getAvatarSkillsByIds(commitId:string, avatarSkillIds:number[]) : Promise<AvatarSkill[]>
{
    const result:AvatarSkill[] = []
    for (const avatarSkillId of avatarSkillIds)
        result.push(await getAvatarSkill(commitId, avatarSkillId))
    return result
}