import { retrieveJson } from '@/common/datasource';
import { Mutex } from '@/common/mutex';
import translate, { Translatable, translatePath, } from '@/common/translate';
import { GamecoreParam } from './gamecore';

// ItemConfigEquipment.json ?
// EquipmentPromotionConfig.json ?

// Equipment Skill

export interface EquipmentSkill
{
    SkillID: number
    SkillName: Translatable
    SkillDesc: Translatable
    AbilityName: string
    ParamList: GamecoreParam[]
    AbilityProperty: 
    [
        {
            PropertyType: string
            Value: 
            {
                Value: number
            }
        }
    ]
}

export interface EquipmentSkillRank
{
    [rank: number]: EquipmentSkill
}

export interface EquipmentSkillConfig
{
    [key: string]: EquipmentSkillRank
}

// Equipment

export interface Equipment
{
    EquipmentID: number
    EquipmentName: Translatable
    EquipmentDesc: Translatable
    AvatarBaseType: string
    SkillID: number
    Skill: EquipmentSkill
    SearchKeywords:string[]
}

export interface EquipmentConfig
{
    [key: string]: Equipment
}

const equipmentConfigCache:{[commitId: string]: EquipmentConfig} = {}
const equipmentConfigMutex = new Mutex()
export async function getEquipments(commitId:string) : Promise<EquipmentConfig>
{
    return equipmentConfigMutex.runExclusive(async () => 
    {
        let config = equipmentConfigCache[commitId]
        if (config == undefined)
        {
            const equipmentSkills = await retrieveJson('ExcelOutput/EquipmentSkillConfig.json', commitId, false) as EquipmentSkillConfig
            for (const skillKey in equipmentSkills)
            {
                const ranks = equipmentSkills[skillKey]        
                for (const rankKey in ranks)
                {
                    const skill = ranks[rankKey]
                    await translate(commitId, skill.SkillName)
                    await translate(commitId, skill.SkillDesc)
                }
            }
    
            const equipments = await retrieveJson('ExcelOutput/EquipmentConfig.json', commitId, false) as EquipmentConfig
            for (const key in equipments)
            {
                const equipment = equipments[key]
                await translate(commitId, equipment.EquipmentName)
                //await translate(commitId, equipment.EquipmentDesc)
                equipment.AvatarBaseType = await translatePath(commitId, equipment.AvatarBaseType)
                equipment.Skill = equipmentSkills[equipment.SkillID]?.[1]
    
                equipment.SearchKeywords = []
                equipment.SearchKeywords.push(equipment.EquipmentName.Text.toLowerCase())
                if (equipment.Skill)
                    equipment.SearchKeywords.push(equipment.Skill.SkillName.Text.toLowerCase())
            }
    
            config = equipmentConfigCache[commitId] = equipments
            console.log('cached equipment config for ' + commitId)
        }
        return config
    })
}

export async function getEquipment(commitId:string, equipmentId:number) : Promise<Equipment>
{
    return (await getEquipments(commitId))[equipmentId]
}