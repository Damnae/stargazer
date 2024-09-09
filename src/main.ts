import '@/styles/main.css'
import '@/styles/navigation.css'
import '@/styles/blocks.css'
import '@/styles/diff.css'
import '@/styles/transitions.css'

// Routes

import { createRouter, createWebHashHistory, RouteRecordRaw, } from 'vue-router'
import { toRouteProps, redirectToLatestCommit, } from './common/route'

import Title from './views/Title.vue'
import Commit from './views/Commit.vue'

import AvatarSubNav from './views/navigation-sub/AvatarSubNav.vue'
import AvatarAbility from './views/abilities/AvatarAbility.vue'
import AvatarModifier from './views/abilities/AvatarModifier.vue'

import MonsterSubNav from './views/navigation-sub/MonsterSubNav.vue'
import MonsterAbility from './views/abilities/MonsterAbility.vue'
import MonsterModifier from './views/abilities/MonsterModifier.vue'

import BattleEventSubNav from './views/navigation-sub/BattleEventSubNav.vue'
import BattleEventAbility from './views/abilities/BattleEventAbility.vue'
import BattleEventModifier from './views/abilities/BattleEventModifier.vue'

import EquipmentSubNav from './views/navigation-sub/EquipmentSubNav.vue'
import EquipmentAbility from './views/abilities/EquipmentAbility.vue'
import EquipmentModifier from './views/abilities/EquipmentModifier.vue'

import RelicSetSubNav from './views/navigation-sub/RelicSetSubNav.vue'
import RelicSetAbility from './views/abilities/RelicSetAbility.vue'
import RelicSetModifier from './views/abilities/RelicSetModifier.vue'

import StatusSubNav from './views/navigation-sub/StatusSubNav.vue'
import StatusAbility from './views/abilities/StatusAbility.vue'
import StatusModifier from './views/abilities/StatusModifier.vue'

import RogueBuffSubNav from './views/navigation-sub/RogueBuffSubNav.vue'
import RogueBuffAbility from './views/abilities/RogueBuffAbility.vue'
import RogueBuffModifier from './views/abilities/RogueBuffModifier.vue'

import AnyAbility from './views/abilities/AnyAbility.vue'
import AnyModifier from './views/abilities/AnyModifier.vue'

import AnyTaskTemplate from './views/abilities/AnyTaskTemplate.vue'

import TargetAlias from './views/pages/TargetAlias.vue'
import TargetAliases from './views/pages/TargetAliases.vue'
import TargetOperations from './views/pages/TargetOperations.vue'
import RelicRecommends from './views/pages/RelicRecommends.vue'
import Changes from './views/pages/Changes.vue'

const routes:Readonly<RouteRecordRaw[]> = 
[
    { path: '/', name: 'home', component: Title },
    { path: '/@:commitId', name: 'commit', component: Commit, props:true, children: [
        
        // Avatars
        { path: '/avatar-:objectId/@:commitId', children: [
            { path: '', 
                name: 'avatar', components: { subnav: AvatarSubNav, }, 
                props:{ subnav:toRouteProps({ commitId:'string', objectId:'number' }) },
                meta: { mainNav: 'Avatar', mainNavTab:'Players', }
            },
            { path: '/ability-:abilityId/from/avatar-:objectId/@:commitId', 
                name: 'avatarAbility', components: { subnav: AvatarSubNav, default: AvatarAbility, }, 
                props:{ subnav:toRouteProps({ objectId:'number', abilityId:false }), default:toRouteProps({ objectId: 'number' }) },
                meta: { mainNav: 'Avatar', mainNavTab:'Players', }
            },
            { path: '/modifier-:modifierId/from/avatar-:objectId/@:commitId', 
                name: 'avatarModifier', components: { subnav: AvatarSubNav, default: AvatarModifier, }, 
                props:{ subnav:toRouteProps({ objectId:'number', modifierId:false }), default:toRouteProps({ objectId: 'number' }) },
                meta: { mainNav: 'Avatar', mainNavTab:'Players', }
            },
        ]},

        // Light Cones
        { path: '/lightcone-:objectId/@:commitId', children: [
            { path: '', 
                name: 'equipment', components: { subnav: EquipmentSubNav, }, 
                props:{ subnav:toRouteProps({ objectId:'number' })},
                meta: { mainNav: 'Equipment', mainNavTab:'Players', }
            },
            { path: '/ability-:abilityId/from/lightcone-:objectId/@:commitId', 
                name: 'equipmentAbility', components: { subnav: EquipmentSubNav, default: EquipmentAbility, },
                props:{ subnav:toRouteProps({ objectId:'number', abilityId:false }), default:toRouteProps({ objectId: 'number' }) },
                meta: { mainNav: 'Equipment', mainNavTab:'Players', }
            },
            { path: '/modifier-:modifierId/from/lightcone-:objectId/@:commitId', 
                name: 'equipmentModifier', components: { subnav: EquipmentSubNav, default: EquipmentModifier, }, 
                props:{ subnav:toRouteProps({ objectId:'number', modifierId:false }), default:toRouteProps({ objectId: 'number' }) },
                meta: { mainNav: 'Equipment', mainNavTab:'Players', }
            },
        ]},

        // Relic Sets
        { path: '/relicset-:objectId/@:commitId', children: [
            { path: '', 
                name: 'relicset', components: { subnav: RelicSetSubNav, }, 
                props:{ subnav:toRouteProps({ objectId:'number' })},
                meta: { mainNav: 'RelicSet', mainNavTab:'Players', }
            },
            { path: '/ability-:abilityId/from/relicset-:objectId/@:commitId', 
                name: 'relicsetAbility', components: { subnav: RelicSetSubNav, default: RelicSetAbility, },
                props:{ subnav:toRouteProps({ objectId:'number', abilityId:false }), default:toRouteProps({ objectId: 'number' }) },
                meta: { mainNav: 'RelicSet', mainNavTab:'Players', }
            },
            { path: '/modifier-:modifierId/from/relicset-:objectId/@:commitId', 
                name: 'relicsetModifier', components: { subnav: RelicSetSubNav, default: RelicSetModifier, }, 
                props:{ subnav:toRouteProps({ objectId:'number', modifierId:false }), default:toRouteProps({ objectId: 'number' }) },
                meta: { mainNav: 'RelicSet', mainNavTab:'Players', }
            },
        ]},

        // Monsters
        { path: '/monster-:objectId/@:commitId', children: [
            { path: '', 
                name: 'monster', components: { subnav: MonsterSubNav, }, 
                props:{ subnav:toRouteProps({ objectId:'number' })},
                meta: { mainNav: 'Monster', mainNavTab:'NPC', }
            },
            { path: '/ability-:abilityId/from/monster-:objectId/@:commitId', 
                name: 'monsterAbility', components: { subnav: MonsterSubNav, default: MonsterAbility, },
                props:{ subnav:toRouteProps({ objectId:'number', abilityId:false }), default:toRouteProps({ objectId: 'number' }) },
                meta: { mainNav: 'Monster', mainNavTab:'NPC', }
            },
            { path: '/modifier-:modifierId/from/monster-:objectId/@:commitId', 
                name: 'monsterModifier', components: { subnav: MonsterSubNav, default: MonsterModifier, }, 
                props:{ subnav:toRouteProps({ objectId:'number', modifierId:false }), default:toRouteProps({ objectId: 'number' }) },
                meta: { mainNav: 'Monster', mainNavTab:'NPC', }
            },
        ]},

        // Battle Events
        { path: '/battleevent-:objectId/@:commitId', children: [
            { path: '', 
                name: 'battleEvent', components: { subnav: BattleEventSubNav, }, 
                props:{ subnav:toRouteProps({ objectId:'number' })},
                meta: { mainNav: 'BattleEvent', mainNavTab:'NPC', }
            },
            { path: '/ability-:abilityId/from/battleevent-:objectId/@:commitId', 
                name: 'battleEventAbility', components: { subnav: BattleEventSubNav, default: BattleEventAbility, },
                props:{ subnav:toRouteProps({ objectId:'number', abilityId:false }), default:toRouteProps({ objectId: 'number' }) },
                meta: { mainNav: 'BattleEvent', mainNavTab:'NPC', }
            },
            { path: '/modifier-:modifierId/from/battleevent-:objectId/@:commitId', 
                name: 'battleEventModifier', components: { subnav: BattleEventSubNav, default: BattleEventModifier, }, 
                props:{ subnav:toRouteProps({ objectId:'number', modifierId:false }), default:toRouteProps({ objectId: 'number' }) },
                meta: { mainNav: 'BattleEvent', mainNavTab:'NPC', }
            },
        ]},
        
        // Status
        { path: '/status-:objectId/@:commitId', children: [
            { path: '', 
                name: 'status', components: { subnav: StatusSubNav, }, 
                props:{ subnav:toRouteProps({ objectId:'number' })},
                meta: { mainNav: 'Status', mainNavTab:'Global', }
            },
            { path: '/ability-:abilityId/from/status-:objectId/@:commitId', 
                name: 'statusAbility', components: { subnav: StatusSubNav, default: StatusAbility, },
                props:{ subnav:toRouteProps({ objectId:'number', abilityId:false }), default:toRouteProps({ objectId: 'number' }) },
                meta: { mainNav: 'Status', mainNavTab:'Global', }
            },
            { path: '/modifier-:modifierId/from/status-:objectId/@:commitId', 
                name: 'statusModifier', components: { subnav: StatusSubNav, default: StatusModifier, }, 
                props:{ subnav:toRouteProps({ objectId:'number', modifierId:false }), default:toRouteProps({ objectId: 'number' }) },
                meta: { mainNav: 'Status', mainNavTab:'Global', }
            },
        ]},

        // Rogue Buff (Blessings)
        { path: '/su-blessing-:objectId/@:commitId', children: [
            { path: '', 
                name: 'rogueBuff', components: { subnav: RogueBuffSubNav, }, 
                props:{ subnav:toRouteProps({ objectId:'number' })},
                meta: { mainNav: 'RogueBuff', mainNavTab:'Simulated Universe', }
            },
            { path: '/ability-:abilityId/from/su-blessing-:objectId/@:commitId', 
                name: 'rogueBuffAbility', components: { subnav: RogueBuffSubNav, default: RogueBuffAbility, },
                props:{ subnav:toRouteProps({ objectId:'number', abilityId:false }), default:toRouteProps({ objectId: 'number' }) },
                meta: { mainNav: 'RogueBuff', mainNavTab:'Simulated Universe', }
            },
            { path: '/modifier-:modifierId/from/su-blessing-:objectId/@:commitId', 
                name: 'rogueBuffModifier', components: { subnav: RogueBuffSubNav, default: RogueBuffModifier, }, 
                props:{ subnav:toRouteProps({ objectId:'number', modifierId:false }), default:toRouteProps({ objectId: 'number' }) },
                meta: { mainNav: 'RogueBuff', mainNavTab:'Simulated Universe', }
            },
        ]},

        // Ability / Modifier (no context)
        { path: '/ability-:abilityId/@:commitId', 
            name: 'ability', components: { default: AnyAbility, }, 
            props:{ default:toRouteProps({ }) },
            meta: { mainNav: 'Ability', mainNavTab:'Global', }
        },
        { path: '/modifier-:modifierId/@:commitId', 
            name: 'modifier', components: { default: AnyModifier, }, 
            props:{ default:toRouteProps({ }) },
            meta: { mainNav: 'Modifier', mainNavTab:'Global', }
        },

        // Task Templates
        { path: '/tasktemplate-:taskTemplateId/@:commitId', 
            name: 'tasktemplate', components: { default: AnyTaskTemplate, }, 
            props:{ default:toRouteProps({ }) },
            meta: { mainNav: 'TaskTemplate', mainNavTab:'Global', }
        },

        // Misc Pages
        { path: '/targetalias-:aliasId/@:commitId', 
            name: 'targetAlias', components: { default: TargetAlias, }, 
            props:{ default:toRouteProps({ }) },
            meta: { mainNav: 'Misc', mainNavTab:'All', }
        },
        { path: '/targetaliases/@:commitId', 
            name: 'targetAliases', components: { default: TargetAliases, }, 
            props:{ default:toRouteProps({ }) },
            meta: { mainNav: 'Misc', mainNavTab:'All', }
        },
        { path: '/targetoperations/@:commitId', 
            name: 'targetOperations', components: { default: TargetOperations, }, 
            props:{ default:toRouteProps({ }) },
            meta: { mainNav: 'Misc', mainNavTab:'All', }
        },
        { path: '/recommendedrelics/@:commitId', 
            name: 'relicRecommends', components: { default: RelicRecommends, }, 
            props:{ default:toRouteProps({ }) },
            meta: { mainNav: 'Misc', mainNavTab:'All', }
        },
        { path: '/changes/from-@:fromCommitId/@:commitId', 
            name: 'changes', components: { default: Changes, }, 
            props:{ default:toRouteProps({ }) },
            meta: { mainNav: 'Misc', mainNavTab:'All', }
        },
    ]},

    // Redirects

    { path: '/avatar-:objectId', meta: { redirectName:'avatar' }, redirect: redirectToLatestCommit },
    { path: '/ability-:abilityId/from/avatar-:objectId', meta: { redirectName:'avatarAbility' }, redirect: redirectToLatestCommit },
    { path: '/modifier-:modifierId/from/avatar-:objectId', meta: { redirectName:'avatarModifier' }, redirect: redirectToLatestCommit },
    
    { path: '/lightcone-:objectId', meta: { redirectName:'equipment' }, redirect: redirectToLatestCommit },
    { path: '/ability-:abilityId/from/lightcone-:objectId', meta: { redirectName:'equipmentAbility' }, redirect: redirectToLatestCommit },
    { path: '/modifier-:modifierId/from/lightcone-:objectId', meta: { redirectName:'equipmentModifier' }, redirect: redirectToLatestCommit },

    { path: '/relicset-:objectId', meta: { redirectName:'relicset' }, redirect: redirectToLatestCommit },
    { path: '/ability-:abilityId/from/relicset-:objectId', meta: { redirectName:'relicsetAbility' }, redirect: redirectToLatestCommit },
    { path: '/modifier-:modifierId/from/relicset-:objectId', meta: { redirectName:'relicsetModifier' }, redirect: redirectToLatestCommit },
    
    { path: '/monster-:objectId', meta: { redirectName:'monster' }, redirect: redirectToLatestCommit },
    { path: '/ability-:abilityId/from/monster-:objectId', meta: { redirectName:'monsterAbility' }, redirect: redirectToLatestCommit },
    { path: '/modifier-:modifierId/from/monster-:objectId', meta: { redirectName:'monsterModifier' }, redirect: redirectToLatestCommit },
    
    { path: '/battleevent-:objectId', meta: { redirectName:'battleEvent' }, redirect: redirectToLatestCommit },
    { path: '/ability-:abilityId/from/battleevent-:objectId', meta: { redirectName:'battleEventAbility' }, redirect: redirectToLatestCommit },
    { path: '/modifier-:modifierId/from/battleevent-:objectId', meta: { redirectName:'battleEventModifier' }, redirect: redirectToLatestCommit },

    { path: '/status-:objectId', meta: { redirectName:'status' }, redirect: redirectToLatestCommit },
    { path: '/ability-:abilityId/from/status-:objectId', meta: { redirectName:'statusAbility' }, redirect: redirectToLatestCommit },
    { path: '/modifier-:modifierId/from/status-:objectId', meta: { redirectName:'statusModifier' }, redirect: redirectToLatestCommit },

    { path: '/su-blessing-:objectId', meta: { redirectName:'rogueBuff' }, redirect: redirectToLatestCommit },
    { path: '/ability-:abilityId/from/su-blessing-:objectId', meta: { redirectName:'rogueBuffAbility' }, redirect: redirectToLatestCommit },
    { path: '/modifier-:modifierId/from/su-blessing-:objectId', meta: { redirectName:'rogueBuffModifier' }, redirect: redirectToLatestCommit },

    { path: '/ability-:abilityId', meta: { redirectName:'ability' }, redirect: redirectToLatestCommit },
    { path: '/modifier-:modifierId', meta: { redirectName:'modifier' }, redirect: redirectToLatestCommit },
    
    { path: '/tasktemplate-:taskTemplateId', meta: { redirectName:'tasktemplate' }, redirect: redirectToLatestCommit },
    
    { path: '/targetalias-:aliasId', meta: { redirectName:'targetAlias' }, redirect: redirectToLatestCommit },
    { path: '/targetaliases', meta: { redirectName:'targetAliases' }, redirect: redirectToLatestCommit },
    { path: '/recommendedrelics', meta: { redirectName:'relicRecommends' }, redirect: redirectToLatestCommit },

    { path: '/:pathMatch(.*)*', redirect:'/', },
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
