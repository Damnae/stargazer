import { retrieveJson } from '../datasource';
import { GamecoreNode, GamecoreTargetType, DynamicExpression, DynamicValues, } from './gamecore';

// TODO look at StatusConfig

export interface ModifierEventHandler
{
  CallbackConfig: GamecoreNode[]
}

export interface ModifierPreshowConfig
{
  SkillTypes: string[]
  TargetType: GamecoreTargetType
  Condition: GamecoreNode
  ActionDelayPreshowConfig:
  {
    [property:string]: DynamicExpression
  }
}

export interface RangeWatcher
{
  Min?:DynamicExpression
  Max?:DynamicExpression
  MaxInclusive?:boolean
  OnEnterRange?: GamecoreNode[]
  OnExitRange?: GamecoreNode[]
  OnChange?: GamecoreNode[]
}

export interface PropertyChangeWatcher
{
  Property:string
  Ranges:RangeWatcher[]
}

export interface ValueChangeWatcher
{
  Key: 
  {
    Hash: number
  },
  Ranges:RangeWatcher[]
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
  OnAbilityPropertyChange?:PropertyChangeWatcher[]
  OnDynamicValueChange?:ValueChangeWatcher[]
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
    MaxTargetCount?:number
  }
  OnStart?: GamecoreNode[]
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
  Abilities: 
  {
    [key:string]: Ability
  }
  Modifiers: 
  {
    [key:string]: Modifier
  }
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

const abilityContextCache:{[commitId: string]: {[type: string]: AbilityContext}} = {}
export async function getAbilityContext(commitId:string, type:AbilityContextType) : Promise<AbilityContext>
{
  let result 
  let container = abilityContextCache[commitId]
  if (container === undefined)
    container = abilityContextCache[commitId] = {}
  else result = container[type]

  if (result == undefined)
  {
    const context:AbilityContext = 
    {
      Abilities: {},
      Modifiers: {},
    }
    const paths = contextTypeToPaths[type]
    for (const path of paths.Abilities)
      if (path.endsWith('.json'))
        mergeAbilityConfig(context, await getAbilities(commitId, path) as AbilityConfig)
      else
      {
        const response = await retrieveJson(`git/trees/${commitId}:${path}`, commitId, true)
        const tree = response.tree
        if (tree !== undefined)
          for (const treePath of tree.map((t:any) => t.path))
            if (treePath.endsWith('.json'))
              mergeAbilityConfig(context, await getAbilities(commitId, `${path}/${treePath}`) as AbilityConfig)
      }
      
    for (const path of paths.Modifiers)
      mergeModifierConfig(context, await getModifiers(commitId, path) as ModifierConfig)

    result = container[type] = context
    console.log(`cached ${type} ability context for ${commitId}`)
  }
  return result
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

function mergeAbilityConfig(into:AbilityContext, from:AbilityConfig)
{
  for (const ability of from.AbilityList)
    into.Abilities[ability.Name] = ability
  if (from.GlobalModifiers !== undefined)
    Object.assign(into.Modifiers, from.GlobalModifiers)
}

function mergeModifierConfig(into:AbilityContext, from:ModifierConfig)
{
  Object.assign(into.Modifiers, from.ModifierMap)
}