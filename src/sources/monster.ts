import { cleanupFilename } from '@/common/common';
import { retrieveJson } from '@/common/datasource';
import { Mutex } from '@/common/mutex';
import translate, { Translatable } from '@/common/translate';
import { Creature } from './creature';
import { DynamicValues } from './gamecore';

export interface Monster extends Creature
{
    MonsterID: number
    MonsterTemplateID: number
    MonsterTemplate: MonsterTemplate
    MonsterName: Translatable
    SkillList: [ id: number]
    DynamicValues?: DynamicValues // Seem always empty
    CustomValueTags: [ name: string]
    AbilityNameList: [ name: string]
    OverrideAIPath: string
    SearchKeywords: string[]
}

export interface MonsterTemplate
{
    MonsterTemplateID: number
    TemplateGroupID: number
    AtlasSortID: number
    MonsterCampID: number
    MonsterCamp: MonsterCamp
    MonsterName: Translatable
    JsonConfig: string
    AIPath: string
}

export interface MonsterCamp
{
    ID: number
    SortID: number
    AtlasSortID: number
    Name: Translatable
}

export interface MonsterConfig
{
    [key: string]: Monster
}

const missingMonsterCamp:MonsterCamp = 
{     
    ID: -1,
    SortID: 9999,
    AtlasSortID: 9999,
    Name: { Hash: 750427067, Text: 'Unknown', },
}

const missingMonsterTemplate:MonsterTemplate = 
{     
    MonsterTemplateID: -1,
    TemplateGroupID: -1,
    AtlasSortID: 9999,
    MonsterCampID: -1,
    MonsterCamp: missingMonsterCamp,
    MonsterName: { Hash: 750427067, Text: 'Unknown', },
    JsonConfig: '',
    AIPath: '',
}

const monsterConfigCache:{[commitId: string]: MonsterConfig} = {}
const monsterConfigMutex = new Mutex()
export async function getMonsters(commitId:string) : Promise<MonsterConfig>
{
    return monsterConfigMutex.runExclusive(async () => 
    {
        let config = monsterConfigCache[commitId]
        if (config == undefined)
        {
            const camps = await retrieveJson('ExcelOutput/MonsterCamp.json', commitId, false)
            for (const key in camps)
            {
                const camp = camps[key] as MonsterCamp
                await translate(commitId, camp.Name)
            }
    
            const templates = await retrieveJson('ExcelOutput/MonsterTemplateConfig.json', commitId, false)
            for (const key in templates)
            {
                const template = templates[key] as MonsterTemplate
                const parentTemplate = templates[template.TemplateGroupID] as MonsterTemplate
                await translate(commitId, template.MonsterName)
    
                const monsterCampId = template.MonsterCampID ?? parentTemplate?.MonsterCampID
                template.MonsterCamp = camps[monsterCampId] ?? missingMonsterCamp
            }
    
            const monsters = await retrieveJson('ExcelOutput/MonsterConfig.json', commitId, false) as MonsterConfig
            for (const key in monsters)
            {
                const monster = monsters[key]
                await translate(commitId, monster.MonsterName)
                monster.MonsterTemplate = templates[monster.MonsterTemplateID] ?? missingMonsterTemplate
                
                monster.SearchKeywords = []
                monster.SearchKeywords.push(monster.MonsterName.Text.toLowerCase())
                if (monster.MonsterTemplate)
                    monster.SearchKeywords.push(cleanupFilename(monster.MonsterTemplate.JsonConfig).toLowerCase())
            }
    
            config = monsterConfigCache[commitId] = monsters
            console.log('cached monster config for ' + commitId)
        }
        return config
    })
}

export async function getMonster(commitId:string, avatarId:number) : Promise<Monster>
{
    return (await getMonsters(commitId))[avatarId]
}