<script setup lang="ts">
  import { AbilityContext, } from '@/scripts/sources/ability';
  import { GamecoreNode, 
  } from '@/scripts/sources/gamecore';
  import BlockLayout from '@/views/gamecore/BlockLayout.vue';

  const props = defineProps<{node:GamecoreNode, abilityContext:AbilityContext}>()
  const node = props.node as unknown as 
  {
    TriggerKey:
    {
      Hash:number
    }
  }

  let eidolonName = node.TriggerKey?.Hash.toString();
  switch (node.TriggerKey.Hash)
  {
      case 2089636447: eidolonName = 'E1'; break;
      case 523552506: eidolonName = 'E2'; break;
      case 1686351920: eidolonName = 'E4'; break;
      case -1445815962: eidolonName = 'E6'; break;
  }
</script>

<template>
  <BlockLayout :node="node">
    Has eidolon <em>{{ eidolonName }}</em>
  </BlockLayout>
</template>

<style scoped>
</style>