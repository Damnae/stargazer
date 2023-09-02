<script setup lang="ts">
  import { inject, ref, watch, Ref, } from 'vue'
  import { GamecoreContext, evaluateTargetType } from '@/scripts/sources/gamecore';
  import { Modifier, AbilityContext, } from '@/scripts/sources/ability';
  import { Status, getStatuses } from '@/scripts/sources/status';
  import useHashStore from '@/scripts/hashstore';
  import EvaluateExpression from '../gamecore/EvaluateExpression.vue';
  import BlockLayout from '../gamecore/BlockLayout.vue';
  import AnyBlock from '../gamecore/AnyBlock.vue';
  import DynamicValues from './DynamicValues.vue';
  import RangeChange from './RangeChange.vue';
  import ShowContext from './ShowContext.vue';

  const props = defineProps<{modifierId:string}>()
  const abilityContext = inject('abilityContext') as Ref<AbilityContext>
  const gamecoreContext = inject('gamecoreContext') as Ref<GamecoreContext>

  watch(props, () =>
  {
    if (gamecoreContext.value)
      gamecoreContext.value.ModifierId = props.modifierId
  }, 
  { immediate: true, })

  const modifier = ref<Modifier>()
  watch([props, abilityContext, gamecoreContext], () =>
  {
    const mod = abilityContext.value.Modifiers?.[props.modifierId]
    if (mod)
    {  
      if (gamecoreContext.value)
        gamecoreContext.value.AbilityId = undefined
      modifier.value = mod
      return 
    }

    for (const ability of Object.values(abilityContext.value.Abilities))
    {
      const mod = ability.Modifiers?.[props.modifierId]
      if (mod)
      {
        if (gamecoreContext.value)
        {
          gamecoreContext.value.AbilityId = ability.Name
          if (ability.DynamicValues)
            gamecoreContext.value.AbilityDynamicValues[ability.Name] = ability.DynamicValues
        }
        modifier.value = mod
        return
      }
    }

    modifier.value = undefined
  }, 
  { immediate: true, })

  const commitId = inject<string>('commitId') as string
  const status = ref<Status>()
  watch([props], async () =>
  {
    const statuses = await getStatuses(commitId)
    status.value = Object.values(statuses).find(s => s.ModifierName == props.modifierId)

    if (status.value)
    {
      const hashStore = useHashStore()
      for (const name of status.value.ReadParamList)
        hashStore.register(name, false)
      hashStore.commit()
    }
  }, 
  { immediate:true, })

  function evaluateStatusDescription(status:Status) : string
  {
    let description = status.StatusDesc.Text
    for (const [index, param] of status.ReadParamList.entries())
      description = description.replace(`#${index + 1}[i]`, param)
    return description
  }

  const hashStore = useHashStore()
</script>

<template>
  <header>
    <h1><span class="pretitle">Modifier:</span> {{ modifierId }}</h1>
  </header>
  <section :key="modifierId">
    
    <template v-if="modifier">

      <template v-if="status">
        <h2>Status</h2>
        <BlockLayout :source="status">
          <span>
            {{ status.StatusName.Text }}
            <template v-if="status.StatusName.Text != status.StatusEffect.Text && status.StatusEffect.Text != status.StatusEffect.Hash.toString()">
              - {{ status.StatusEffect.Text }}
            </template>
            <em>
              (<template v-if="status.CanDispel">Dispellable</template>
              <template v-else>Non-Dispellable</template>
              {{ status.StatusType }})
            </em>
          </span>
          <template #content>
            <span class="minor">{{ evaluateStatusDescription(status) }}</span>
          </template>
        </BlockLayout>
      </template>

      <h2>Properties</h2>
      <table class="block">
        <tr>
          <th>Property</th>
          <th>Value</th>
        </tr>
        <tr v-if="modifier.BehaviorFlagList">
          <td>Flags</td>
          <td><em>{{ modifier.BehaviorFlagList.join(', ') }}</em></td>
        </tr>
        <tr v-if="modifier.EnterBattlePriority">
          <td>Enter Battle Priority</td>
          <td><em>{{ modifier.EnterBattlePriority }}</em></td>
        </tr>
        <tr>
          <td>Count</td>
          <td><em>{{ modifier.Count ?? 1 }}</em></td>
        </tr>
        <tr>
          <td>Add Layers On Stack</td>
          <td>
            <em v-if="modifier.LayerAddWhenStack"><EvaluateExpression :expression="modifier.LayerAddWhenStack" /></em>
            <em v-else>0</em>
          </td>
        </tr>
        <tr>
          <td>Max Layer</td>
          <td><em>{{ modifier.MaxLayer ?? 1 }}</em></td>
        </tr>
        <tr>
          <td>Stacking</td>
          <td><em>{{ modifier.Stacking ?? 'Unique' }}</em></td>
        </tr>
        <tr>
          <td>Life Time</td>
          <td><em>{{ modifier.LifeTime ?? -1 }}</em></td>
        </tr>
        <tr>
          <td>Life Step Moment</td>
          <td><em>{{ modifier.LifeStepMoment ?? 'ModifierPhase2End' }}</em></td>
        </tr>
        <tr>
          <td>Use Snapshot Entity</td>
          <td><em>{{ !!modifier.UseSnapshotEntity }}</em></td>
        </tr>
        <tr v-if="modifier.PerformTime">
          <td>Perform Time</td>
          <td><em><EvaluateExpression :expression="modifier.PerformTime" /></em></td>
        </tr>
      </table>

      <template v-if="modifier._CallbackList">
        <h2>Events</h2>
        <div class="sticky-container">
          <template v-for="(e, key) in modifier._CallbackList">
            <h3>{{ key }}</h3>
            <AnyBlock v-for="n in e.CallbackConfig" :node="n" />
          </template>
        </div>
      </template>

      <template v-if="modifier.OnAbilityPropertyChange || modifier.OnDynamicValueChange">
        <h2>Watchers</h2>
        <template v-if="modifier.OnAbilityPropertyChange" v-for="p in modifier.OnAbilityPropertyChange">
          <BlockLayout :source="p">
            <span class="flow">Watch property <em>{{ p.Property }}</em></span>
            <template #content>
              <RangeChange v-for="r in p.Ranges" :range="r" />
            </template>
          </BlockLayout>
        </template>
        <template v-if="modifier.OnDynamicValueChange" v-for="p in modifier.OnDynamicValueChange">
          <BlockLayout :source="p">
            <span class="flow">Watch dynamic value <em>{{ hashStore.translate(p.Key.Hash) ?? p.Key.Hash }}</em></span>
            <template #content>
              <RangeChange v-for="r in p.Ranges" :range="r" />
            </template>
          </BlockLayout>
        </template>
      </template>

      <template v-if="modifier.ModifierAffectedPreshowConfig">
        <h2>Preview</h2>
        <BlockLayout :source="modifier.ModifierAffectedPreshowConfig">
          <span class="flow">
            <template v-if="modifier.ModifierAffectedPreshowConfig.SkillTypes">
              On <em>{{ modifier.ModifierAffectedPreshowConfig.SkillTypes.join(', ') }}</em>, 
              for <em>{{ evaluateTargetType(modifier.ModifierAffectedPreshowConfig.TargetType) }}</em>
            </template>
            <template v-else>
              For <em>{{ evaluateTargetType(modifier.ModifierAffectedPreshowConfig.TargetType) }}</em>
            </template>
          </span>
          <template #content>
            <template v-if="modifier.ModifierAffectedPreshowConfig.Condition">
              
              <div class="subblock">
                <span class="flow">If</span>
                <AnyBlock :node="modifier.ModifierAffectedPreshowConfig.Condition" />
                <span class="flow">Do</span>
                <BlockLayout v-for="expression, key in modifier.ModifierAffectedPreshowConfig.ActionDelayPreshowConfig" :source="expression">
                  Preview <em>{{ key }}</em> with value <em><EvaluateExpression :expression="expression" /></em>
                </BlockLayout>
              </div>
            
            </template>
            <template v-else>
              
              <BlockLayout v-for="expression, key in modifier.ModifierAffectedPreshowConfig.ActionDelayPreshowConfig" :source="expression">
                Preview <em>{{ key }}</em> with value <em><EvaluateExpression :expression="expression" /></em>
              </BlockLayout>

            </template>
          </template>
        </BlockLayout>
      </template>

      <h2>Context</h2>
      <BlockLayout :source="modifier">
        <span class="flow">Modifier Data</span>
      </BlockLayout>
      <DynamicValues :dynamicValues="modifier.DynamicValues" />
      <ShowContext />

    </template>
    <span v-else class="minor">(Modifier {{ modifierId }} not found)</span>

  </section>
</template>

<style scoped>
</style>