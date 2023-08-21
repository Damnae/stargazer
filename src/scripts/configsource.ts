import { retrieveJson } from './datasource';
import translate from './translate';

export interface Grouped<TElement>
{
    [groupBy: string]: TElement[]
}
export interface Grouped2<TElement>
{
    [groupBy: string]: {[groupBy: string]: TElement[]}
}

export interface Avatar
{
    AvatarID: number
    AvatarName:
    {
        Hash: number
        Text: string
    }
    JsonPath: string
    DamageType: string
    RankIDList: [ id: number ]
    SkillList: [ id: number ]
    AvatarBaseType: string
    AIPath: string
}

export interface AvatarConfig
{
    [key: string]: Avatar
}

export interface GroupedAvatars
{
    [group: string]: Avatar[]
}

const avatarConfigCache:{[commitId: string]: AvatarConfig} = {}
export async function getAvatars(commitId:string) : Promise<AvatarConfig>
{
    let config = avatarConfigCache[commitId]
    if (config == undefined)
    {
        const results = await retrieveJson('ExcelOutput/AvatarConfig.json', commitId, false)
        for (const key in results)
        {
            const avatar = results[key]

            let name = await translate(commitId, avatar.AvatarName.Hash)
            if (avatar.AvatarID > 8000)
                name = name.replace('{NICKNAME}', `Trailblazer (${avatar.DamageType})`)
            avatar.AvatarName.Text = name
        }
        config = avatarConfigCache[commitId] = results
        console.log('cached avatar config for ' + commitId)
    }
    return config
}

export async function getAvatar(commitId:string, avatarId:number) : Promise<Avatar>
{
    return (await getAvatars(commitId))[avatarId]
}

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
            const camp = camps[key]
            camp.Name.Text = await translate(commitId, camp.Name.Hash)
        }

        const templates = await retrieveJson('ExcelOutput/MonsterTemplateConfig.json', commitId, false)
        for (const key in templates)
        {
            const template = templates[key]
            template.MonsterName.Text = await translate(commitId, template.MonsterName.Hash)
            template.MonsterCamp = camps[template.MonsterCampID] ?? missingMonsterCamp
        }

        const monsters = await retrieveJson('ExcelOutput/MonsterConfig.json', commitId, false)
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
