import { cleanupMarkup, cleanupNumber, cleanupTaskName, } from '@/common/common'
import useHashStore from '@/common/hashstore'

export interface DynamicValue
{
  ReadInfo?:
  {
      Type: string
      Str: string
  }
}

export interface DynamicValues
{
  Values: 
  {
    [key:number | string]: DynamicValue
  }
}

export interface DynamicExpression
{
  IsDynamic: boolean
  PostfixExpr?:
  {
    OpCodes: string
    FixedValues: 
    [
      {
        Value:number
      }
    ]
    DynamicHashes: number[]
  }
  FixedValue?:
  {
    Value:number
  }
}

export interface GamecoreTask
{
  $type: string
}

export interface GamecoreTargetType extends GamecoreTask
{
  Alias?: string
  Targets?: GamecoreTargetType[]
  Sequence?: GamecoreTargetType[]
  TargetType?:string
  DynamicKey?:string
  Index?:number
}

// Context

export interface ExpressionContext
{
  Params: 
  {
    [key:string]:GamecoreParam[]
  }
  AbilityHashValues:HashValues
  DynamicValues?:DynamicValues
  AbilityDynamicValues: 
  {
    [abilityId:string]:DynamicValues
  }
  AbilityId?:string
  ModifierId?:string
}

export interface HashValues
{
  [abilityId:string]:
  {
    [hash:number]:number
  }
}

export interface GamecoreParam
{
    Value: number 
}

export function evaluateTargetType(targetType?:GamecoreTargetType) : string
{
  if (targetType?.Alias)
    return targetType.Alias
  
  if (targetType?.Targets)
    return targetType.Targets.map(t => evaluateTargetType(t)).join(', ')

  if (targetType?.Sequence)
    return targetType.Sequence.map(t => evaluateTargetType(t)).join(' > ')

  if (targetType?.TargetType)
    return targetType.TargetType

  if (targetType?.DynamicKey)
    return targetType.DynamicKey

  if (targetType?.Index)
    return `Param Target #${targetType.Index}`

  if (targetType?.$type)
    return cleanupTaskName(targetType.$type)

  return 'unknown'
}

export function evaluateDescription(description:string, params:GamecoreParam[]) : string
{
  if (!description)
    return ''

  for (const [index, param] of params.entries())
  {
    const value = cleanupNumber(param.Value)
    const valuePercent = cleanupNumber(param.Value * 100) + '%'
    description = description
      .replace(new RegExp(`#${index + 1}\[[a-z0-9]+\]%`, 'gi'), valuePercent)
      .replace(new RegExp(`#${index + 1}\[[a-z0-9]+\]`, 'gi'), value)
  }
  return cleanupMarkup(description)
}
export function evaluateDescriptionString(description:string, params:string[]) : string
{
  if (!description)
    return ''

  for (const [index, param] of params.entries())
    description = description
      .replace(new RegExp(`#${index + 1}\[[a-z0-9]+\]`, 'gi'), param)
  return cleanupMarkup(description)
}

enum ExpressionOpCode
{
  Constant,
  Variable,
  Add,
  Subtract,
  Multiply,
  Divide,
  Modulo,
  Negative,
  Not,
  Call,
  Return,
}

const opCodeMaps:{[version:number]:{[opCodeValue:number]:ExpressionOpCode}} = 
{
  9:
  {
    0: ExpressionOpCode.Constant,
    1: ExpressionOpCode.Variable,
    2: ExpressionOpCode.Add,
    3: ExpressionOpCode.Subtract,
    4: ExpressionOpCode.Multiply,
    5: ExpressionOpCode.Divide,
    6: ExpressionOpCode.Negative,
    7: ExpressionOpCode.Not,
    8: ExpressionOpCode.Call,
    9: ExpressionOpCode.Return,
  },
  10:
  {
    0: ExpressionOpCode.Constant,
    1: ExpressionOpCode.Variable,
    2: ExpressionOpCode.Add,
    3: ExpressionOpCode.Subtract,
    4: ExpressionOpCode.Multiply,
    5: ExpressionOpCode.Divide,
    6: ExpressionOpCode.Modulo,
    7: ExpressionOpCode.Negative,
    8: ExpressionOpCode.Not,
    9: ExpressionOpCode.Call,
    10: ExpressionOpCode.Return,
  },
}

export function evaluateDynamicExpression(expression?:DynamicExpression|number, context?:ExpressionContext) : string
{
  if (!expression)
    return 'missing'
  
  if (typeof(expression) == 'number')
    return expression.toString()

  if (expression.FixedValue)
    return cleanupNumber(expression.FixedValue.Value)

  if (expression.PostfixExpr)
  {
    const postFixExpr = expression.PostfixExpr
    const opCodes = postFixExpr.OpCodes
    const constants = postFixExpr.FixedValues
    const variables = postFixExpr.DynamicHashes

    const stack:string[] = []
    const hashStore = useHashStore()

    var bytes = atob(opCodes)
    const version = bytes.charCodeAt(bytes.length - 1)
    const opCodeMap = opCodeMaps[version]

    if (opCodeMap == undefined)
    {
      console.log('unknown expression version: ' + version)
      return 'NYI'
    }

    let formula = ''
    for (var i = 0; i < bytes.length; i++)
    {
      const opCodeValue = bytes.charCodeAt(i)
      const opCode = opCodeMap[opCodeValue]

      switch (opCode)
      {
        case ExpressionOpCode.Constant:
          stack.push(cleanupNumber(constants?.[bytes.charCodeAt(++i)]?.Value))
          break
        case ExpressionOpCode.Variable:
          const hash = variables?.[bytes.charCodeAt(++i)]
          let variable = hashStore.translate(hash) ?? `Var[${hash}]`
          if (context)
          {
            const dynamicValue = findDynamicValue(hash, context)
            if (dynamicValue)
              variable = explainDynamicValue(dynamicValue, context.Params) ?? variable
            else if (context.AbilityId)
            {
              const value = context.AbilityHashValues[context.AbilityId]?.[hash]
              if (value)
                variable = cleanupNumber(value)
            }
          }
          stack.push(variable);
          break
        case ExpressionOpCode.Add:
          var right = stack.pop()
          var left = stack.pop()
          stack.push(`(${left}) + (${right})`)
          break
        case ExpressionOpCode.Subtract:
          var right = stack.pop()
          var left = stack.pop()
          stack.push(`(${left}) - (${right})`)
          break
        case ExpressionOpCode.Multiply:
          var right = stack.pop()
          var left = stack.pop()
          stack.push(`(${left}) * (${right})`)
          break
        case ExpressionOpCode.Divide:
          var right = stack.pop()
          var left = stack.pop()
          stack.push(`(${left}) / (${right})`)
          break
        case ExpressionOpCode.Modulo:
          var right = stack.pop()
          var left = stack.pop()
          stack.push(`(${left}) % (${right})`)
          break
        case ExpressionOpCode.Negative:
          var right = stack.pop()
          stack.push(`-(${right})`)
          break
        case ExpressionOpCode.Not:
          var right = stack.pop()
          stack.push(`!(${right})`)
          break
        case ExpressionOpCode.Call:
          const paramCount = bytes.charCodeAt(++i)
          const params:string[] = []
          for (var j = 0; j < paramCount; j++)
            params.push(stack.pop() ?? 'missing')
          const callName = stack.pop();
          stack.push(`${callName}(${params.reverse().join(', ')})`)
          break
        case ExpressionOpCode.Return:
          var result = stack.pop()
          formula = result ?? 'empty'
          if (stack.length > 0)
          {
            formula = '⚠ ' + formula + ' ⚠'
            console.log(formula
              + '\nexpression stack not empty: ' + stack.length + ' left: ' + stack.join(', ')
              + '\n' + bytes.split ('').map(c => ('0' + c.charCodeAt(0).toString(16)).slice(-2)).join(' ')
              + '\n' + opCodes)
          }
          break
        default:
          console.log('expression opcode not implemented: ' + opCode)
      }
    }
    return formula
  }

  return 'unknown'
}

function findDynamicValue(hash:number, context?:ExpressionContext) : DynamicValue | undefined
{
  if (!context)
    return undefined

  if (context.DynamicValues)
  {
    const dynamicValue = context.DynamicValues.Values[hash]
    if (dynamicValue)
      return dynamicValue
  }

  for (var dynamicValues of Object.values(context.AbilityDynamicValues))
  {
    const dynamicValue = dynamicValues.Values[hash]
    if (dynamicValue)
      return dynamicValue
  }
}

export function explainDynamicValueFromContext(value:DynamicValue, context:ExpressionContext) : string | undefined
{
  return explainDynamicValue(value, context.Params) ?? ''
}

function explainDynamicValue(value:DynamicValue, params:{[key:string]:GamecoreParam[]}) : string | undefined
{
  if (value?.ReadInfo)
  {
    const paramList = params[value.ReadInfo.Str]
    const paramIndex = getIndexFromDynamicValueType(value.ReadInfo.Type)

    if (!paramList)
      console.log(`params not found: ${value.ReadInfo.Str}[${paramIndex}]`)
    
    const paramValue = paramList?.[paramIndex]?.Value
    if (!paramValue)
      console.log(`param value not found: ${value.ReadInfo.Str}[${paramIndex}]`)

    var paramName = value.ReadInfo.Str
    if (!paramName)
      paramName = 'Param'

    return paramValue ? 
      `${paramName}(${cleanupNumber(paramValue)})` : 
      `${paramName}[${paramIndex}]`
  }
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
  FloorCustomData: 8,
  ClientOnly: 10,
}

function getIndexFromDynamicValueType(value:string | number) : number
{
  return (dynamicValueTypeToIndex[value] ?? value) / 2
}
