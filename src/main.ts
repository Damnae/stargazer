
import './style.css'

// Routes

import { createRouter, createWebHashHistory } from 'vue-router'

import Title from './views/Title.vue'
import Commit from './views/Commit.vue'
import Empty from './views/Empty.vue'
import Avatar from './views/Avatar.vue'

const routes = 
[
    { path: '/', name: 'home', component: Title },
    { path: '/c/:commitId', name: 'commit', props:true, component: Commit, children: [
        { path: '/c/:commitId/', props:true, component: Empty, },
        { path: '/c/:commitId/a/:avatarId', name: 'avatar', props:true, component: Avatar, },
    ]},
]

// App

import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
    .use(createRouter({ history: createWebHashHistory(), routes, }))
    .mount('#app')
