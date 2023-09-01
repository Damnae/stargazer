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
    let description = status.StatusDesc.Text.replace(/(<([^>]+)>)/gi, "")
    for (const [index, param] of status.ReadParamList.entries())
      description = description.replace(`#${index + 1}[i]`, param)
    return description
  }

  const hashStore = useHashStore()
</script>

<template>
  <header>
    <h1>{{ modifierId }}</h1>
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
          <th>Key</th>
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
        <tr v-if="modifier.Count">
          <td>Count</td>
          <td><em>{{ modifier.Count }}</em></td>
        </tr>
        <tr v-if="modifier.LayerAddWhenStack">
          <td>Layer Add When Stack</td>
          <td><em><EvaluateExpression :expression="modifier.LayerAddWhenStack" /></em></td>
        </tr>
        <tr v-if="modifier.MaxLayer">
          <td>Max Layer</td>
          <td><em>{{ modifier.MaxLayer }}</em></td>
        </tr>
        <tr v-if="modifier.Stacking">
          <td>Stacking</td>
          <td><em>{{ modifier.Stacking }}</em></td>
        </tr>
        <tr v-if="modifier.LifeTime">
          <td>Life Time</td>
          <td><em>{{ modifier.LifeTime }}</em></td>
        </tr>
        <tr v-if="modifier.LifeStepMoment">
          <td>Life Step Moment</td>
          <td><em>{{ modifier.LifeStepMoment }}</em></td>
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
        <template v-for="(e, key) in modifier._CallbackList">
          <BlockLayout :source="e">
            <span class="flow">{{ key }}</span>
            <template #content>
              <AnyBlock v-for="n in e.CallbackConfig" :node="n" />
            </template>
          </BlockLayout>
        </template>
      </template>

      <template v-if="modifier.OnAbilityPropertyChange || modifier.OnDynamicValueChange">
        <h2>Watchers</h2>
        <template v-if="modifier.OnAbilityPropertyChange" v-for="p in modifier.OnAbilityPropertyChange">
          <BlockLayout :source="p">
            <span class="flow">Watch <em>{{ p.Property }}</em> property</span>
            <template #content>
              <RangeChange v-for="r in p.Ranges" :range="r" />
            </template>
          </BlockLayout>
        </template>
        <template v-if="modifier.OnDynamicValueChange" v-for="p in modifier.OnDynamicValueChange">
          <BlockLayout :source="p">
            <span class="flow">Watch <em>{{ hashStore.translate(p.Key.Hash) ?? p.Key.Hash }}</em> dynamic value</span>
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
              On <em>{{ evaluateTargetType(modifier.ModifierAffectedPreshowConfig.TargetType) }}</em>'s
              <em >{{ modifier.ModifierAffectedPreshowConfig.SkillTypes.join(', ') }}</em>
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