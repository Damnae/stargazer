import { retrieveJson } from '@/common/datasource';
import { MutexGroup } from '@/common/mutex';
import { ExpressionContext, GamecoreTask, GamecoreTargetType, DynamicExpression, DynamicValues, } from './gamecore';
import useSettings from '@/common/settings';

export interface ModifierEventHandler
{
  CallbackConfig: GamecoreTask[]
}

export interface ModifierPreshowConfig
{
  SkillTypes: string[]
  TargetType: GamecoreTargetType
  Condition: GamecoreTask
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
  OnEnterRange?: GamecoreTask[]
  OnExitRange?: GamecoreTask[]
  OnChange?: GamecoreTask[]
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

export interface TaskListTemplate
{
  Name:string
  TaskList:GamecoreTask[]
}

export interface Modifier
{
  Name:string // Does not exist in data
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
  TaskListTemplate?:TaskListTemplate[]
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
  OnAdd?: GamecoreTask[]
  OnRemove?: GamecoreTask[]
  OnStart?: GamecoreTask[]
  DynamicValues?: DynamicValues
  Modifiers?:
  {
    [key:string]: Modifier
  }
  TaskListTemplate?:TaskListTemplate[]
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

export interface TaskListTemplateConfig
{
  TaskListTemplate: TaskListTemplate[]
}

export interface TaskContext
{
  Abilities: 
  {
    [key:string]: Ability
  }
  Modifiers: 
  {
    [key:string]: Modifier
  }
  TaskListTemplates:
  {
    [key:string]: TaskListTemplate
  }
}

export enum TaskContextType
{
  Empty = 'Empty',
  All = 'All',
  Avatar = 'Avatar',
  Monster = 'Monster',
  Equipment = 'Equipment',
  RelicSet = 'RelicSet',
  BattleEvent = 'BattleEvent',
  Level = 'Level',
  Rogue = 'Rogue',
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
    TaskListTemplates:
    [
      'Config/ConfigGlobalTaskListTemplate/GlobalTaskListTemplate.json',
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
    TaskListTemplates:
    [
      'Config/ConfigGlobalTaskListTemplate/GlobalTaskListTemplate.json',
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
    TaskListTemplates:
    [
      'Config/ConfigGlobalTaskListTemplate/GlobalTaskListTemplate.json',
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
    TaskListTemplates:
    [
      'Config/ConfigGlobalTaskListTemplate/GlobalTaskListTemplate.json',
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
    TaskListTemplates:
    [
      'Config/ConfigGlobalTaskListTemplate/GlobalTaskListTemplate.json',
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
    TaskListTemplates:
    [
      'Config/ConfigGlobalTaskListTemplate/GlobalTaskListTemplate.json',
    ],
  },
  Rogue: 
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
      'Config/ConfigAdventureModifier',
    ],
    TaskListTemplates:
    [
      'Config/ConfigGlobalTaskListTemplate/GlobalTaskListTemplate.json',
    ],
  },
  Empty: 
  {
    Abilities: [],
    Modifiers: [],
    TaskListTemplates: [],
  },
  All: 
  {
    Abilities:
    [
      'Config/ConfigAbility/Common_Additional_Ability.json',
      'Config/ConfigAbility/Avatar',
      'Config/ConfigAbility/Monster',
      'Config/ConfigAbility/EquipmemtAbility.json',
      'Config/ConfigAbility/RelicAbility.json',
      'Config/ConfigAbility/BattleEventAbility.json',
      'Config/ConfigAbility/StageBattleEventAbility.json',
      'Config/ConfigAbility/BattleEvent',
      'Config/ConfigAbility/Level',
    ],
    Modifiers:
    [
      'Config/ConfigGlobalModifier/GlobalModifier_Common_Property.json',
      'Config/ConfigGlobalModifier/GlobalModifier_Common_Specific.json',
      'Config/ConfigGlobalModifier/GlobalModifier_Avatar.json',
      'Config/ConfigGlobalModifier/GlobalModifier_Monster.json',
      'Config/ConfigGlobalModifier/GlobalModifier_Level.json',
    ],
    TaskListTemplates:
    [
      'Config/ConfigGlobalTaskListTemplate/GlobalTaskListTemplate.json',
    ],
  },
}

const [settings, _sessionSettings] = useSettings()
if (settings.includeWhiteBox)
  contextTypeToPaths.All.Abilities = contextTypeToPaths.All.Abilities.concat([
    'Config/ConfigAbility/WhiteBox',
    'Config/ConfigAbility/WhiteBox/Avatar',
    'Config/ConfigAbility/WhiteBox/BattleEvent',
    'Config/ConfigAbility/WhiteBox/Monster',
  ])

const taskContextCache:{[commitId: string]: {[type: string]: TaskContext}} = {}
const taskContextMutex = new MutexGroup()
export async function getTaskContext(commitId:string, type:TaskContextType) : Promise<TaskContext>
{
  return taskContextMutex.runExclusive(type, async () => 
  {
    let result 
    let container = taskContextCache[commitId]
    if (container === undefined)
      container = taskContextCache[commitId] = {}
    else result = container[type]
  
    if (result == undefined)
    {
      const context:TaskContext = 
      {
        Abilities: {},
        Modifiers: {},
        TaskListTemplates: {},
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
        if (path.endsWith('.json'))
          mergeModifierConfig(context, await getModifiers(commitId, path) as ModifierConfig)
        else
        {
          const response = await retrieveJson(`git/trees/${commitId}:${path}`, commitId, true)
          const tree = response.tree
          if (tree !== undefined)
            for (const treePath of tree.map((t:any) => t.path))
              if (treePath.endsWith('.json'))
                mergeModifierConfig(context, await getModifiers(commitId, `${path}/${treePath}`) as ModifierConfig)
        }

      for (const path of paths.TaskListTemplates)
        mergeTaskListTemplateConfig(context, await getTaskListTemplates(commitId, path) as TaskListTemplateConfig)
  
      result = container[type] = context
      console.log(`cached ${type} ability context for ${commitId}`)
    }
    return result
  })
}

export function findTaskTemplate(templateName:string, expressionContext:ExpressionContext, taskContext:TaskContext) : TaskListTemplate | undefined
{
  let template:TaskListTemplate | undefined = taskContext.TaskListTemplates[templateName]
  if (!template && expressionContext.ModifierId)
  {
    const modifier = taskContext.Modifiers[expressionContext.ModifierId]
    template = modifier?.TaskListTemplate?.find(t => t.Name == templateName)
  }
  if (!template && expressionContext.AbilityId)
  {
    const ability = taskContext.Abilities[expressionContext.AbilityId]
    template = ability?.TaskListTemplate?.find(t => t.Name == templateName)
    if (!template && expressionContext.ModifierId && ability.Modifiers)
    {
      const modifier = ability.Modifiers[expressionContext.ModifierId]
      template = modifier?.TaskListTemplate?.find(t => t.Name == templateName)
    }
  }
  return template
}

async function getAbilities(commitId:string, path:string) : Promise<AbilityConfig>
{
  const result = await retrieveJson(path, commitId, false) as AbilityConfig
  if (result?.AbilityList)
    for (const ability of result.AbilityList)
      if (ability.Modifiers)
        for (const [name, modifier] of Object.entries(ability.Modifiers))
          modifier.Name = name
  if (result?.GlobalModifiers)
    for (const [name, modifier] of Object.entries(result.GlobalModifiers))
      modifier.Name = name
  return result
}

async function getModifiers(commitId:string, path:string) : Promise<ModifierConfig>
{
  const result = await retrieveJson(path, commitId, false) as ModifierConfig
  if (result?.ModifierMap)
    for (const [name, modifier] of Object.entries(result.ModifierMap))
      modifier.Name = name
  return result
}

async function getTaskListTemplates(commitId:string, path:string) : Promise<TaskListTemplateConfig>
{
  const result = await retrieveJson(path, commitId, false) as TaskListTemplateConfig
  return result
}

function mergeAbilityConfig(into:TaskContext, from:AbilityConfig)
{
  for (const ability of from.AbilityList)
    into.Abilities[ability.Name] = ability
  if (from.GlobalModifiers !== undefined)
    Object.assign(into.Modifiers, from.GlobalModifiers)
}

function mergeModifierConfig(into:TaskContext, from:ModifierConfig)
{
  Object.assign(into.Modifiers, from.ModifierMap)
}

function mergeTaskListTemplateConfig(into:TaskContext, from:TaskListTemplateConfig)
{
  for (const template of from.TaskListTemplate)
    into.TaskListTemplates[template.Name] = template
}
