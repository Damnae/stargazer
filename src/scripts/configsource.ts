import { retrieveJson } from './datasource';
import translate from './translate';

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

export interface MonsterConfig
{
    [key: string]: Monster
}

export interface GroupedMonsters
{
    [group: string]: Monster[]
}

export interface MonsterTemplate
{
    MonsterTemplateID: number
    TemplateGroupID: number
    AtlasSortID: number
    MonsterCampID: number
    MonsterName:
    {
        Hash: number
        Text: string
    }
    JsonConfig: string
    AIPath: string
}

export interface MonsterTemplateConfig
{
    [key: string]: MonsterTemplate
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

export interface MonsterCampConfig
{
    [key: string]: MonsterCamp
}

const monsterConfigCache:{[commitId: string]: MonsterConfig} = {}
export async function getMonsters(commitId:string) : Promise<MonsterConfig>
{
    let config = monsterConfigCache[commitId]
    if (config == undefined)
    {
        const results = await retrieveJson('ExcelOutput/MonsterConfig.json', commitId, false)
        for (const key in results)
        {
            const monster = results[key]
            monster.MonsterName.Text = await translate(commitId, monster.MonsterName.Hash)
        }
        config = monsterConfigCache[commitId] = results
        console.log('cached monster config for ' + commitId)
    }
    return config
}

export async function getMonster(commitId:string, avatarId:number) : Promise<Monster>
{
    return (await getMonsters(commitId))[avatarId]
}

export async function getMonsterTemplates(commitId:string) : Promise<MonsterTemplateConfig>
{
    let results = await retrieveJson('ExcelOutput/MonsterTemplateConfig.json', commitId, false)
    for (const key in results)
    {
        const result = results[key]
        result.MonsterName.Text = await translate(commitId, result.MonsterName.Hash)
    }
    return results;
}

export async function getMonsterCamps(commitId:string) : Promise<MonsterCampConfig>
{
    let results = await retrieveJson('ExcelOutput/MonsterCamp.json', commitId, false)
    for (const key in results)
    {
        const result = results[key]
        result.Name.Text = await translate(commitId, result.Name.Hash)
    }
    return results;
}