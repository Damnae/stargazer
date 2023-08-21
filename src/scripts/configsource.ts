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

export async function getAvatars(commitId:string) : Promise<AvatarConfig>
{
    const results = await retrieveJson('ExcelOutput/AvatarConfig.json', commitId, false)
    for (const key in results)
        await postprocessAvatar(results[key], commitId)
    return results;
}

export async function getAvatar(commitId:string, avatarId:number) : Promise<Avatar>
{
    const results = await retrieveJson('ExcelOutput/AvatarConfig.json', commitId, false)
    return postprocessAvatar(results[avatarId], commitId);
}

export interface MonsterConfig
{
    [key: string]: Monster
}

async function postprocessAvatar(avatar:Avatar, commitId:string) : Promise<Avatar>
{
    if (avatar !== undefined)
    {
        let name = await translate(commitId, avatar.AvatarName.Hash)
        if (avatar.AvatarID > 8000)
            name = name.replace('{NICKNAME}', `Trailblazer (${avatar.DamageType})`)
        avatar.AvatarName.Text = name
    }
    return avatar;
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

export interface MonsterTemplateConfig
{
    [key: string]: MonsterTemplate
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

export interface MonsterCampConfig
{
    [key: string]: MonsterCamp
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

export async function getMonsters(commitId:string) : Promise<MonsterConfig>
{
    const results = await retrieveJson('ExcelOutput/MonsterConfig.json', commitId, false)
    for (const key in results)
        await postprocessMonster(results[key], commitId)
    return results;
}

export async function getMonster(commitId:string, monsterId:number) : Promise<Monster>
{
    const results = await retrieveJson('ExcelOutput/MonsterConfig.json', commitId, false)
    return postprocessMonster(results[monsterId], commitId);
}

async function postprocessMonster(monster:Monster, commitId:string) : Promise<Monster>
{
    if (monster !== undefined)
        monster.MonsterName.Text = await translate(commitId, monster.MonsterName.Hash)
    return monster;
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