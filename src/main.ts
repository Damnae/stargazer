import './style.css'

// Routes

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { toRouteProps } from './scripts/common'

import Title from './views/Title.vue'
import Commit from './views/Commit.vue'
import AvatarSubNav from './views/navigation/AvatarSubNav.vue'
import MonsterSubNav from './views/navigation/MonsterSubNav.vue'
import AvatarAbility from './views/abilities/AvatarAbility.vue'
import MonsterAbility from './views/abilities/MonsterAbility.vue'

const routes:Readonly<RouteRecordRaw[]> = 
[
    { path: '/', name: 'home', component: Title },
    { path: '/@:commitId', name: 'commit', component: Commit, props:true, children: 
    [
        // Avatars
        { path: '/avatar-:objectId/@:commitId', 
            name: 'avatar', components: { subnav: AvatarSubNav, }, 
            props:{ subnav:toRouteProps({ commitId:'string', objectId:'number' }) }, 
        },
        { path: '/ability-:abilityId/from/avatar-:objectId/@:commitId', 
            name: 'avatarAbility', components: { subnav: AvatarSubNav, default: AvatarAbility, }, 
            props:{ subnav:toRouteProps({ objectId:'number', abilityId:false }), default:toRouteProps({ objectId: 'number' }) },
        },
        // Monsters
        { path: '/monster-:objectId/@:commitId', 
            name: 'monster', components: { subnav: MonsterSubNav, }, 
            props:{ subnav:toRouteProps({ objectId:'number' })},
        },
        { path: '/ability-:abilityId/from/monster-:objectId/@:commitId', 
            name: 'monsterAbility', components: { subnav: MonsterSubNav, default: MonsterAbility, },
            props:{ subnav:toRouteProps({ objectId:'number', abilityId:false }), default:toRouteProps({ objectId: 'number' }) },
        },
    ]},
]

// App

import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
    .use(createRouter({ history: createWebHashHistory(), routes: routes, }))
    .mount('#app')
