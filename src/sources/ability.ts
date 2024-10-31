import { retrieveJson, retrieveTree } from '@/common/datasource';
import { MutexGroup } from '@/common/mutex';
import { ExpressionContext, GamecoreTask, GamecoreTargetType, DynamicExpression, DynamicValues, } from './gamecore';
import useSettings from '@/common/settings';

export interface ModifierEventHandler
{
  Event?:string
  CallbackConfig: GamecoreTask[]
}

export interface ModifierPreshowConfig
{
  SkillTypes: string[]
  TargetType: GamecoreTargetType
  Condition: GamecoreTask
  ActionDelayPreshowConfig?:
  {
    [property:string]: DynamicExpression
  }
  BreakActionDelayPreshowConfig?:
  {
    [property:string]: DynamicExpression
  }
}
export interface ModifierStanceConfig
{
  SkillType: string
  Condition: GamecoreTask
  MultiplyRatio?:DynamicExpression
  StanceBreakAddRatio?:DynamicExpression
  AddForceStanceDamageFlag?:boolean
  AddWeakness?:string
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

  SourceFile:string
  SourceGroup:TaskContextSource
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
  ModifierStancePreshowConfig?: ModifierStanceConfig
  OnAbilityPropertyChange?:PropertyChangeWatcher[]
  OnDynamicValueChange?:ValueChangeWatcher[]
  TaskListTemplate?:TaskListTemplate[]
  _CallbackList?:
  {
    [eventName:string]: ModifierEventHandler
  }
  _PriorityList?:
  [
    {
      PriorityName:string
      Key:string
    }
  ]
  AdditionConfig?:
  {
    FilterMask?:string
    DependencyOnAdd?:
    {
      DependentModifier:string
      CasterFilter?:GamecoreTargetType
    }
    DependencyOnRemove?:
    {
      DependentModifier:string
      CasterFilter?:GamecoreTargetType
    }
    SubModifierList?:
    [
      {
        Name:string
        TargetType:GamecoreTargetType
        IsHaloStatus?:boolean
        DynamicValues:
        {
          [key:string]:DynamicExpression
        }
      }
    ]
  }
  UIConfig?: 
  {
    UIEffectPath:string
    UIPosition:string
    ModifierUIPriority:string
  }

  SourceFile:string
  SourceGroup:TaskContextSource
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
  
  SourceFile:string
  SourceGroup:TaskContextSource
  SearchKeywords: string[]
}

export interface AbilityConfig
{
  AbilityList: Ability[]
  GlobalModifiers?:
  {
    [key:string]: Modifier
  }
  GlobalTemplates?:TaskListTemplateConfig
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

export enum TaskContextSource
{
  Common = 'Common',
  TaskTemplate = 'TaskTemplate',
  Avatar = 'Avatar',
  Monster = 'Monster',
  Equipment = 'Equipment',
  RelicSet = 'RelicSet',
  BattleEvent = 'BattleEvent',
  Level = 'Level',
  Adventure = 'Adventure',
}

export enum TaskContextType
{
  Empty = 'Empty',
  Avatar = 'Avatar',
  Monster = 'Monster',
  Equipment = 'Equipment',
  RelicSet = 'RelicSet',
  BattleEvent = 'BattleEvent',
  Level = 'Level',
  Rogue = 'Rogue',

  TaskTemplate = 'TaskTemplate',

  DiffCommon = 'DiffCommon',
  DiffAvatar = 'DiffAvatar',
  DiffMonster = 'DiffMonster',
  DiffEquipment = 'DiffEquipment',
  DiffRelicSet = 'DiffRelicSet',
  DiffBattleEvent = 'DiffBattleEvent',
  DiffLevel = 'DiffLevel',
  DiffAdventure = 'DiffAdventure',
  
  All = 'All', 
}

const contextTypeToSources:{[type in TaskContextType]:TaskContextSource[]} =
{
  Empty: [],

  // Minimal context to display data from these contexts
  Avatar: [ TaskContextSource.Common, TaskContextSource.TaskTemplate, TaskContextSource.Avatar, ],
  Monster: [ TaskContextSource.Common, TaskContextSource.TaskTemplate, TaskContextSource.Monster, ],
  Equipment: [ TaskContextSource.Common, TaskContextSource.TaskTemplate, TaskContextSource.Equipment, ],
  RelicSet: [ TaskContextSource.Common, TaskContextSource.TaskTemplate, TaskContextSource.RelicSet, ],
  BattleEvent: [ TaskContextSource.Common, TaskContextSource.TaskTemplate, TaskContextSource.BattleEvent, ],
  Level: [ TaskContextSource.Common, TaskContextSource.TaskTemplate, TaskContextSource.Level, ],
  Rogue: [ TaskContextSource.Common, TaskContextSource.TaskTemplate, TaskContextSource.Level, TaskContextSource.Adventure, ],
  
  // All task templates ONLY
  TaskTemplate: [ TaskContextSource.TaskTemplate, ],
    
  // Used for changes page
  DiffCommon: [ TaskContextSource.Common, ],
  DiffAvatar: [ TaskContextSource.Avatar, ],
  DiffMonster: [ TaskContextSource.Monster, ],
  DiffEquipment: [ TaskContextSource.Equipment, ],
  DiffRelicSet: [ TaskContextSource.RelicSet, ],
  DiffBattleEvent: [ TaskContextSource.BattleEvent, ],
  DiffLevel: [ TaskContextSource.Level, ],
  DiffAdventure: [ TaskContextSource.Adventure, ],
  
  // All the sources
  All: 
  [ 
    TaskContextSource.Common, 
    TaskContextSource.TaskTemplate, 
    TaskContextSource.Avatar, 
    TaskContextSource.Monster,
    TaskContextSource.Equipment, 
    TaskContextSource.RelicSet, 
    TaskContextSource.BattleEvent, 
    TaskContextSource.Level, 
    TaskContextSource.Adventure, 
  ],
}

interface ContextPathEntry
{
  Abilities: string[]
  Modifiers: string[]
  TaskListTemplates: string[]
}

// These should NOT overlap
const contextSourceToPaths:{[key in TaskContextSource]:ContextPathEntry} =
{
  Common:
  {
    Abilities: 
    [
      'Config/ConfigAbility/Common_Additional_Ability.json',
    ],
    Modifiers: 
    [
      'Config/ConfigGlobalModifier/GlobalModifier.json',
      'Config/ConfigGlobalModifier/GlobalModifier_Reference.json',
      'Config/ConfigGlobalModifier/GlobalModifier_Common_Property.json',
      'Config/ConfigGlobalModifier/GlobalModifier_Common_Specific.json',
      'Config/ConfigGlobalModifier/GlobalModifier_System.json',
      'Config/ConfigGlobalModifier/GlobalModifier_WhiteBox_Common.json',
    ],
    TaskListTemplates: 
    [
      'Config/ConfigGlobalTaskListTemplate/GlobalTaskListTemplate.json',
      'Config/ConfigGlobalTaskListTemplate/GlobalTaskListTemplate_GM.json',
      'Config/ConfigGlobalTaskListTemplate/GlobalTaskListTemplate_InfiniteWave.json',
      'Config/ConfigGlobalTaskListTemplate/GlobalTaskListTemplate_WaveMonsterPerform.json',
      'Config/ConfigGlobalTaskListTemplate/GlobalTaskListTemplate_WhiteBox.json',
    ],
  },
  TaskTemplate: 
  {
    Abilities: [],
    Modifiers: [],
    TaskListTemplates:
    [
      'Config/ConfigGlobalTaskListTemplate',
    ],
  },
  Avatar:
  {
    Abilities:
    [
      'Config/ConfigAbility/Avatar',
      'Config/ConfigAbility/Avatar/Assistant',
      'Config/ConfigAbility/WhiteBox/Avatar',
    ],
    Modifiers: 
    [
      'Config/ConfigGlobalModifier/GlobalModifier_Avatar.json',
      'Config/ConfigGlobalModifier/GlobalModifier_Avatar_AssistantTrigger.json',
      'Config/ConfigGlobalModifier/GlobalModifier_WhiteBox_Avatar.json',
    ],
    TaskListTemplates: [],
  },
  Monster:
  {
    Abilities: 
    [
      'Config/ConfigAbility/Monster',
      'Config/ConfigAbility/WhiteBox/Monster',
    ],
    Modifiers: 
    [
      'Config/ConfigGlobalModifier/GlobalModifier_Monster.json',
      'Config/ConfigGlobalModifier/GlobalModifier_Monster2.json',
      'Config/ConfigGlobalModifier/GlobalModifier_WhiteBox_Monster.json',
    ],
    TaskListTemplates: [],
  },
  Equipment:
  {
    Abilities: 
    [
      'Config/ConfigAbility/EquipmemtAbility.json',
      'Config/ConfigAbility/Equip/EquipmemtAbility.json',
      'Config/ConfigAbility/WhiteBox/W_EquipmemtAbility.json',
    ],
    Modifiers: [],
    TaskListTemplates: [],
  },
  RelicSet:
  {
    Abilities:
    [
      'Config/ConfigAbility/RelicAbility.json',
      'Config/ConfigAbility/Equip/RelicAbility.json ',
      'Config/ConfigAbility/WhiteBox/W_RelicAbility.json',
    ],
    Modifiers: [],
    TaskListTemplates: [],
  },
  BattleEvent:
  {
    Abilities: 
    [
      'Config/ConfigAbility/BattleEventAbility.json',
      'Config/ConfigAbility/BattleEventAbility_2.json',
      'Config/ConfigAbility/BattleEventAbility_BoxingGym.json',
      'Config/ConfigAbility/BattleEventAbility_NewBoxingClub.json',
      'Config/ConfigAbility/BattleEventAbility_SilverWolfEvent.json',
      'Config/ConfigAbility/StageBattleEventAbility.json',
      'Config/ConfigAbility/BattleEvent',
      'Config/ConfigAbility/WhiteBox/W_BattleEventAbility_SummonAndScoringTest.json',
      'Config/ConfigAbility/WhiteBox/W_BattleEventAbility_SummonAndScoringTest_2.json',
      'Config/ConfigAbility/WhiteBox/W_BattleEventAbility_SummonAndScoringTest_3.json',
      'Config/ConfigAbility/WhiteBox/W_BattleEventAbility_v1.6_Ability.json',
      'Config/ConfigAbility/WhiteBox/BattleEvent',
    ],
    Modifiers: [],
    TaskListTemplates: [],
  },
  Level:
  {
    Abilities: 
    [
      'Config/ConfigAbility/Level',
      'Config/ConfigAbility/TrialPlayerPassiveAbility.json',
    ],
    Modifiers: 
    [
      'Config/ConfigGlobalModifier/GlobalModifier_Level.json',
      'Config/ConfigGlobalModifier/GlobalModifier_WhiteBox_Level.json',
      'Config/ConfigGlobalModifier/GlobalModifier_WhiteBox_LevelRogueV2.json',
    ],
    TaskListTemplates: [],
  },
  Adventure:
  {
    Abilities: 
    [
      'Config/ConfigAdventureAbility/LocalPlayer',
      'Config/ConfigAdventureAbility/WhiteBox/LocalPlayer',
    ],
    Modifiers: 
    [
      'Config/ConfigAdventureModifier',
    ],
    TaskListTemplates: [],
  },
}

const [settings, _sessionSettings] = useSettings()
if (!settings.includeWhiteBox)
{
  for (const contextPathKey in contextSourceToPaths)
  {
    const contextPaths = contextSourceToPaths[contextPathKey as TaskContextSource]
    contextPaths.Abilities = contextPaths.Abilities.filter(p => !p.includes('WhiteBox'))
    contextPaths.Modifiers = contextPaths.Modifiers.filter(p => !p.includes('WhiteBox'))
    contextPaths.TaskListTemplates = contextPaths.TaskListTemplates.filter(p => !p.includes('WhiteBox'))
  }
}

const taskContextSourceCache:{[commitId: string]: {[type:string]: TaskContext}} = {}
const taskContextSourceMutex = new MutexGroup()
async function getTaskContextFromSource(commitId:string, source:TaskContextSource) : Promise<TaskContext>
{
  const key = `${commitId}|${source}`
  return taskContextSourceMutex.runExclusive(key, async () => 
  {
    let result 
    let container = taskContextSourceCache[commitId]
    if (container === undefined)
      container = taskContextSourceCache[commitId] = {}
    else result = container[source]
  
    if (result == undefined)
    {
      const context:TaskContext = 
      {
        Abilities: {},
        Modifiers: {},
        TaskListTemplates: {},
      }
      const paths = contextSourceToPaths[source]

      for (const path of paths.Abilities)
        if (path.endsWith('.json'))
          mergeAbilityConfig(context, await getAbilities(commitId, path, source) as AbilityConfig)
        else
        {
          const tree = await retrieveTree(path, commitId, false)
          for (const treePath of tree.map(t => t.path))
            if (pathIsDataJson(treePath))
              mergeAbilityConfig(context, await getAbilities(commitId, `${path}/${treePath}`, source) as AbilityConfig)
        }
        
      for (const path of paths.Modifiers)
        if (path.endsWith('.json'))
          mergeModifierConfig(context, await getModifiers(commitId, path, source) as ModifierConfig)
        else
        {
          const tree = await retrieveTree(path, commitId, false)
          for (const treePath of tree.map(t => t.path))
            if (pathIsDataJson(treePath))
              mergeModifierConfig(context, await getModifiers(commitId, `${path}/${treePath}`, source) as ModifierConfig)
        }

      for (const path of paths.TaskListTemplates)
        if (path.endsWith('.json'))
          mergeTaskListTemplateConfig(context, await getTaskListTemplates(commitId, path, source) as TaskListTemplateConfig)
        else
        {
          const tree = await retrieveTree(path, commitId, false)
          for (const treePath of tree.map(t => t.path))
            if (pathIsDataJson(treePath))
              mergeTaskListTemplateConfig(context, await getTaskListTemplates(commitId, `${path}/${treePath}`, source) as TaskListTemplateConfig)
        }
  
      result = container[source] = context
      console.log(`cached task context source ${source} for ${commitId} (${Object.keys(context.Abilities).length}/${Object.keys(context.Modifiers).length}/${Object.keys(context.TaskListTemplates).length})`)
    }
    return result
  })
}

const taskContextCache:{[commitId: string]: {[type: string]: TaskContext}} = {}
const taskContextMutex = new MutexGroup()
export async function getTaskContext(commitId:string, type:TaskContextType) : Promise<TaskContext>
{
  const key = `${commitId}|${type}`
  return taskContextMutex.runExclusive(key, async () => 
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

      const sources = contextTypeToSources[type]
      for (const source of sources)
      {
        const sourceContext = await getTaskContextFromSource(commitId, source)
        mergeTaskContext(context, sourceContext)
      }
  
      result = container[type] = context
      console.log(`cached task context ${type} for ${commitId} (${Object.keys(context.Abilities).length}/${Object.keys(context.Modifiers).length}/${Object.keys(context.TaskListTemplates).length})`)
    }
    return result
  })
}

function pathIsDataJson(path:string) : boolean
{
  return path.endsWith('.json')
    && !path.endsWith('.layout.json') 
    && !path.includes('/Camera/')
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

async function getAbilities(commitId:string, path:string, fromSource:TaskContextSource) : Promise<AbilityConfig>
{
  const result = await retrieveJson(path, commitId, false) as AbilityConfig
  if (result?.AbilityList)
    for (const ability of result.AbilityList)
    {
      ability.SourceFile = path
      ability.SourceGroup = fromSource
      ability.SearchKeywords = []
      ability.SearchKeywords.push(ability.Name.toLowerCase())

      if (ability.Modifiers)
        for (const [name, modifier] of Object.entries(ability.Modifiers))
        {
          modifier.Name = name
          modifier.SourceFile = path
          modifier.SourceGroup = fromSource
          ability.SearchKeywords.push(name.toLowerCase())
        }
    }
  if (result?.GlobalModifiers)
    for (const [name, modifier] of Object.entries(result.GlobalModifiers))
    {
      modifier.Name = name
      modifier.SourceFile = path
      modifier.SourceGroup = fromSource
    }

  return result
}

async function getModifiers(commitId:string, path:string, fromSource:TaskContextSource) : Promise<ModifierConfig>
{
  const result = await retrieveJson(path, commitId, false) as ModifierConfig
  if (result?.ModifierMap)
    for (const [name, modifier] of Object.entries(result.ModifierMap))
    {
      modifier.Name = name
      modifier.SourceFile = path
      modifier.SourceGroup = fromSource
    }
  return result
}

async function getTaskListTemplates(commitId:string, path:string, fromSource:TaskContextSource) : Promise<TaskListTemplateConfig>
{
  const result = await retrieveJson(path, commitId, false) as TaskListTemplateConfig
  for (const taskListTemplate of result.TaskListTemplate)
  {
    taskListTemplate.SourceFile = path
    taskListTemplate.SourceGroup = fromSource
  }
  return result
}

function mergeTaskContext(into:TaskContext, from:TaskContext)
{
  into.Abilities = { ...into.Abilities, ...from.Abilities }
  into.Modifiers = { ...into.Modifiers, ...from.Modifiers }
  into.TaskListTemplates = { ...into.TaskListTemplates, ...from.TaskListTemplates }
}

function mergeAbilityConfig(into:TaskContext, from:AbilityConfig)
{
  if (!from)
    return;

  if (from.AbilityList !== undefined)
    for (const ability of from.AbilityList)
    {
      let nameIndex = 2
      const originalName = ability.Name
      while (ability.Name in into.Abilities)
          ability.Name = `${originalName}#${nameIndex++}`

      into.Abilities[ability.Name] = ability
    }

  if (from.GlobalModifiers !== undefined)
    for (const modifier of Object.values(from.GlobalModifiers))
    {
      let nameIndex = 2
      const originalName = modifier.Name
      while (modifier.Name in into.Abilities)
          modifier.Name = `${originalName}#${nameIndex++}`

      into.Modifiers[modifier.Name] = modifier
    }

  if (from.GlobalTemplates !== undefined)
    for (const taskTemplate of Object.values(from.GlobalTemplates))
    {
      let nameIndex = 2
      const originalName = taskTemplate.Name
      while (taskTemplate.Name in into.TaskListTemplates)
        taskTemplate.Name = `${originalName}#${nameIndex++}`

      into.TaskListTemplates[taskTemplate.Name] = taskTemplate
    }
}

function mergeModifierConfig(into:TaskContext, from:ModifierConfig)
{
  if (!from?.ModifierMap)
    return;
  
  for (const modifier of Object.values(from.ModifierMap))
  {
    let nameIndex = 2
    const originalName = modifier.Name
    while (modifier.Name in into.Abilities)
        modifier.Name = `${originalName}#${nameIndex++}`

    into.Modifiers[modifier.Name] = modifier
  }
}

function mergeTaskListTemplateConfig(into:TaskContext, from:TaskListTemplateConfig)
{
  if (!from?.TaskListTemplate)
    return;
  
  for (const template of from.TaskListTemplate)
  {
    let nameIndex = 2
    const originalName = template.Name
    while (template.Name in into.Abilities)
        template.Name = `${originalName}#${nameIndex++}`

    into.TaskListTemplates[template.Name] = template
  }
}