<script setup lang="ts">
  import { ref, } from 'vue';
  import { retrieveCommits, DataSourceCommit } from '@/common/datasource'
  import useSettings from '@/common/settings';

  const [settings, _sessionSettings] = useSettings()

  const commitEntries = ref<DataSourceCommit[]>(await retrieveCommits());
  if (settings.useCustomRepo && commitEntries.value.length == 0)
  {
    settings.useCustomRepo = false
    location.reload()
  }

  function toggleCustomRepo()
  {
    settings.useCustomRepo = settings.customRepo.length > 0 && !settings.useCustomRepo
    location.reload()
  }
  function applyToken()
  {
    location.reload()
  }
</script>

<template>
  <section class="maintitle">
    <h1>Stargazer</h1>
    <template v-if="commitEntries">
      <p>Pick a version:</p>
      <ul>
        <li v-for="(commitEntry, index) in commitEntries">
          <RouterLink :to="{ name:'commit', params:{ commitId: commitEntry.sha }}">
            <div class="identity">
              <span class="minor">{{ commitEntry.commit.committer.date.toLocaleString() }}</span>
              <span class="minor">({{ commitEntry.sha }})</span>
            </div>
            <div class="message">
              <span v-if="index == 0" class="major">Latest</span>
              {{ commitEntry.commit.message }}
            </div>
          </RouterLink>
        </li>
      </ul>
      <div class="repos">
        <input type="text" v-model.trim="settings.customRepo" placeholder="Repository" @keyup.enter="toggleCustomRepo()" />
        <input type="password" v-model.trim="settings.token" placeholder="Token" @keyup.enter="applyToken()" />
      </div>
    </template>
  </section>
</template>

<style scoped>
  ul 
  {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;  
    max-width:40rem;
    padding: 0 1em 0 0;
    height: 40vh;
    overflow: scroll;
    scrollbar-width: thin;
    mask: linear-gradient(to bottom, 
      rgba(0,0,0, 1) 0,   rgba(0,0,0, 1) 40%, rgba(0,0,0, .05) 100%
    ) 100% 50% / 100% 100% repeat-x;
  }
  li:not(:first-child) {
    opacity: .5;
  }
  .identity
  {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
  }
  .identity *:nth-child(2)
  {
    display:none;
  }
  @media (min-width:35rem) 
  {
    .identity *:nth-child(2)
    {
      display:inline;
    }
  }
  .repos
  {
    display:flex;
    flex-direction:row;
    opacity:0;
    gap: 1rem;
    transition: opacity .2s ease-in;
  }
  .repos:hover
  {
    opacity:1;
    transition: opacity 1.0s ease-in;
  }

  .repos input
  {
    flex-grow: 1;
    border:none;
    outline:none;
    background:none;
    color:grey;
    cursor: default;
  }
  .repos input:first-child
  {
    text-align: right;
  }
</style>
