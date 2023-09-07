<script setup lang="ts">
  import { GamecoreTask, 
  } from '@/sources/gamecore';
  import useHashStore from '@/common/hashstore';
  import BlockLayout from '@/components/BlockLayout.vue';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    QueryList:
    {
      [dynamicValue:string]:
      {
        // TODO get the value
        MazeBuffID:number
        Index:number
      }
    }
  }

  const hashStore = useHashStore()
  for (const key of Object.keys(node.QueryList))
    useHashStore().register(key, false)
  hashStore.commit()
</script>

<template>
  <BlockLayout :source="node">

    Set dynamic values by blessing parameters
    <template #content>
      <template v-for="location, key in node.QueryList">
        <BlockLayout :source="location">
          Set <em>{{ key }}</em> to <em>{{ location.MazeBuffID }}[{{ location.Index }}]</em>
        </BlockLayout>
      </template>
    </template>

  </BlockLayout>
</template>

<style scoped>
</style>