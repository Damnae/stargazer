import { Translatable } from '../translate';
import { GamecoreParam } from './gamecore';

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
  ShowStanceList?: GamecoreParam[]
  ParamList: GamecoreParam[]
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
    ParamList: GamecoreParam[]
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
    ParamList: GamecoreParam[]
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
    AbilityParamList: GamecoreParam[]
}

