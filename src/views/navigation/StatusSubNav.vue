<script setup lang="ts">
  import { ref, watchEffect, } from 'vue'
  import { getStatus, Status, } from '@/scripts/sources/status';

  const props = defineProps<{commitId:string, objectId:number}>()

  const status = ref<Status>(await getStatus(props.commitId, props.objectId))

  watchEffect(async () => 
  {
    status.value = await getStatus(props.commitId, props.objectId)
  })
</script>

<template>
  <h1>{{ status.StatusName.Text }}</h1>
  <ul class="navtree">
    <li v-if="status.ModifierName">
      <div>Modifier</div>
      <ul>
          <li>
            <RouterLink :to="{ name:'statusModifier', params:{ commitId: commitId, objectId: objectId, modifierId: status.ModifierName, }}">
              {{ status.ModifierName }}
            </RouterLink>
          </li>
      </ul>
    </li>
  </ul>
</template>

<style scoped>
  h1 
  {
    margin:0;
  }
</style>