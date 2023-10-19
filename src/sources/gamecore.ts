import { cleanupMarkup, cleanupNumber, } from '@/common/common'
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

export function evaluateDynamicExpression(expression?:DynamicExpression, context?:ExpressionContext) : string
{
  if (!expression)
    return 'missing'
  
  if (expression.FixedValue)
    return cleanupNumber(expression.FixedValue.Value)

  if (expression.PostfixExpr)
  {
    const postFixExpr = expression.PostfixExpr;
    const opCodes = postFixExpr.OpCodes;
    const constants = postFixExpr.FixedValues;
    const variables = postFixExpr.DynamicHashes;

    const stack:string[] = [];
    let formula = undefined;

    const hashStore = useHashStore()

    var bytes = atob(opCodes);
    for (var i = 0; i < bytes.length; i++)
    {
      var opCode = bytes.charCodeAt(i);
      switch (opCode)
      {
        case 0: // Constant
          stack.push(cleanupNumber(constants?.[bytes.charCodeAt(++i)]?.Value));
          break;
        case 1: // Variable
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
          break;
        case 2: // Add
          var right = stack.pop();
          var left = stack.pop();
          stack.push(`(${left}) + (${right})`);
          break;
        case 3: // Subtract
          var right = stack.pop();
          var left = stack.pop();
          stack.push(`(${left}) - (${right})`);
          break;
        case 4: // Multiply
          var right = stack.pop();
          var left = stack.pop();
          stack.push(`(${left}) * (${right})`);
          break;
        case 5: // Divide
          var right = stack.pop();
          var left = stack.pop();
          stack.push(`(${left}) / (${right})`);
          break;
        case 6: // Negative
          var right = stack.pop();
          stack.push(`-(${right})`);
          break;
        case 7: // Not
          var right = stack.pop();
          stack.push(`!(${right})`);
          break;
        case 8: // Call
          var right = stack.pop();
          var left = stack.pop();
          stack.push(`${left}(${right}, ${bytes.charCodeAt(++i)})`);
          break;
        case 9: // Return
        case 10: // Return?
          var result = stack.pop();
          formula = result ?? 'empty';
          break;
        default:
          console.log('expression opcode not implemented: ' + opCode);
      }
    }

    formula = formula ?? stack.pop() ?? 'empty';
    return formula;
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
    if (!paramList)
      console.log(`params not found: ${value.ReadInfo.Str}[${getIndexFromDynamicValueType(value.ReadInfo.Type)}]`)
    const paramValue = cleanupNumber(paramList?.[getIndexFromDynamicValueType(value.ReadInfo.Type)]?.Value)
    if (!paramValue)
      console.log(`param not found: ${value.ReadInfo.Str}[${getIndexFromDynamicValueType(value.ReadInfo.Type)}]`)

    return `${value.ReadInfo.Str}(${paramValue})` ??
          `${value.ReadInfo.Str}[${getIndexFromDynamicValueType(value.ReadInfo.Type)}]`
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
}

function getIndexFromDynamicValueType(value:string | number) : number
{
  return (dynamicValueTypeToIndex[value] ?? value) / 2
}
