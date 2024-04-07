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

export enum TaskContextType
{
  Empty = 'Empty',

  // Minimal context to display data from these contexts
  Avatar = 'Avatar',
  Monster = 'Monster',
  Equipment = 'Equipment',
  RelicSet = 'RelicSet',
  BattleEvent = 'BattleEvent',
  Level = 'Level',
  Rogue = 'Rogue',

  // All task templates ONLY
  TaskTemplate = 'TaskTemplate',

  // Used for changes page and combined into All
  // These should NOT overlap
  DiffCommon = 'DiffCommon',
  DiffAvatar = 'DiffAvatar',
  DiffMonster = 'DiffMonster',
  DiffEquipment = 'DiffEquipment',
  DiffRelicSet = 'DiffRelicSet',
  DiffBattleEvent = 'DiffBattleEvent',
  DiffLevel = 'DiffLevel',
  
  All = 'All', 
}

interface ContextPathEntry
{
  Abilities: string[]
  Modifiers: string[]
  TaskListTemplates: string[]
}

const contextTypeToPaths:{[key:string]:ContextPathEntry} =
{
  Empty: 
  {
    Abilities: [],
    Modifiers: [],
    TaskListTemplates: [],
  },
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
      'Config/ConfigAbility/BattleEventAbility_2.json',
      'Config/ConfigAbility/BattleEventAbility_SilverWolfEvent.json',
      'Config/ConfigAbility/StageBattleEventAbility.json',
      'Config/ConfigAbility/BattleEvent',
      //'Config/ConfigAbility/BattleEvent/Camera',
      'Config/ConfigAbility/Avatar',
      'Config/ConfigAbility/Monster',
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
    ],
    TaskListTemplates:
    [
      'Config/ConfigGlobalTaskListTemplate/GlobalTaskListTemplate.json',
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
  DiffCommon:
  {
    Abilities: 
    [
      'Config/ConfigAbility/Common_Additional_Ability.json',
    ],
    Modifiers: 
    [
      'Config/ConfigGlobalModifier/GlobalModifier.json',
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
  DiffAvatar:
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
  DiffMonster:
  {
    Abilities: 
    [
      'Config/ConfigAbility/Monster',
      'Config/ConfigAbility/WhiteBox/Monster',
    ],
    Modifiers: 
    [
      'Config/ConfigGlobalModifier/GlobalModifier_Monster.json',
      'Config/ConfigGlobalModifier/GlobalModifier_WhiteBox_Monster.json',
    ],
    TaskListTemplates: [],
  },
  DiffEquipment:
  {
    Abilities: 
    [
      'Config/ConfigAbility/EquipmemtAbility.json',
    ],
    Modifiers: [],
    TaskListTemplates: [],
  },
  DiffRelicSet:
  {
    Abilities:
    [
      'Config/ConfigAbility/RelicAbility.json',
    ],
    Modifiers: [],
    TaskListTemplates: [],
  },
  DiffBattleEvent:
  {
    Abilities: 
    [
      'Config/ConfigAbility/BattleEventAbility.json',
      'Config/ConfigAbility/BattleEventAbility_2.json',
      'Config/ConfigAbility/BattleEventAbility_BoxingGym.json',
      'Config/ConfigAbility/BattleEventAbility_NewBoxingClub.json',
      'Config/ConfigAbility/BattleEventAbility_SilverWolfEvent.json',
      'Config/ConfigAbility/StageBattleEventAbility.json',
      'Config/ConfigAbility/WhiteBox/W_BattleEventAbility_SummonAndScoringTest.json',
      'Config/ConfigAbility/WhiteBox/W_BattleEventAbility_SummonAndScoringTest_2.json',
      'Config/ConfigAbility/WhiteBox/W_BattleEventAbility_SummonAndScoringTest_3.json',
      'Config/ConfigAbility/WhiteBox/W_BattleEventAbility_v1.6_Ability.json',
      'Config/ConfigAbility/WhiteBox/BattleEvent',
    ],
    Modifiers: [],
    TaskListTemplates: [],
  },
  DiffLevel:
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
  All: 
  {
    Abilities:[],
    Modifiers:[],
    TaskListTemplates:[],
  },
}

const [settings, _sessionSettings] = useSettings()
if (!settings.includeWhiteBox)
{
  for (const contextPathKey in contextTypeToPaths)
  {
    const contextPaths = contextTypeToPaths[contextPathKey]
    contextPaths.Abilities = contextPaths.Abilities.filter(p => !p.includes('WhiteBox'))
    contextPaths.Modifiers = contextPaths.Modifiers.filter(p => !p.includes('WhiteBox'))
    contextPaths.TaskListTemplates = contextPaths.TaskListTemplates.filter(p => !p.includes('WhiteBox'))
  }
}

// Include all Diff* in All
{
  const allContextPath = contextTypeToPaths[TaskContextType.All]
  for (const contextPathKey in contextTypeToPaths)
  {
    if (!contextPathKey.includes('Diff'))
      continue

    const contextPaths = contextTypeToPaths[contextPathKey]
    allContextPath.Abilities = allContextPath.Abilities.concat(contextPaths.Abilities)
    allContextPath.Modifiers = allContextPath.Modifiers.concat(contextPaths.Modifiers)
    allContextPath.TaskListTemplates = allContextPath.TaskListTemplates.concat(contextPaths.TaskListTemplates)
  }
}

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
          const tree = await retrieveTree(path, commitId)
          for (const treePath of tree.map(t => t.path))
            if (pathIsDataJson(treePath))
              mergeAbilityConfig(context, await getAbilities(commitId, `${path}/${treePath}`) as AbilityConfig)
        }
        
      for (const path of paths.Modifiers)
        if (path.endsWith('.json'))
          mergeModifierConfig(context, await getModifiers(commitId, path) as ModifierConfig)
        else
        {
          const tree = await retrieveTree(path, commitId)
          for (const treePath of tree.map(t => t.path))
            if (pathIsDataJson(treePath))
              mergeModifierConfig(context, await getModifiers(commitId, `${path}/${treePath}`) as ModifierConfig)
        }

      for (const path of paths.TaskListTemplates)
        if (path.endsWith('.json'))
          mergeTaskListTemplateConfig(context, await getTaskListTemplates(commitId, path) as TaskListTemplateConfig)
        else
        {
          const tree = await retrieveTree(path, commitId)
          for (const treePath of tree.map(t => t.path))
            if (pathIsDataJson(treePath))
              mergeTaskListTemplateConfig(context, await getTaskListTemplates(commitId, `${path}/${treePath}`) as TaskListTemplateConfig)
        }
  
      result = container[type] = context
      console.log(`cached ${type} ability context for ${commitId} (${Object.keys(context.Abilities).length}/${Object.keys(context.Modifiers).length}/${Object.keys(context.TaskListTemplates).length})`)
    }
    return result
  })
}

function pathIsDataJson(path:string) : boolean
{
  return !path.endsWith('.layout.json') && path.endsWith('.json')
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
    {
      ability.SearchKeywords = []
      ability.SearchKeywords.push(ability.Name.toLowerCase())

      if (ability.Modifiers)
        for (const [name, modifier] of Object.entries(ability.Modifiers))
        {
          modifier.Name = name
          ability.SearchKeywords.push(name.toLowerCase())
        }
    }
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