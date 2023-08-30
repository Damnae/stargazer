import { cleanupNumber } from '../common'
import useHashStore from '../hashstore'

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

export interface GamecoreNode
{
  $type: string
}

export interface GamecoreTargetType extends GamecoreNode
{
  Alias?: string
  Targets?: GamecoreTargetType[]
}

// Context

export interface GamecoreContext
{
  Params: 
  {
    [key:string]:GamecoreParam[]
  }
  DynamicValues?: DynamicValues
}

export interface GamecoreContextDynamicValues
{
  [hash: number]: 
  {
    Name?: string
    Value: number
    From: string
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

  return 'unknown'
}

export function evaluateDynamicExpression(expression?:DynamicExpression, context?:GamecoreContext) : string
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
    let formula = '';

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
          let variable = hashStore.translate(hash) ?? `Var(${hash})`
          if (context?.DynamicValues)
          {
            const dynamicValue = context.DynamicValues.Values[hash]
            variable = explainDynamicValue(dynamicValue, context.Params) ?? variable
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
          stack.push(`Call(${bytes.charCodeAt(++i)}, ${right}`);
          break;
        case 9: // Return
          var result = stack.pop();
          formula = result ?? 'empty';
          break;
      }
    }

    return formula;
  }

  return 'unknown'
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
    
    //paramValue ?? 
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
