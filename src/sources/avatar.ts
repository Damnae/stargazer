import { retrieveJson } from '@/common/datasource';
import translate, { Translatable, translateFromKey, translatePath, } from '@/common/translate';
import { GamecoreParam } from './gamecore';
import { Creature } from './creature';
import { cleanupFilename } from '@/common/common';
import { Mutex } from '@/common/mutex';

// Eidolons

export interface AvatarRank
{
    RankID: number
    Rank: number
    Trigger: 
    {
        // No idea what this is, doesn't look like Translatable
        Hash: number 
    }
    Name: string
    Desc: string
    SkillAddLevelList: 
    {
        [skillId: number]: number
    }
    RankAbility: string[]
    Param: GamecoreParam[]
}

export interface AvatarRankConfig
{
    [key: string]: AvatarRank
}

// Traces

export interface AvatarSkillTree
{
    PointID: number
    AvatarID: number
    Level: number
    MaxLevel: number
    PointName: string
    PointDesc: string
    PointType: number
    Anchor: string
    DefaultUnlock: boolean
    PrePoint: number[]
    StatusAddList: 
    [
        {
            PropertyType: string
            Value: 
            {
                Value: number
            }
        }
    ]
    LevelUpSkillID: number[]
    PointTriggerKey: 
    {
        // No idea what this is, doesn't look like Translatable
        Hash: number 
    }
    AbilityName:string
    ParamList: GamecoreParam[]
}

export interface AvatarSkillTreeRank
{
    [rank: number]: AvatarSkillTree
}

export interface AvatarSkillTreeConfig
{
    [key: string]: AvatarSkillTreeRank
}

// Avatar

export interface Avatar extends Creature
{
    AvatarID: number
    AvatarName: Translatable
    JsonPath: string
    DamageType: string
    RankIDList: number[]
    Eidolons: AvatarRank[]
    Traces: AvatarSkillTree[]
    SkillList: number[]
    DynamicValues?: [ any ] // Just assuming they could have them here like for some monsters?
    AvatarBaseType: string
    AIPath: string
    SearchKeywords: string[]
}

export interface AvatarConfig
{
    [key: string]: Avatar
}

const avatarConfigCache:{[commitId: string]: AvatarConfig} = {}
const avatarConfigMutex = new Mutex()
export async function getAvatars(commitId:string) : Promise<AvatarConfig>
{
    return avatarConfigMutex.runExclusive(async () => 
    {
        let config = avatarConfigCache[commitId]
        if (config == undefined)
        {
            const eidolons = await retrieveJson('ExcelOutput/AvatarRankConfig.json', commitId, false) as AvatarRankConfig
            for (const key in eidolons)
            {
                const eidolon = eidolons[key]
                eidolon.Name = await translateFromKey(commitId, eidolon.Name) ?? eidolon.Name
                eidolon.Desc = await translateFromKey(commitId, eidolon.Desc) ?? eidolon.Desc
            }
    
            const avatars = await retrieveJson('ExcelOutput/AvatarConfig.json', commitId, false) as AvatarConfig
            for (const key in avatars)
            {
                const avatar = avatars[key]
                await translate(commitId, avatar.AvatarName, (name) => 
                {
                    if (!name)
                        return avatar.AvatarID.toString()
                    
                    if (avatar.AvatarID > 8000)
                        name = name.replace('{NICKNAME}', `Trailblazer (${avatar.DamageType})`)
                    return name
                })
                avatar.Eidolons = avatar.RankIDList.map(v => eidolons[v])
                avatar.Traces = []
    
                avatar.SearchKeywords = []
                avatar.SearchKeywords.push(avatar.AvatarName.Text.toLowerCase())
                avatar.SearchKeywords.push(avatar.DamageType.toLowerCase())
                avatar.SearchKeywords.push((await translatePath(commitId, avatar.AvatarBaseType)).toLowerCase())
                avatar.SearchKeywords.push(cleanupFilename(avatar.JsonPath).toLowerCase())
            }
    
            const traceRanks = await retrieveJson('ExcelOutput/AvatarSkillTreeConfig.json', commitId, false) as AvatarSkillTreeConfig
            for (const key in traceRanks)
            {
                const ranks = traceRanks[key]
                const trace = ranks[Object.keys(ranks).length]
                trace.PointName = await translateFromKey(commitId, trace.PointName) ?? trace.PointName
                trace.PointDesc = await translateFromKey(commitId, trace.PointDesc) ?? trace.PointDesc

                const avatar = avatars[trace.AvatarID]
                avatar.Traces.push(trace)
            }
    
            config = avatarConfigCache[commitId] = avatars
            console.log('cached avatar config for ' + commitId)
        }
        return config
    })
}

export async function getAvatar(commitId:string, avatarId:number) : Promise<Avatar>
{
    return (await getAvatars(commitId))[avatarId]
}