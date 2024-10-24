<script setup lang="ts">
  import { inject, ref, computed, watch, Ref, } from 'vue'
  import { getHash } from '@/common/translate';
  import { ExpressionContext, GamecoreTask, evaluateDescriptionString, } from '@/sources/gamecore';
  import { Modifier, TaskContext, } from '@/sources/ability';
  import { Status, getStatuses } from '@/sources/status';
  import useHashStore from '@/common/hashstore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import EvaluateTargetType from '@/gamecore/EvaluateTargetType.vue';
  import EvaluateExpression from '@/gamecore/EvaluateExpression.vue';
  import AnyTask from '@/gamecore/AnyTask.vue';
  import DynamicValues from './components/DynamicValues.vue';
  import RangeChange from './components/RangeChange.vue';
  import ShowContext from './components/ShowContext.vue';
  import ModifierLink from '@/gamecore/ModifierLink.vue';

  const props = defineProps<{modifierId:string}>()
  const taskContext = inject('taskContext') as Ref<TaskContext>
  const expressionContext = inject('expressionContext') as Ref<ExpressionContext>

  watch(props, () =>
  {
    if (expressionContext.value)
      expressionContext.value.ModifierId = props.modifierId
  }, 
  { immediate: true, })

  const modifier = ref<Modifier>()
  const modifierEventNames = computed(() => getEventNames(modifier.value))
  watch([props, taskContext, expressionContext], () =>
  {
    const mod = taskContext.value.Modifiers?.[props.modifierId]
    if (mod)
    {  
      if (expressionContext.value)
        expressionContext.value.AbilityId = undefined
      processModifier(mod)
      modifier.value = mod
      return 
    }

    for (const ability of Object.values(taskContext.value.Abilities))
    {
      const mod = ability.Modifiers?.[props.modifierId]
      if (mod)
      {
        if (expressionContext.value)
        {
          expressionContext.value.AbilityId = ability.Name
          if (ability.DynamicValues)
            expressionContext.value.AbilityDynamicValues[ability.Name] = ability.DynamicValues
        }
        processModifier(mod)
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

  function processModifier(modifier:Modifier)
  {
    if (!modifier.AdditionConfig?.SubModifierList)
      return

    const hashStore = useHashStore()
    for (const entry of modifier.AdditionConfig?.SubModifierList)
      for (const name in entry.DynamicValues)
        hashStore.register(name, false)
    hashStore.commit()
  }

  function getEventNames(modifier?:Modifier) : string[]
  {
    if (!modifier)
      return []
    return Object.keys(modifier)
      .filter(k => k.startsWith('On') && k != 'OnAbilityPropertyChange' && k != 'OnDynamicValueChange')
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
            <span class="minor">{{ evaluateDescriptionString(status.StatusDesc.Text, status.ReadParamList) }}</span>
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
        <tr v-if="modifier.AdditionConfig?.FilterMask">
          <td>Addition Filter Mask</td>
          <td><em>{{ modifier.AdditionConfig.FilterMask }}</em></td>
        </tr>
        <tr v-if="modifier._PriorityList" v-for="priority in modifier._PriorityList">
          <td>{{ priority.PriorityName }}</td>
          <td><em>{{ priority.Key }}</em></td>
        </tr>
      </table>

      <template v-if="modifier.AdditionConfig?.DependencyOnAdd || modifier.AdditionConfig?.DependencyOnRemove">
        <h2>Dependencies</h2>

        <BlockLayout v-if="modifier.AdditionConfig?.DependencyOnAdd" :source="modifier.AdditionConfig?.DependencyOnAdd">
          On Add 
          <ModifierLink v-if="modifier.AdditionConfig.DependencyOnAdd.DependentModifier" :modifierName="modifier.AdditionConfig.DependencyOnAdd.DependentModifier" />
          <template v-if="modifier.AdditionConfig.DependencyOnAdd.CasterFilter">
            on <em><EvaluateTargetType :target="modifier.AdditionConfig.DependencyOnAdd.CasterFilter" /></em>
          </template>
        </BlockLayout>
        <BlockLayout v-if="modifier.AdditionConfig?.DependencyOnRemove" :source="modifier.AdditionConfig?.DependencyOnRemove">
          On Remove 
          <ModifierLink v-if="modifier.AdditionConfig.DependencyOnRemove.DependentModifier" :modifierName="modifier.AdditionConfig.DependencyOnRemove.DependentModifier" />
          <template v-if="modifier.AdditionConfig.DependencyOnRemove.CasterFilter">
            on <em><EvaluateTargetType :target="modifier.AdditionConfig.DependencyOnRemove.CasterFilter" /></em>
          </template>
        </BlockLayout>
      </template>

      <template v-if="modifier.AdditionConfig?.SubModifierList">
        <h2>Sub Modifiers</h2>

        <template v-if="modifier.AdditionConfig?.SubModifierList" v-for="subModifier in modifier.AdditionConfig.SubModifierList">
          <BlockLayout :source="subModifier">
            <span class="flow">
              Apply sub modifier
              <ModifierLink v-if="subModifier.Name" :modifierName="subModifier.Name" />
              to <em><EvaluateTargetType :target="subModifier.TargetType" /></em>
              <template v-if="subModifier.IsHaloStatus">
                &nbsp;<span class="minor">(Halo)</span>
              </template>
            </span>
            <template #content>
              <BlockLayout v-for="expression, key in subModifier.DynamicValues" :source="expression">
                With <em :title="getHash(key.toString()).toString()">{{ key }}</em> set to <em><EvaluateExpression :expression="expression" /></em>
              </BlockLayout>
            </template>
          </BlockLayout>
        </template>
      </template>

      <template v-for="name in modifierEventNames">
        <h2>{{ name }}</h2>
        <AnyTask v-for="n in ((modifier as any)[name] as GamecoreTask[])" :node="n" />
      </template>

      <template v-if="modifier._CallbackList">
        <h2>Events</h2>
        <div class="sticky-container">
          <template v-for="(e, key) in modifier._CallbackList">
            <h3>{{ e.Event ?? key }}</h3>
            <AnyTask v-for="n in e.CallbackConfig" :node="n" />
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

      <template v-if="modifier.ModifierAffectedPreshowConfig || modifier.ModifierStancePreshowConfig">
        <h2>Preview</h2>
        <BlockLayout v-if="modifier.ModifierAffectedPreshowConfig" :source="modifier.ModifierAffectedPreshowConfig">
          <span class="flow">
            <template v-if="modifier.ModifierAffectedPreshowConfig.SkillTypes">
              While preparing <em>{{ modifier.ModifierAffectedPreshowConfig.SkillTypes.join(', ') }}</em>, 
              on <em><EvaluateTargetType :target="modifier.ModifierAffectedPreshowConfig.TargetType" /></em>
            </template>
            <template v-else>
              On <em><EvaluateTargetType :target="modifier.ModifierAffectedPreshowConfig.TargetType" /></em>
            </template>
          </span>
          <template #content>
            <template v-if="modifier.ModifierAffectedPreshowConfig.Condition">
              
              <div class="subblock">
                <span class="flow">If</span>
                <AnyTask :node="modifier.ModifierAffectedPreshowConfig.Condition" />
                <span class="flow">Do</span>
                <BlockLayout v-for="expression, key in modifier.ModifierAffectedPreshowConfig.ActionDelayPreshowConfig" :source="expression">
                  Preview <em>{{ key }}</em> with value <em><EvaluateExpression :expression="expression" /></em>
                </BlockLayout>
                <BlockLayout v-for="expression, key in modifier.ModifierAffectedPreshowConfig.BreakActionDelayPreshowConfig" :source="expression">
                  Preview break <em>{{ key }}</em> with value <em><EvaluateExpression :expression="expression" /></em>
                </BlockLayout>
              </div>
            
            </template>
            <template v-else>
              
              <BlockLayout v-for="expression, key in modifier.ModifierAffectedPreshowConfig.ActionDelayPreshowConfig" :source="expression">
                Preview <em>{{ key }}</em> with value <em><EvaluateExpression :expression="expression" /></em>
              </BlockLayout>
              <BlockLayout v-for="expression, key in modifier.ModifierAffectedPreshowConfig.BreakActionDelayPreshowConfig" :source="expression">
                Preview break <em>{{ key }}</em> with value <em><EvaluateExpression :expression="expression" /></em>
              </BlockLayout>

            </template>
          </template>
        </BlockLayout>

        <BlockLayout v-if="modifier.ModifierStancePreshowConfig" :source="modifier.ModifierStancePreshowConfig">
          <span class="flow">
            <template v-if="modifier.ModifierStancePreshowConfig.SkillType">
              While preparing <em>{{ modifier.ModifierStancePreshowConfig.SkillType }}</em>
            </template>
          </span>
          <template #content>
            <template v-if="modifier.ModifierStancePreshowConfig.Condition">
              
              <div class="subblock">
                <span class="flow">If</span>
                <AnyTask :node="modifier.ModifierStancePreshowConfig.Condition" />
                <span class="flow">Do</span>

                <BlockLayout v-if="modifier.ModifierStancePreshowConfig.AddWeakness" :source="modifier.ModifierStancePreshowConfig.AddWeakness">
                  Preview added weakness to <em>{{ modifier.ModifierStancePreshowConfig.AddWeakness }}</em>
                </BlockLayout>
                <BlockLayout v-if="modifier.ModifierStancePreshowConfig.AddForceStanceDamageFlag" :source="modifier.ModifierStancePreshowConfig.AddForceStanceDamageFlag">
                  Preview forced toughness damage
                </BlockLayout>
                <BlockLayout v-if="modifier.ModifierStancePreshowConfig.MultiplyRatio" :source="modifier.ModifierStancePreshowConfig.MultiplyRatio">
                  Preview break multiplier with value <em><EvaluateExpression :expression="modifier.ModifierStancePreshowConfig.MultiplyRatio" /></em>
                </BlockLayout>
                <BlockLayout v-if="modifier.ModifierStancePreshowConfig.StanceBreakAddRatio" :source="modifier.ModifierStancePreshowConfig.StanceBreakAddRatio">
                  Preview break with value <em><EvaluateExpression :expression="modifier.ModifierStancePreshowConfig.StanceBreakAddRatio" /></em>
                </BlockLayout>
              </div>
            
            </template>
            <template v-else>
              
              <BlockLayout v-if="modifier.ModifierStancePreshowConfig.AddWeakness" :source="modifier.ModifierStancePreshowConfig.AddWeakness">
                Preview added weakness to <em>{{ modifier.ModifierStancePreshowConfig.AddWeakness }}</em>
              </BlockLayout>
              <BlockLayout v-if="modifier.ModifierStancePreshowConfig.AddForceStanceDamageFlag" :source="modifier.ModifierStancePreshowConfig.AddForceStanceDamageFlag">
                Preview forced toughness damage
              </BlockLayout>
              <BlockLayout v-if="modifier.ModifierStancePreshowConfig.MultiplyRatio" :source="modifier.ModifierStancePreshowConfig.MultiplyRatio">
                Preview break multiplier with value <em><EvaluateExpression :expression="modifier.ModifierStancePreshowConfig.MultiplyRatio" /></em>
              </BlockLayout>
              <BlockLayout v-if="modifier.ModifierStancePreshowConfig.StanceBreakAddRatio" :source="modifier.ModifierStancePreshowConfig.StanceBreakAddRatio">
                Preview break with value <em><EvaluateExpression :expression="modifier.ModifierStancePreshowConfig.StanceBreakAddRatio" /></em>
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