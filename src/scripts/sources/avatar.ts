import { retrieveJson } from '../datasource';
import translate from '../translate';

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