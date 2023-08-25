import { retrieveJson } from '../datasource';
import { GamecoreBlock, GamecoreTargetType, DynamicExpression, DynamicValues, } from './gamecore';

// TODO look at StatusConfig

export interface ModifierEventHandler
{
  CallbackConfig: GamecoreBlock[]
}

export interface ModifierPreshowConfig
{
  SkillTypes: string[]
  TargetType: GamecoreTargetType
  Condition: GamecoreBlock
  ActionDelayPreshowConfig:
  {
    [property:string]: DynamicExpression
  }
}

export interface Modifier
{
  BehaviorFlagList?:string[]
  UseSnapshotEntity?:boolean
  EnterBattlePriority?:string
  Count?:number
  LifeTime?:number
  LifeStepMoment?:string
  Stacking?:string
  MaxLayer?:number
  LayerAddWhenStack?: DynamicExpression
  PerformTime?:DynamicExpression
  DynamicValues?: DynamicValues
  ModifierAffectedPreshowConfig?: ModifierPreshowConfig
  _CallbackList?:
  {
    [eventName:string]: ModifierEventHandler
  }
  UIConfig?: 
  {
    UIEffectPath:string
    UIPosition:string
    ModifierUIPriority:string
  }
}

export interface Ability
{
  Name:string
  TargetInfo:
  {
    TargetType:string
  }
  OnStart?: GamecoreBlock[]
  DynamicValues?: DynamicValues
  Modifiers?:
  {
    [key:string]: Modifier
  }
}

export interface AbilityConfig
{
  AbilityList: Ability[]
  GlobalModifiers?:
  {
    [key:string]: Modifier
  }
}

export interface ModifierConfig
{
  ModifierMap:
  {
    [key:string]: Modifier
  }
}

export interface AbilityContext
{
  Abilities: AbilityConfig[]
  Modifiers: ModifierConfig[]
}

export enum AbilityContextType
{
  Avatar = 'Avatar',
  Monster = 'Monster',
  Equipment = 'Equipment',
  RelicSet = 'RelicSet',
  BattleEvent = 'BattleEvent',
  Level = 'Level',
}

const contextTypeToPaths =
{
  Avatar: 
  {
    Abilities:
    [
      'Config/ConfigAbility/Common_Additional_Ability.json',
      'Config/ConfigAbility/Avatar',
      //'Config/ConfigAbility/Avatar/Camera',
      //'Config/ConfigAbility/Avatar/Assistant',
      //'Config/ConfigAbility/Avatar/Assistant/Camera',
    ],
    Modifiers:
    [
      //'Config/ConfigGlobalModifier/GlobalModifier.json',
      //'Config/ConfigGlobalModifier/GlobalModifier_System.json',
      'Config/ConfigGlobalModifier/GlobalModifier_Common_Property.json',
      'Config/ConfigGlobalModifier/GlobalModifier_Common_Specific.json',
      'Config/ConfigGlobalModifier/GlobalModifier_Avatar.json',
      //'Config/ConfigGlobalModifier/GlobalModifier_Avatar_AssistantTrigger.json',
    ],
  },
  Monster: 
  {
    Abilities:
    [
      'Config/ConfigAbility/Common_Additional_Ability.json',
      'Config/ConfigAbility/Monster',
      //'Config/ConfigAbility/Monster/Camera',
    ],
    Modifiers:
    [
      //'Config/ConfigGlobalModifier/GlobalModifier.json',
      //'Config/ConfigGlobalModifier/GlobalModifier_System.json',
      'Config/ConfigGlobalModifier/GlobalModifier_Common_Property.json',
      'Config/ConfigGlobalModifier/GlobalModifier_Common_Specific.json',
      'Config/ConfigGlobalModifier/GlobalModifier_Monster.json',
    ],
  },
  Equipment: 
  {
    Abilities:
    [
      'Config/ConfigAbility/Common_Additional_Ability.json',
      'Config/ConfigAbility/EquipmemtAbility.json',
    ],
    Modifiers:
    [
      //'Config/ConfigGlobalModifier/GlobalModifier.json',
      //'Config/ConfigGlobalModifier/GlobalModifier_System.json',
      'Config/ConfigGlobalModifier/GlobalModifier_Common_Property.json',
      'Config/ConfigGlobalModifier/GlobalModifier_Common_Specific.json',
    ],
  },
  RelicSet: 
  {
    Abilities:
    [
      'Config/ConfigAbility/Common_Additional_Ability.json',
      'Config/ConfigAbility/RelicAbility.json',
    ],
    Modifiers:
    [
      //'Config/ConfigGlobalModifier/GlobalModifier.json',
      //'Config/ConfigGlobalModifier/GlobalModifier_System.json',
      'Config/ConfigGlobalModifier/GlobalModifier_Common_Property.json',
      'Config/ConfigGlobalModifier/GlobalModifier_Common_Specific.json',
    ],
  },
  BattleEvent: 
  {
    Abilities:
    [
      'Config/ConfigAbility/Common_Additional_Ability.json',
      'Config/ConfigAbility/BattleEventAbility.json',
      'Config/ConfigAbility/StageBattleEventAbility.json',
      'Config/ConfigAbility/BattleEvent',
      //'Config/ConfigAbility/BattleEvent/Camera',
    ],
    Modifiers:
    [
      //'Config/ConfigGlobalModifier/GlobalModifier.json',
      //'Config/ConfigGlobalModifier/GlobalModifier_System.json',
      'Config/ConfigGlobalModifier/GlobalModifier_Common_Property.json',
      'Config/ConfigGlobalModifier/GlobalModifier_Common_Specific.json',
    ],
  },
  Level: 
  {
    Abilities:
    [
      'Config/ConfigAbility/Common_Additional_Ability.json',
      'Config/ConfigAbility/Level',
    ],
    Modifiers:
    [
      //'Config/ConfigGlobalModifier/GlobalModifier.json',
      //'Config/ConfigGlobalModifier/GlobalModifier_System.json',
      'Config/ConfigGlobalModifier/GlobalModifier_Common_Property.json',
      'Config/ConfigGlobalModifier/GlobalModifier_Common_Specific.json',
      'Config/ConfigGlobalModifier/GlobalModifier_Level.json',
    ],
  },
}


const abilityContextConfigCache:{[commitId: string]: {[type: string]: AbilityContext}} = {}
export async function getAbilityContext(commitId:string, type:AbilityContextType) : Promise<AbilityContext>
{
  const context:AbilityContext = 
  {
    Abilities: [],
    Modifiers: []
  }
  const paths = contextTypeToPaths[type]
  for (const path of paths.Abilities)
  {
    if (path.endsWith('.json'))
      context.Abilities.push(await getAbilities(commitId, path) as AbilityConfig)
    else
    {
      const response = await retrieveJson(`git/trees/${commitId}:${path}`, commitId, true)
      const tree = response.tree
      if (tree !== undefined)
        for (const treePath of tree.map((t:any) => t.path))
          if (treePath.endsWith('.json'))
            context.Abilities.push(await getAbilities(commitId, `${path}/${treePath}`) as AbilityConfig)
    }
  }
  for (const path of paths.Modifiers)
      context.Modifiers.push(await getModifiers(commitId, path) as ModifierConfig)

  // TODO cache in abilityContextConfigCache

  return context
}

async function getAbilities(commitId:string, path:string) : Promise<AbilityConfig>
{
  const result = await retrieveJson(path, commitId, false) as AbilityConfig
  return result
}

async function getModifiers(commitId:string, path:string) : Promise<ModifierConfig>
{
  const result = await retrieveJson(path, commitId, false) as ModifierConfig
  return result
}