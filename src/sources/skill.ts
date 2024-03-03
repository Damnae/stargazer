import { Translatable } from '@/common/translate';
import { GamecoreParam } from './gamecore';

// AvatarSkillConfig.json       
//      skill, with ranks
//      SkillTriggerKey -> skill -> entry ability  

// MonsterSkillConfig.json      
//      skill, no ranks
//      SkillTriggerKey -> skill -> entry ability 

// BattleEventSkillConfig.json  
//      skill, no ranks
//      SkillTriggerKey -> skill -> entry ability 
//      Party-wide "ultimate" for some weekly bosses, etc.

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
  SimpleParamList: GamecoreParam[]
}

// EquipmentSkillConfig.json    
//      skill, with ranks (lightcones)
//      AbilityName -> ability

// RelicSetSkillConfig.json     
//      NOT skill, ParamList is called AbilityParamList
//      AbilityName -> ability
