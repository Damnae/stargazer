<script setup lang="ts">
  import { ref, watchEffect, } from 'vue'
  import { getAvatar, type Avatar, } from '@/sources/avatar';
  import { TaskContextType } from '@/sources/ability';
  import { getAvatarSkillsByIds, AvatarSkill, } from '@/sources/avatarskill';
  import { getCharacterByAvatar, Character } from '@/sources/character';
  import CharacterSkillAbilitiesNav from './CharacterSkillAbilitiesNav.vue';
  import CharacterOtherAbilitiesNav from './CharacterOtherAbilitiesNav.vue';
  import CharacterModifiers from './CharacterModifiers.vue';
  import NavTree from '@/components/NavTree.vue'
  import NavItem from '@/components/NavItem.vue'
  import LoadingNav from '@/components/LoadingNav.vue';

  const props = defineProps<{commitId:string, objectId:number}>()

  const avatar = ref<Avatar>()
  const avatarSkills = ref<AvatarSkill[]>([])
  const character = ref<Character>()

  const loading = ref(true)
  watchEffect(async () => 
  {
    loading.value = true
    avatar.value = await getAvatar(props.commitId, props.objectId)
    avatarSkills.value = await getAvatarSkillsByIds(props.commitId, avatar.value.SkillList)
    character.value = await getCharacterByAvatar(props.commitId, avatar.value)
    loading.value = false
  })
</script>

<template>
  <div v-if="loading">
    <LoadingNav />
  </div>
  <div v-else-if="avatar" :key="objectId">
    <h1>{{ avatar.AvatarName.Text }}</h1>
    <span v-if="!character" class="minor">(Missing character data)</span>
    <NavTree>
      
      <NavItem>
        <NavTree :startsOpen="true">
          <template #header>Skills</template>
          <NavItem v-for="skill in avatarSkills" :key="skill.SkillID">
            <CharacterSkillAbilitiesNav v-if="character" :character="character" :skillTriggerKey="skill.SkillTriggerKey">
              <template #header>
                {{ skill.SkillTypeDesc.Text }} - {{ skill.SkillTag.Text }} 
                <span class="minor" :title="skill.SkillName.Text">{{ skill.SkillName.Text }}</span>
                <span class="minor">{{ skill.SkillTriggerKey }}</span> 
              </template>
              <template #default="slotProps">
                <RouterLink :to="{ name:'avatarAbility', params:{ commitId: commitId, objectId: objectId, abilityId: slotProps.ability }}">
                  {{ slotProps.ability }}
                </RouterLink>
              </template>
            </CharacterSkillAbilitiesNav>
          </NavItem>
        </NavTree>
      </NavItem>

      <NavItem v-if="avatar.Traces.length > 0">
        <NavTree :startsOpen="true">
          <template #header>Traces</template>
          <NavItem v-for="(trace, index) in avatar.Traces.filter(t => t.PointType === 3)" :key="trace.PointID">
            <NavTree :startsOpen="true">
              <template #header>
                A{{ (index + 1) * 2 }} 
                <span class="minor">{{ trace.PointName }}</span>
                <span class="minor">{{ trace.PointID }}</span>
              </template>
              <NavItem v-if="trace.AbilityName">
                <RouterLink :to="{ name:'avatarAbility', params:{ commitId: commitId, objectId: objectId, abilityId: trace.AbilityName, }}">
                  {{ trace.AbilityName }}
                </RouterLink>
              </NavItem>
            </NavTree>
          </NavItem>
        </NavTree>
      </NavItem>

      <NavItem v-if="avatar.Eidolons.length > 0">
        <NavTree :startsOpen="true">
          <template #header>Eidolons</template>
          <NavItem v-for="eidolon in avatar.Eidolons" :key="eidolon.RankID">
            <NavTree :startsOpen="true">
              <template #header>
                E{{ eidolon.Rank }} 
                <span class="minor">{{ eidolon.Name }}</span>
                <span class="minor">{{ eidolon.RankID }}</span>
              </template>
              <NavItem v-for="ability in eidolon.RankAbility" :key="ability">
                <RouterLink :to="{ name:'avatarAbility', params:{ commitId: commitId, objectId: objectId, abilityId: ability, }}">
                  {{ ability }}
                </RouterLink>
              </NavItem>
            </NavTree>
          </NavItem>
        </NavTree>
      </NavItem>

      <NavItem v-if="character">
        <CharacterOtherAbilitiesNav :character="character">
          <template #header>Other Abilities</template>
          <template #default="slotProps">
            <RouterLink :to="{ name:'avatarAbility', params:{ commitId: commitId, objectId: objectId, abilityId: slotProps.ability, }}">
              {{ slotProps.ability }}
            </RouterLink>
          </template>
        </CharacterOtherAbilitiesNav>
      </NavItem>

      <NavItem v-if="character">
        <NavTree>
          <template #header>Modifiers</template>
          <CharacterModifiers :character="character" :taskContextType="TaskContextType.Avatar" v-slot="slotProps">
            <RouterLink :to="{ name:'avatarModifier', params:{ commitId: commitId, objectId: objectId, modifierId: slotProps.modifier, }}">
              {{ slotProps.modifier }}
            </RouterLink>
          </CharacterModifiers>
        </NavTree>
      </NavItem>

    </NavTree>
  </div>
</template>

<style scoped>
  h1 
  {
    margin:0;
  }
</style>