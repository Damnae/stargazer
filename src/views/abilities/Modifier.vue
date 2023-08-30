<script setup lang="ts">
  import { Ref, computed, inject, } from 'vue'
  import { Modifier, AbilityContext, } from '@/scripts/sources/ability';
  import BlockLayout from '../gamecore/BlockLayout.vue';
  import AnyBlock from '../gamecore/AnyBlock.vue';
  import EvaluateExpression from '../gamecore/EvaluateExpression.vue';
import useHashStore from '@/scripts/hashstore';

  const props = defineProps<{modifierId:string}>()
  const abilityContext = inject('abilityContext') as Ref<AbilityContext>

  const modifier = computed<Modifier | undefined>(() => 
  {
    const modifier = abilityContext.value.Modifiers?.[props.modifierId]
    if (modifier)
      return modifier

    for (const ability of Object.values(abilityContext.value.Abilities))
    {
      const modifier = ability.Modifiers?.[props.modifierId]
      if (modifier)
        return modifier
    }
    return undefined
  })
  const hashStore = useHashStore()
</script>

<template>
  <header>
    <h1>{{ modifierId.replace(/_/g, " ") }}</h1>
  </header>
  <section :key="modifierId">
    
      <template v-if="modifier">

        <BlockLayout v-if="modifier.BehaviorFlagList" :source="modifier.BehaviorFlagList">
          <span class="flow">Flags</span>
          <template #content>
            {{ modifier.BehaviorFlagList.join(', ') }}
          </template>
        </BlockLayout>
        <BlockLayout v-if="modifier.EnterBattlePriority" :source="modifier.EnterBattlePriority">
          <span class="flow">Enter Battle Priority</span>
          <template #content>
            {{ modifier.EnterBattlePriority }}
          </template>
        </BlockLayout>
        <BlockLayout v-if="modifier.Count" :source="modifier.Count">
          <span class="flow">Count</span>
          <template #content>
            {{ modifier.Count }}
          </template>
        </BlockLayout>
        <BlockLayout v-if="modifier.LifeTime" :source="modifier.LifeTime">
          <span class="flow">LifeTime</span>
          <template #content>
            {{ modifier.LifeTime }}
          </template>
        </BlockLayout>
        <BlockLayout v-if="modifier.LifeStepMoment" :source="modifier.LifeStepMoment">
          <span class="flow">LifeStepMoment</span>
          <template #content>
            {{ modifier.LifeStepMoment }}
          </template>
        </BlockLayout>
        <BlockLayout v-if="modifier.Stacking" :source="modifier.Stacking">
          <span class="flow">Stacking</span>
          <template #content>
            {{ modifier.Stacking }}
          </template>
        </BlockLayout>
        <BlockLayout v-if="modifier.MaxLayer" :source="modifier.MaxLayer">
          <span class="flow">MaxLayer</span>
          <template #content>
            {{ modifier.MaxLayer }}
          </template>
        </BlockLayout>
        <BlockLayout v-if="modifier.LayerAddWhenStack" :source="modifier.LayerAddWhenStack">
          <span class="flow">LayerAddWhenStack</span>
          <template #content>
            <EvaluateExpression :expression="modifier.LayerAddWhenStack" />
          </template>
        </BlockLayout>
        <BlockLayout v-if="modifier.PerformTime" :source="modifier.PerformTime">
          <span class="flow">PerformTime</span>
          <template #content>
            <EvaluateExpression :expression="modifier.PerformTime" />
          </template>
        </BlockLayout>
        <BlockLayout v-if="modifier.DynamicValues" :source=" modifier.DynamicValues">
          <span class="flow">Dynamic Values</span>
          <template #content>
            <BlockLayout v-for="value, key in modifier.DynamicValues.Values" :source="value" :title="key">
              {{ hashStore.translate(key as number) ?? key }}
            </BlockLayout>
          </template>
        </BlockLayout>

        <BlockLayout v-if="modifier._CallbackList" :source="modifier._CallbackList">
          <span class="flow">Events</span>
          <template #content>
            <template v-for="(e, key) in modifier._CallbackList">
              <BlockLayout :source="e">
                <span class="flow">{{ key }}</span>
                <template #content>
                  <AnyBlock v-for="n in e.CallbackConfig" :node="n" />
                </template>
              </BlockLayout>
            </template>
          </template>
        </BlockLayout>

        <BlockLayout v-if="modifier.OnAbilityPropertyChange" :source="modifier.OnAbilityPropertyChange">
          <span class="flow">Properties</span>
          <template #content>
            <template v-for="p in modifier.OnAbilityPropertyChange">
              <BlockLayout :source="p">
                <span class="flow">Watch <em>{{ p.Property }}</em></span>
                <template #content>
                  <template v-for="r in p.Ranges">
                    <BlockLayout :source="r">
                      <span class="flow">
                        Range <EvaluateExpression :expression="r.Min" />
                        to <EvaluateExpression :expression="r.Max" />
                        <template v-if="r.MaxInclusive">
                          (Inclusive)
                        </template>
                      </span>
                      <template #content>
                        <BlockLayout v-if="r.OnEnterRange" :source="r.OnEnterRange">
                          <span class="flow">On Enter Range</span>
                          <template #content>
                            <AnyBlock v-for="n in r.OnEnterRange" :node="n" />
                          </template>
                        </BlockLayout>
                        <BlockLayout v-if="r.OnExitRange" :source="r.OnExitRange">
                          <span class="flow">On Exit Range</span>
                          <template #content>
                            <AnyBlock v-for="n in r.OnExitRange" :node="n" />
                          </template>
                        </BlockLayout>
                        <BlockLayout v-if="r.OnChange" :source="r.OnChange">
                          <span class="flow">On Change</span>
                          <template #content>
                            <AnyBlock v-for="n in r.OnChange" :node="n" />
                          </template>
                        </BlockLayout>
                      </template>
                    </BlockLayout>
                  </template>
                </template>
              </BlockLayout>
            </template>
          </template>
        </BlockLayout>

      </template>
      <span v-else class="minor">(Modifier {{ modifierId }} not found)</span>
    
  </section>
</template>

<style scoped>
</style>