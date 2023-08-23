<script setup lang="ts">
  import { ref, watchEffect, } from 'vue'
  import { getAvatar, Avatar, } from '../../scripts/sources/avatar';
  import { getAvatarSkillsByIds, AvatarSkill, } from '../../scripts/sources/avatarskill';
  import { getCharacterByAvatar, Character } from '../../scripts/sources/character';
  import CharacterSkillAbilitiesNav from './CharacterSkillAbilitiesNav.vue';
  import CharacterOtherAbilitiesNav from './CharacterOtherAbilitiesNav.vue';

  const props = defineProps<{commitId:string, objectId:number}>()

  const avatar = ref<Avatar>(await getAvatar(props.commitId, props.objectId))
  const avatarSkills = ref<AvatarSkill[]>([])
  const character = ref<Character>()

  watchEffect(async () => 
  {
    avatar.value = await getAvatar(props.commitId, props.objectId)
    avatarSkills.value = await getAvatarSkillsByIds(props.commitId, avatar.value.SkillList)
    character.value = await getCharacterByAvatar(props.commitId, avatar.value)
  })
</script>

<template>
  <h1>{{ avatar.AvatarName.Text }}</h1>
  <span v-if="!character" class="minor">(Missing character data)</span>
  <ul class="navtree">
    <li>
      <div>Skills</div>
      <ul>
        <template v-for="skill in avatarSkills" :key="skill.SkillID">
          <li>
            <div :title="skill.SkillTriggerKey">{{ skill.SkillTag.Text }} {{ skill.SkillTypeDesc.Text }} <span class="minor" :title="skill.SkillName.Text">{{ skill.SkillName.Text }}</span></div>
            <CharacterSkillAbilitiesNav v-if="character" :character="character" :skillTriggerKey="skill.SkillTriggerKey" v-slot="slotProps">
              <RouterLink :to="{ name:'avatarSkillAbility', params:{ commitId: commitId, skillId: skill.SkillID, objectId: objectId, abilityId: slotProps.ability }}">
                {{ slotProps.ability }}
              </RouterLink>
            </CharacterSkillAbilitiesNav>
          </li>
        </template>
      </ul>
    </li>
    <li v-if="character">
      <div>Other Abilities</div>
      <CharacterOtherAbilitiesNav :character="character" v-slot="slotProps">
        <RouterLink :to="{ name:'avatarAbility', params:{ commitId: commitId, objectId: objectId, abilityId: slotProps.ability, }}">
          {{ slotProps.ability }}
        </RouterLink>
      </CharacterOtherAbilitiesNav>
    </li>
  </ul>
</template>

<style scoped>
  h1 
  {
    margin:0;
  }
</style>