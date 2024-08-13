import { retrieveJson } from '@/common/datasource';
import { Avatar } from './avatar';
import { Monster } from './monster';
import { DynamicValues } from './gamecore';
import { BattleEvent } from './battleevent';
import { AIFactorGroup } from './autofactorgroup';

export interface CharacterSkillAIWeightGroup
{
    GroupName:string
    Weight?:
    {
        Value: number
    }
}

export interface CharacterSkillAIWeightData
{
    SkillBasicPower?:
    {
        Value: number
    }
    Groups:CharacterSkillAIWeightGroup[]
}

export interface CharacterSkill
{
    Name: string
    SkillType: string
    EntryAbility: string
    PrepareAbility?: string
    ComplexSkillAIPreCheck?:CharacterSkillAIWeightData
    ComplexSkillAI?:CharacterSkillAIWeightData
    AIUltraSkillPriority:string,

    ChildSkillList?: string[] // used by Phys MC's ult
}

export interface Character
{
    SkillList: CharacterSkill[]
    AbilityList: string[]
    SkillAbilityList?: 
    [
        {
            Skill: string
            AbilityList: string[]
        }
    ]
    CustomValues?: 
    {
        [key: string]: number
    }
    DynamicValues?: DynamicValues
    AITagList?:
    {
        Values: 
        {
            [hash: number]: {}
        }
    }
    GlobalAIFactorGroups:
    {
        [key:string]: AIFactorGroup
    }
}

export async function getCharacterByAvatar(commitId:string, avatar:Avatar) : Promise<Character|undefined>
{
    return getCharacter(commitId, avatar.JsonPath)
}
export async function getCharacterByMonster(commitId:string, monster:Monster) : Promise<Character|undefined>
{
    return getCharacter(commitId, monster.MonsterTemplate.JsonConfig)
}

export async function getCharacterByBattleEvent(commitId:string, battleEvent:BattleEvent) : Promise<Character|undefined>
{
    if (!battleEvent.Data?.Config)
        return undefined
    return getCharacter(commitId, battleEvent.Data?.Config)
}

async function getCharacter(commitId:string, path:string) : Promise<Character>
{
    const result = await retrieveJson(path, commitId, false) as Character
    return result
}