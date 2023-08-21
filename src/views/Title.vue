<script setup lang="ts">
  import { ref } from 'vue';
  import { retrieveCommits, DataSourceCommit } from '../scripts/datasource'

  const commitEntries = ref<DataSourceCommit[]>(await retrieveCommits());
</script>

<template>
  <section>
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
      </template>
  </section>
</template>

<style scoped>
  section
  {
    margin: auto;
  }
  h1
  {
    text-align: center;
    font-size: 3.2em;
    line-height: 1.1;
  }
  h1 + p
  {
    text-align: center;
  }
  ul 
  {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;  
    max-width:40em;
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
</style>