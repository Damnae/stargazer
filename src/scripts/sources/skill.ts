import { Translatable } from '../translate';
import { AbilityParam } from './ability';

// AvatarSkillConfig.json       
//      skill, with ranks
//      SkillTriggerKey -> skill -> entry ability  

// MonsterSkillConfig.json      
//      skill, no ranks
//      SkillTriggerKey -> skill -> entry ability 

export interface CreatureSkill
{    
  SkillID: number
  SkillName: Translatable
  SkillTag: Translatable
  SkillTypeDesc: Translatable
  SkillDesc: Translatable
  SimpleSkillDesc: Translatable
  SkillTriggerKey: string
  ParamList: AbilityParam[]
}

// EquipmentSkillConfig.json    
//      skill, with ranks (lightcones)
//      AbilityName -> ability

export interface EquipmentSkill
{
    SkillID: number
    SkillName: Translatable
    SkillDesc: Translatable
    Level: number // Ligthcone refinement
    AbilityName: string
    AbilityProperty: 
    [
      {
        PropertyType: string
        Value: 
        {
          Value: number
        }
      }
    ]
    ParamList: AbilityParam[]
}

// BattleEventSkillConfig.json  
//      skill, no ranks
//      SkillTriggerKey -> skill -> entry ability 
//      Party-wide "ultimate" for some weekly bosses, etc.

export interface BattleEventSkill
{
    SkillID: number
    SkillName: Translatable
    SkillTag: Translatable
    SkillTypeDesc: Translatable
    SkillDesc: Translatable
    SimpleSkillDesc: Translatable
    SkillTriggerKey: string
    PhaseList: string[]
    ParamList: AbilityParam[]
}

// RelicSetSkillConfig.json     
//      NOT skill, ParamList is called AbilityParamList
//      AbilityName -> ability

export interface RelicSetSkill
{
    SetID: number
    RequireNum: number
    SkillDesc: string
    PropertyList: 
    [
      {
        FGBOJAIOFIJ: string // PropertyType
        LGKGOMNMBAH: // Value
        {
          Value: number
        }
      }
    ],
    AbilityName: string
    AbilityParamList: AbilityParam[]
}

