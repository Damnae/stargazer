<script setup lang="ts">
  import { ref, } from 'vue';
  import { useRouter } from 'vue-router';
  import { toTimeAgo } from '@/common/common';
  import { retrieveCommits, DataSourceCommit } from '@/common/datasource'
  import useSettings from '@/common/settings';

  const [settings, _sessionSettings] = useSettings()
  const router = useRouter()

  const commitEntries = ref<DataSourceCommit[]>(await retrieveCommits());
  if (settings.useCustomRepo && commitEntries.value.length == 0)
  {
    settings.useCustomRepo = false
    router.go(0)
  }

  function toggleCustomRepo()
  {
    settings.useCustomRepo = settings.customRepo.length > 0 && !settings.useCustomRepo
    commitEntries.value = []
    router.go(0)
  }

  function handleDrag(event:DragEventInit, startCommitId:string, startRank:number)
  {
    if (!event.dataTransfer)
      return

    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('commitId', startCommitId)
    event.dataTransfer.setData('rank', startRank.toString())
  }

  function handleDrop(event:DragEventInit, endCommitId:string, endRank:number)
  {
    if (!event.dataTransfer)
      return

    let startCommitId = event.dataTransfer.getData('commitId')
    const startRank = Number.parseInt(event.dataTransfer.getData('rank'))
    if (!startCommitId || endCommitId == startCommitId)
      return

    if (startRank < endRank)
      [startCommitId, endCommitId] = [endCommitId, startCommitId]

    router.push({ name:'changes', params:{ fromCommitId: startCommitId, commitId: endCommitId }})
  }
</script>

<template>
  <section class="maintitle">
    <h1>Stargazer</h1>
    <template v-if="commitEntries">
      <p>Pick a version:</p>
      <ul>
        <li class="commit" v-for="(commitEntry, index) in commitEntries"
          @drop="handleDrop($event, commitEntry.sha, index)" @dragover.prevent @dragenter.prevent>
          <RouterLink class="commitChanges" title="Click to compare with previous;
Drag to a specific commit to compare with it instead"
            v-if="commitEntry.parents?.[0]"
            :to="{ name:'changes', params:{ fromCommitId: commitEntry.parents[0].sha, commitId: commitEntry.sha }}"
            draggable="true" @dragstart="handleDrag($event, commitEntry.sha, index)">⮃</RouterLink>
          <RouterLink class="commitInfo" :to="{ name:'commit', params:{ commitId: commitEntry.sha }}">
            <div class="identity">
              <span class="minor">
                {{ toTimeAgo(commitEntry.commit.committer.date) }}
                <span v-if="index == 0" class="major">Latest</span>
              </span>
            </div>
            <div class="message">
              {{ commitEntry.commit.message }}
            </div>
          </RouterLink>
        </li>
      </ul>
      <form class="repos" @submit="toggleCustomRepo()">
        <input type="text" v-model.trim="settings.customRepo" placeholder="Repository" />
        <input type="password" v-model.trim="settings.token" placeholder="Token" />
        <input type="submit" value="Switch" />
      </form>
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

  .commit
  {
    display:flex;
    flex-direction:row;
    gap: .5rem;
  }
  .commitInfo
  {
    flex-grow:1;
  }
  .commitChanges
  {
    text-align:center;
    cursor:grab;
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
    opacity:.25;
    gap: 1rem;
    transition: opacity .2s ease-in;
  }
  .repos:hover,
  .repos:focus
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
</style>
