<script setup lang="ts">
  import { ref, watchEffect, } from 'vue'
  import { getStatus, Status, } from '@/scripts/sources/status';
  import NavTree from '@/components/NavTree.vue'
  import NavItem from '@/components/NavItem.vue'

  const props = defineProps<{commitId:string, objectId:number}>()

  const status = ref<Status>(await getStatus(props.commitId, props.objectId))

  watchEffect(async () => 
  {
    status.value = await getStatus(props.commitId, props.objectId)
  })
</script>

<template>
  <h1>{{ status.StatusName.Text }}</h1>
  <NavTree>
    <NavItem v-if="status.ModifierName">
      <NavTree>
        <template #header>Modifier</template>
        <NavItem>
          <RouterLink :to="{ name:'statusModifier', params:{ commitId: commitId, objectId: objectId, modifierId: status.ModifierName, }}">
            {{ status.ModifierName }}
          </RouterLink>
        </NavItem>
      </NavTree>
    </NavItem>
  </NavTree>
</template>

<style scoped>
  h1 
  {
    margin:0;
  }
</style>