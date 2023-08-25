import { retrieveJson } from '../datasource';
import { Avatar } from './avatar';
import { Monster } from './monster';
import { DynamicValues } from './gamecore';

export interface CharacterSkill
{
    Name: string
    SkillType: string
    EntryAbility: string
    PrepareAbility?: string
    ComplexSkillAI?:
    {
        SkillBasicPower?:
        {
            Value: number
        }
        Groups:
        [
            {
                GroupName:string
                Weight?:
                {
                    Value: number
                }
            }
        ]
    }
    ChildSkillList?: string[] // used by Phys MC's ult
}

export interface Character
{
    SkillList: CharacterSkill[]
    AbilityList: string[]
    SkillAbilityList: 
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
}

export async function getCharacterByAvatar(commitId:string, avatar:Avatar) : Promise<Character>
{
    return getCharacter(commitId, avatar.JsonPath)
}
export async function getCharacterByMonster(commitId:string, monster:Monster) : Promise<Character>
{
    return getCharacter(commitId, monster.MonsterTemplate.JsonConfig)
}

async function getCharacter(commitId:string, path:string) : Promise<Character>
{
    const result = await retrieveJson(path, commitId, false) as Character
    return result
}