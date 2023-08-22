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
    { path: '/c/:commitId', name: 'commit', component: Commit, props:true, children: 
    [
        // Avatars
        { path: '/c/:commitId/avatar/:objectId', 
            name: 'avatar', components: { subnav: AvatarSubNav, }, 
            props:{ subnav:toRouteProps({commitId:'string', objectId:'number'}) }, 
        },
        { path: '/c/:commitId/avatar/:objectId/ability/:abilityId', 
            name: 'avatarAbility', components: { subnav: AvatarSubNav, default: AvatarAbility, }, 
            props:{ subnav:toRouteProps({objectId:'number', abilityId:false}), default:toRouteProps({objectId: 'number'}) },
        },
        { path: '/c/:commitId/avatar/:objectId/skill/:skillId/ability/:abilityId', 
            name: 'avatarSkillAbility', components: { subnav: AvatarSubNav, default: AvatarAbility, },  
            props:{ subnav:toRouteProps({objectId:'number', skillId:false, abilityId :false}), default:toRouteProps({objectId: 'number', skillId: 'number',}) },
        },
        // Monsters
        { path: '/c/:commitId/monster/:objectId', 
            name: 'monster', components: { subnav: MonsterSubNav, }, 
            props:{ subnav:toRouteProps({objectId:'number',})},
        },
        { path: '/c/:commitId/monster/:objectId/ability/:abilityId', 
            name: 'monsterAbility', components: { subnav: MonsterSubNav, default: MonsterAbility, },
            props:{ subnav:toRouteProps({objectId:'number', abilityId:false}), default:toRouteProps({objectId: 'number'}) },
        },
        { path: '/c/:commitId/monster/:objectId/skill/:skillId/ability/:abilityId', 
            name: 'monsterSkillAbility', components: { subnav: MonsterSubNav, default: MonsterAbility, },
            props:{ subnav:toRouteProps({objectId:'number', skillId:false, abilityId:false}), default:toRouteProps({objectId: 'number', skillId: 'number',}) },
        },
    ]},
]

// App

import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
    .use(createRouter({ history: createWebHashHistory(), routes: routes, }))
    .mount('#app')
