import '@/styles/main.css'
import '@/styles/navigation.css'
import '@/styles/blocks.css'
import '@/styles/transitions.css'

// Routes

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { toRouteProps } from './common/common'

import Title from './views/Title.vue'
import Commit from './views/Commit.vue'

import AvatarSubNav from './views/navigation/AvatarSubNav.vue'
import MonsterSubNav from './views/navigation/MonsterSubNav.vue'
import AvatarAbility from './views/abilities/AvatarAbility.vue'

import AvatarModifier from './views/abilities/AvatarModifier.vue'
import MonsterAbility from './views/abilities/MonsterAbility.vue'
import MonsterModifier from './views/abilities/MonsterModifier.vue'

import EquipmentSubNav from './views/navigation/EquipmentSubNav.vue'
import EquipmentAbility from './views/abilities/EquipmentAbility.vue'
import EquipmentModifier from './views/abilities/EquipmentModifier.vue'

import RelicSetSubNav from './views/navigation/RelicSetSubNav.vue'
import RelicSetAbility from './views/abilities/RelicSetAbility.vue'
import RelicSetModifier from './views/abilities/RelicSetModifier.vue'

import StatusSubNav from './views/navigation/StatusSubNav.vue'
import StatusAbility from './views/abilities/StatusAbility.vue'
import StatusModifier from './views/abilities/StatusModifier.vue'

import AnyAbility from './views/abilities/AnyAbility.vue'
import AnyModifier from './views/abilities/AnyModifier.vue'

const routes:Readonly<RouteRecordRaw[]> = 
[
    { path: '/', name: 'home', component: Title },
    { path: '/@:commitId', name: 'commit', component: Commit, props:true, children: [
        
        // Avatars
        { path: '/avatar-:objectId/@:commitId', children: [
            { path: '', 
                name: 'avatar', components: { subnav: AvatarSubNav, }, 
                props:{ subnav:toRouteProps({ commitId:'string', objectId:'number' }) },
                meta: { mainNav: 'Avatar', }
            },
            { path: '/ability-:abilityId/from/avatar-:objectId/@:commitId', 
                name: 'avatarAbility', components: { subnav: AvatarSubNav, default: AvatarAbility, }, 
                props:{ subnav:toRouteProps({ objectId:'number', abilityId:false }), default:toRouteProps({ objectId: 'number' }) },
                meta: { mainNav: 'Avatar', }
            },
            { path: '/modifier-:modifierId/from/avatar-:objectId/@:commitId', 
                name: 'avatarModifier', components: { subnav: AvatarSubNav, default: AvatarModifier, }, 
                props:{ subnav:toRouteProps({ objectId:'number', modifierId:false }), default:toRouteProps({ objectId: 'number' }) },
                meta: { mainNav: 'Avatar', }
            },
        ]},

        // Monsters
        { path: '/monster-:objectId/@:commitId', children: [
            { path: '', 
                name: 'monster', components: { subnav: MonsterSubNav, }, 
                props:{ subnav:toRouteProps({ objectId:'number' })},
                meta: { mainNav: 'Monster', }
            },
            { path: '/ability-:abilityId/from/monster-:objectId/@:commitId', 
                name: 'monsterAbility', components: { subnav: MonsterSubNav, default: MonsterAbility, },
                props:{ subnav:toRouteProps({ objectId:'number', abilityId:false }), default:toRouteProps({ objectId: 'number' }) },
                meta: { mainNav: 'Monster', }
            },
            { path: '/modifier-:modifierId/from/monster-:objectId/@:commitId', 
                name: 'monsterModifier', components: { subnav: MonsterSubNav, default: MonsterModifier, }, 
                props:{ subnav:toRouteProps({ objectId:'number', modifierId:false }), default:toRouteProps({ objectId: 'number' }) },
                meta: { mainNav: 'Monster', }
            },
        ]},

        // Light Cones
        { path: '/lightcone-:objectId/@:commitId', children: [
            { path: '', 
                name: 'equipment', components: { subnav: EquipmentSubNav, }, 
                props:{ subnav:toRouteProps({ objectId:'number' })},
                meta: { mainNav: 'Equipment', }
            },
            { path: '/ability-:abilityId/from/lightcone-:objectId/@:commitId', 
                name: 'equipmentAbility', components: { subnav: EquipmentSubNav, default: EquipmentAbility, },
                props:{ subnav:toRouteProps({ objectId:'number', abilityId:false }), default:toRouteProps({ objectId: 'number' }) },
                meta: { mainNav: 'Equipment', }
            },
            { path: '/modifier-:modifierId/from/lightcone-:objectId/@:commitId', 
                name: 'equipmentModifier', components: { subnav: EquipmentSubNav, default: EquipmentModifier, }, 
                props:{ subnav:toRouteProps({ objectId:'number', modifierId:false }), default:toRouteProps({ objectId: 'number' }) },
                meta: { mainNav: 'Equipment', }
            },
        ]},

        // Relic Sets
        { path: '/relicset-:objectId/@:commitId', children: [
            { path: '', 
                name: 'relicset', components: { subnav: RelicSetSubNav, }, 
                props:{ subnav:toRouteProps({ objectId:'number' })},
                meta: { mainNav: 'RelicSet', }
            },
            { path: '/ability-:abilityId/from/relicset-:objectId/@:commitId', 
                name: 'relicsetAbility', components: { subnav: RelicSetSubNav, default: RelicSetAbility, },
                props:{ subnav:toRouteProps({ objectId:'number', abilityId:false }), default:toRouteProps({ objectId: 'number' }) },
                meta: { mainNav: 'RelicSet', }
            },
            { path: '/modifier-:modifierId/from/relicset-:objectId/@:commitId', 
                name: 'relicsetModifier', components: { subnav: RelicSetSubNav, default: RelicSetModifier, }, 
                props:{ subnav:toRouteProps({ objectId:'number', modifierId:false }), default:toRouteProps({ objectId: 'number' }) },
                meta: { mainNav: 'RelicSet', }
            },
        ]},
        
        // Status
        { path: '/status-:objectId/@:commitId', children: [
            { path: '', 
                name: 'status', components: { subnav: StatusSubNav, }, 
                props:{ subnav:toRouteProps({ objectId:'number' })},
                meta: { mainNav: 'Status', }
            },
            { path: '/ability-:abilityId/from/status-:objectId/@:commitId', 
                name: 'statusAbility', components: { subnav: StatusSubNav, default: StatusAbility, },
                props:{ subnav:toRouteProps({ objectId:'number', abilityId:false }), default:toRouteProps({ objectId: 'number' }) },
                meta: { mainNav: 'Status', }
            },
            { path: '/modifier-:modifierId/from/status-:objectId/@:commitId', 
                name: 'statusModifier', components: { subnav: StatusSubNav, default: StatusModifier, }, 
                props:{ subnav:toRouteProps({ objectId:'number', modifierId:false }), default:toRouteProps({ objectId: 'number' }) },
                meta: { mainNav: 'Status', }
            },
        ]},

        // Ability / Modifier (no context)
        { path: '/ability-:abilityId/@:commitId', 
            name: 'ability', components: { default: AnyAbility, }, 
            props:{ default:toRouteProps({ }) },
            meta: { mainNav: 'Ability', }
        },
        { path: '/modifier-:modifierId/@:commitId', 
            name: 'modifier', components: { default: AnyModifier, }, 
            props:{ default:toRouteProps({ }) },
            meta: { mainNav: 'Modifier', }
        },
        
    ]},
]

const router = createRouter({ 
    routes: routes, 
    history: createWebHashHistory(), 
})

// App

import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
    .use(router)
    .mount('#app')
