
export interface AbilityContext
{
  DynamicValues:
  [
    {
      Source: string
      Values?: AbilityContextDynamicValues
    }
  ]
}

export interface AbilityContextDynamicValues
{
  [hash: number]: 
  {
    Name?: string
    Value: number
    From: string
  }
}

export interface AbilityParam
{
    Value: number 
}