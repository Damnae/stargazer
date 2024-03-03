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
    MonsterIntroduction: Translatable
    MonsterBattleIntroduction: Translatable
    SkillList: [ id: number]
    DynamicValues?: DynamicValues // Seem always empty
    CustomValues: 
    [
        {
            Property:string
            Value:string
        }
    ]
    CustomValueTags: [ name: string ]
    AbilityNameList: [ name: string ]
    OverrideAIPath: string
    OverrideAISkillSequence?:
    [
        {
            Value:number
        }
    ]
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
    AISkillSequence?:
    [
        {
            Value:number
        }
    ]
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
    
                if (template.AISkillSequence?.length)
                {
                    const valueKey = Object.keys(template.AISkillSequence[0])[0] as string
                    for (const propKey in template.AISkillSequence)
                    {
                        const property = template.AISkillSequence[propKey]
                        property.Value = (property as any as {[key:string]:number})[valueKey]
                    }
                }

                const monsterCampId = template.MonsterCampID ?? parentTemplate?.MonsterCampID
                template.MonsterCamp = camps[monsterCampId] ?? missingMonsterCamp
            }
    
            const monsters = await retrieveJson('ExcelOutput/MonsterConfig.json', commitId, false) as MonsterConfig
            for (const key in monsters)
            {
                const monster = monsters[key]
                await translate(commitId, monster.MonsterName)
                await translate(commitId, monster.MonsterIntroduction)
                monster.MonsterTemplate = templates[monster.MonsterTemplateID] ?? missingMonsterTemplate
                
                if (monster.CustomValues?.length)
                {
                    const keys = Object.keys(monster.CustomValues[0])
                    const propertyKey = keys[0] as string
                    const valueKey = keys[1] as string
                    for (const propKey in monster.CustomValues)
                    {
                        const property = monster.CustomValues[propKey]
                        property.Property = (property as any as {[key:string]:string})[propertyKey]
                        property.Value = (property as any as {[key:string]:string})[valueKey]
                    }
                }

                if (monster.OverrideAISkillSequence?.length)
                {
                    const valueKey = Object.keys(monster.OverrideAISkillSequence[0])[0] as string
                    for (const propKey in monster.OverrideAISkillSequence)
                    {
                        const property = monster.OverrideAISkillSequence[propKey]
                        property.Value = (property as any as {[key:string]:number})[valueKey]
                    }
                }

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

export async function getMonster(commitId:string, monsterId:number) : Promise<Monster>
{
    return (await getMonsters(commitId))[monsterId]
}