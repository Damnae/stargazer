import { retrieveJson } from '../datasource';
import translate, { Translatable, } from '../translate';
import { AbilityParam } from './ability';
import { Creature } from './creature';

export interface AvatarRank
{
    RankID: number
    Rank: number
    Trigger: Translatable
    Name: string // Look like keys that need to be hashed
    Desc: string // This too
    SkillAddLevelList: 
    {
        [skillId: number]: number
    }
    RankAbility: string[]
    Param: AbilityParam[]
}

export interface AvatarRankConfig
{
    [key: string]: AvatarRank
}

export interface Avatar extends Creature
{
    AvatarID: number
    AvatarName: Translatable
    JsonPath: string
    DamageType: string
    RankIDList: number[]
    Eidolons: AvatarRank[]
    SkillList: number[]
    DynamicValues?: [ any ] // Just assuming they could have them here like for some monsters?
    AvatarBaseType: string
    AIPath: string
}

export interface AvatarConfig
{
    [key: string]: Avatar
}

const avatarConfigCache:{[commitId: string]: AvatarConfig} = {}
export async function getAvatars(commitId:string) : Promise<AvatarConfig>
{
    let config = avatarConfigCache[commitId]
    if (config == undefined)
    {
        const eidolons = await retrieveJson('ExcelOutput/AvatarRankConfig.json', commitId, false) as AvatarRankConfig
        // No point translating any of these, it doesn't work
        //await translate(commitId, eidolon.Trigger)
        //eidolon.Name = await translateHash(commitId, getHash(eidolon.Name))
        //eidolon.Desc = await translateHash(commitId, getHash(eidolon.Desc))

        const avatars = await retrieveJson('ExcelOutput/AvatarConfig.json', commitId, false) as AvatarConfig
        for (const key in avatars)
        {
            const avatar = avatars[key]
            await translate(commitId, avatar.AvatarName, (name) => 
            {
                if (avatar.AvatarID > 8000)
                    name = name.replace('{NICKNAME}', `Trailblazer (${avatar.DamageType})`)
                return name
            })
            avatar.Eidolons = avatar.RankIDList.map(v => eidolons[v])
        }
        config = avatarConfigCache[commitId] = avatars
        console.log('cached avatar config for ' + commitId)
    }
    return config
}

export async function getAvatar(commitId:string, avatarId:number) : Promise<Avatar>
{
    return (await getAvatars(commitId))[avatarId]
}