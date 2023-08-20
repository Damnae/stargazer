import { retrieveJson } from './datasource';
import translate from './translate';

export interface AvatarConfig
{
    [key: string]:
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
}

export async function getAvatars(commitId:string) : Promise<AvatarConfig>
{
    let results = await retrieveJson('ExcelOutput/AvatarConfig.json', commitId, false)
    for (const key in results)
    {
        const result = results[key]
        result.AvatarName.Text = await translate(commitId, result.AvatarName.Hash)
    }
    return results;
}

export interface MonsterConfig
{
    [key: string]:
    {
        MonsterID: number
        MonsterTemplateID: number
        MonsterName:
        {
            Hash: number
            Text: string
        }
        HardLevelGroup: number // Always 1?
        EliteGroup: number
        SkillList: [ id: number]
        DynamicValues: [ any ] // Seem always empty
        CustomValueTags: [ name: string]
        AbilityNameList: [ name: string]
        OverrideAIPath: string
    }
}

export interface MonsterTemplateConfig
{
    [key: string]:
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
}

export interface MonsterCampConfig
{
    [key: string]:
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
}

export async function getMonsters(commitId:string) : Promise<MonsterConfig>
{
    let results = await retrieveJson('ExcelOutput/MonsterConfig.json', commitId, false)
    for (const key in results)
    {
        const result = results[key]
        result.MonsterName.Text = await translate(commitId, result.MonsterName.Hash)
    }
    return results;
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
    let results = await retrieveJson('ExcelOutput/MonsterCampConfig.json', commitId, false)
    for (const key in results)
    {
        const result = results[key]
        result.Name.Text = await translate(commitId, result.Name.Hash)
    }
    return results;
}