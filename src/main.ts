
import './style.css'

// Routes

import { createRouter, createWebHashHistory } from 'vue-router'
import { toRouteProps } from './scripts/common'

import Title from './views/Title.vue'
import Commit from './views/Commit.vue'
import AvatarNav from './views/AvatarNav.vue'
import MonsterNav from './views/MonsterNav.vue'

const routes = 
[
    { path: '/', name: 'home', component: Title },
    { path: '/c/:commitId', name: 'commit', component: Commit, props:true, children: [
        { path: '/c/:commitId/a/:avatarId(\\d+)', name: 'avatar', components: { subnav: AvatarNav }, 
            props:toRouteProps({avatarId: 'number'}), },
        { path: '/c/:commitId/m/:monsterId(\\d+)', name: 'monster', components: { subnav: MonsterNav }, 
            props:toRouteProps({monsterId: 'number'}), },
    ]},
]

// App

import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
    .use(createRouter({ history: createWebHashHistory(), routes, }))
    .mount('#app')
