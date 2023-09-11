import { retrieveJson } from '@/common/datasource';
import { Mutex } from '@/common/mutex';
import translate, { Translatable, } from '@/common/translate';

// Maze Skill

export interface MazeSkill
{
    MazeSkillId: number
    MazeSkillName: Translatable
    MazeSkillDesc: Translatable
    MazeSkillType: number
    RelatedAvatarSkill: string
    SkillTriggerKey: string
}

export interface MazeSkillConfig
{
    [key: string]: MazeSkill
}

const mazeSkillConfigCache:{[commitId: string]: MazeSkillConfig} = {}
const mazeSkillConfigMutex = new Mutex()
export async function getMazeSkills(commitId:string) : Promise<MazeSkillConfig>
{
    return mazeSkillConfigMutex.runExclusive(async () => 
    {
        let config = mazeSkillConfigCache[commitId]
        if (config == undefined)
        {
            const mazeSkills = await retrieveJson('ExcelOutput/MazeSkill.json', commitId, false) as MazeSkillConfig
            const mazeSkillsByAvatarSkillId:MazeSkillConfig = {}
            
            for (const key in mazeSkills)
            {
                const mazeSkill = mazeSkills[key]
                await translate(commitId, mazeSkill.MazeSkillName)
                await translate(commitId, mazeSkill.MazeSkillDesc)

                mazeSkillsByAvatarSkillId[mazeSkill.RelatedAvatarSkill] = mazeSkill
            }

            config = mazeSkillConfigCache[commitId] = mazeSkillsByAvatarSkillId
            console.log('cached maze skill config for ' + commitId)
        }
        return config
    })
}

export async function getMazeSkill(commitId:string, skillId:number) : Promise<MazeSkill>
{
    return (await getMazeSkills(commitId))[skillId]
}