import { reactive, } from 'vue'
import { getHash } from './translate'

const hashToName = reactive<{[key:number]:string}>({})
let dirty = false

for (const name of 
[
  'MDF_PropertyValue', 'MDF_PropertyRatio',
  'MDF_DamageValue', 'MDF_DamagePercentage',
  'MDF_RealAttack',
  'MDF_AttackAddedRatio',
  'MDF_DefenceAddedRatio', 'MDF_DefenceDownRatio',
  'MDF_DamageAddedRatio', 'MDF_DamageDownRatio',
  'MDF_DamageRatio',
  'MDF_HPRatio', 'MDF_MaxHPUpRatio', 'MDF_HPIncrease', 'MDF_TargetMaxHP',
  'MDF_HealPercentage', 'MDF_HealEnhanceRatio',
  'MDF_DamageResistanceRatio',
  'MDF_SpeedValue', 'MDF_SpeedUpRatio', 'MDF_SpeedDownRatio', 
  'MDF_ActionDelayRatio', 'MDF_DelayCost',
  'MDF_CriticalChance', 'MDF_CriticalIncrease', 
  'MDF_CriticalBoost', 'MDF_CriticaDamage',
  'MDF_AddCriticalRatio', 'MDF_AddCriticalDamage',  
  'MDF_CritChanceUpRatio','MDF_CritDamageUpRatio',
  'MDF_CritChanceUp',
  'MDF_CritChance', 'MDF_CritDamage',
  'MDF_Penetrate',
  'MDF_AggroAddedRatio', 'MDF_AggroDown',
  'MDF_DotRatio',
  'MDF_MaxLayer', 'MDF_Max_Layer',
  'MDF_AddValue',
  'MDF_Chance',
  'MDF_SPValue', 'MDF_SPRatio', 'MDF_AddSPRatio',
  'MDF_ConvertRatio',
  'Modifier_Burn_DamagePercentage', 'Modifier_Electric_DamagePercentage', 'Modifier_Poison_DamagePercentage', 'Modifier_Frozen_DamagePercentage',
  'Modifier_Bleed_DamagePercentage', 'Modifier_Tear_DamageRatio', 'Modifier_Tear_MaxPercentage',
  'Modifier_Poison_PoisonLayer',
  'MDF_BuffLayer', 'MDF_CostLayer', 'MDF_Charge_Count', 'Modifier_Show_Count',
  'MDF_1', 'MDF_2', 'MDF_3', 'MDF_4', 'MDF_5', 'MDF_6', 'MDF_7', 'MDF_8',
  'ADF_1', 'ADF_2', 'ADF_3', 'ADF_4', 'ADF_5', 'ADF_6', 'ADF_7', 'ADF_8',
  '#ADF_1', '#ADF_2', '#ADF_3', '#ADF_4', '#ADF_5', '#ADF_6', '#ADF_7', '#ADF_8',
])
{
  hashToName[getHash(name)] = name
}

export default function useHashStore() 
{
  function register(name:string, autoCommit:boolean) : void
  {
    const hash = getHash(name)
    if (hash in hashToName)
      return;

    //console.log(`registered ${hash} to ${name}`)

    hashToName[hash] = name
    dirty = true

    if (autoCommit)
      commit()
  }

  function translate(hash:number) : string | undefined
  {
    return hashToName[hash]
  }

  function commit()
  {
    if (dirty)
    {
      dirty = false

    }
  }

  return { register, translate, commit, }
}