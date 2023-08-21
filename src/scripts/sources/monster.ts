import { retrieveJson } from '../datasource';
import translate from '../translate';

export interface Monster
{
    MonsterID: number
    MonsterTemplateID: number
    MonsterTemplate:MonsterTemplate
    MonsterName:
    {
        Hash: number
        Text: string
    }
    SkillList: [ id: number]
    DynamicValues: [ any ] // Seem always empty
    CustomValueTags: [ name: string]
    AbilityNameList: [ name: string]
    OverrideAIPath: string
}

export interface MonsterTemplate
{
    MonsterTemplateID: number
    TemplateGroupID: number
    AtlasSortID: number
    MonsterCampID: number
    MonsterCamp: MonsterCamp
    MonsterName:
    {
        Hash: number
        Text: string
    }
    JsonConfig: string
    AIPath: string
}

export interface MonsterCamp
{
    ID: number
    SortID: number
    AtlasSortID: number
    Name:
    {
        Hash: number
        Text: string
    }
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
    Name:
    {
        Hash: 750427067,
        Text: 'Unknown',
    },
}
const missingMonsterTemplate:MonsterTemplate = 
{     
    MonsterTemplateID: -1,
    TemplateGroupID: -1,
    AtlasSortID: 9999,
    MonsterCampID: -1,
    MonsterCamp: missingMonsterCamp,
    MonsterName:
    {
        Hash: 750427067,
        Text: 'Unknown',
    },
    JsonConfig: '',
    AIPath: '',
}

const monsterConfigCache:{[commitId: string]: MonsterConfig} = {}
export async function getMonsters(commitId:string) : Promise<MonsterConfig>
{
    let config = monsterConfigCache[commitId]
    if (config == undefined)
    {
        const camps = await retrieveJson('ExcelOutput/MonsterCamp.json', commitId, false)
        for (const key in camps)
        {
            const camp = camps[key] as MonsterCamp
            camp.Name.Text = await translate(commitId, camp.Name.Hash)
        }

        const templates = await retrieveJson('ExcelOutput/MonsterTemplateConfig.json', commitId, false)
        for (const key in templates)
        {
            const template = templates[key] as MonsterTemplate
            const parentTemplate = templates[template.TemplateGroupID] as MonsterTemplate
            template.MonsterName.Text = await translate(commitId, template.MonsterName.Hash)

            const monsterCampId = template.MonsterCampID ?? parentTemplate?.MonsterCampID
            template.MonsterCamp = camps[monsterCampId] ?? missingMonsterCamp
        }

        const monsters = await retrieveJson('ExcelOutput/MonsterConfig.json', commitId, false) as MonsterConfig
        for (const key in monsters)
        {
            const monster = monsters[key]
            monster.MonsterName.Text = await translate(commitId, monster.MonsterName.Hash)
            monster.MonsterTemplate = templates[monster.MonsterTemplateID] ?? missingMonsterTemplate
        }

        config = monsterConfigCache[commitId] = monsters
        console.log('cached monster config for ' + commitId)
    }
    return config
}

export async function getMonster(commitId:string, avatarId:number) : Promise<Monster>
{
    return (await getMonsters(commitId))[avatarId]
}