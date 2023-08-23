export interface AbilityContext
{
  DynamicValues:
  [
    {
      Source: string
      Values?: AbilityContextDynamicValues
    }
  ]
}

export interface AbilityContextDynamicValues
{
  [hash: number]: 
  {
    Name?: string
    Value: number
    From: string
  }
}

export interface AbilityParam
{
    Value: number 
}

import { Creature, } from './creature';
import { Avatar, } from './avatar';
import { CreatureSkill, } from './skill';
import { Character, CharacterDynamicValue, } from './character';

export function buildAbilityContext(creature:Creature, skills:CreatureSkill[], character:Character) : AbilityContext
{
  const characterValues:AbilityContextDynamicValues = Object.fromEntries(
      Object.entries(character.DynamicValues?.Values ?? {})
        .map(([key, value], _index) => [key, 
          { Name:getDynamicValueName(key), 
            Value:resolveDynamicValue(value, creature, skills), 
            From:`character/${explainDynamicValue(value)}` }]))

  return {
    DynamicValues: 
    [
      // Avatar / Monster could have them? (Creature)
      {
        Source: 'character',
        Values: characterValues,
      },
      // Can also be on modifiers
    ],
  }
}

function getDynamicValueName(hash:string) : string
{
    // TODO
  return hash
}

function resolveDynamicValue(value:CharacterDynamicValue, creature:Creature, skills:CreatureSkill[]) : number
{
  if (!value.ReadInfo)
    return 0

  const location = value.ReadInfo.Str
  const index = getIndexFromDynamicValueType(value.ReadInfo.Type)

  if (location.startsWith('SkillMaze'))
  {
    // Technique

  }
  else if (location.startsWith('Skill'))
  {
    // Skills
    const skill = skills.find(s => s.SkillTriggerKey == location)
    if (skill)
      return skill.ParamList[index]?.Value ?? 88888888
    else console.log(`skill not found for ${location}/${index}`)
  }
  else if (location.startsWith('Rank'))
  {
    // Eidolons
    const avatar = creature as Avatar
    const eidolonRank = parseInt(location.match(/\d+/)?.[0] || "0", 10)
    const eidolon = avatar.Eidolons[eidolonRank - 1]
    if (eidolon)
      return eidolon.Param[index]?.Value ?? 88888888
    else console.log(`eidolon not found for ${location}/${index}`)
  }
  else if (location.startsWith('Point'))
  {
    // Traces?

  }
  return 0
}

function explainDynamicValue(value:CharacterDynamicValue) : string
{
  if (!value.ReadInfo)
    return 'var'

  return `${value.ReadInfo.Str}[${getIndexFromDynamicValueType(value.ReadInfo.Type)}]`
}

const dynamicValueTypeToIndex:{[key:string]: number} =
{
  None: 0,
  SkillParam: 1,
  SkillTreeParam: 2,
  SkillEquip: 3,
  SkillRank: 4,
  SkillRelic: 5,
  BattleEvent: 6,
  StageBattleEvent: 7,
}

function getIndexFromDynamicValueType(value:string | number) : number
{
  return dynamicValueTypeToIndex[value] ?? value
}