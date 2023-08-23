import { retrieveJson } from '../datasource';
import translate, { Translatable } from '../translate';

// AvatarRankConfig -> eidolons

export interface Avatar
{
    AvatarID: number
    AvatarName: Translatable
    JsonPath: string
    DamageType: string
    RankIDList: number[]
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
        const results = await retrieveJson('ExcelOutput/AvatarConfig.json', commitId, false) as AvatarConfig
        for (const key in results)
        {
            const avatar = results[key]
            await translate(commitId, avatar.AvatarName, (name) => 
            {
                if (avatar.AvatarID > 8000)
                    name = name.replace('{NICKNAME}', `Trailblazer (${avatar.DamageType})`)
                return name
            })
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