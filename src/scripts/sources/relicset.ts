import { retrieveJson } from '../datasource';
import translate, { Translatable, } from '../translate';
import { GamecoreParam } from './gamecore';

// Relic Set Skill

export interface RelicSetSkill
{
    SetID: number
    RequireNum: Number
    SkillDesc: string
    AbilityName: string
    AbilityParamList: GamecoreParam[]
    PropertyList: 
    [
        {
            FGBOJAIOFIJ: string // PropertyType
            LGKGOMNMBAH: // Value
            {
                Value: number
            }
        }
    ]
}

export interface RelicSetSkillRank
{
    [rank: number]: RelicSetSkill
}

export interface RelicSetSkillConfig
{
    [key: string]: RelicSetSkillRank
}

// Relic Set

export interface RelicSet
{
    SetID: number
    SetSkillList: number[]
    SetName: Translatable
    Skills: RelicSetSkillRank
}

export interface RelicSetConfig
{
    [key: string]: RelicSet
}

const relicsetConfigCache:{[commitId: string]: RelicSetConfig} = {}
export async function getRelicSets(commitId:string) : Promise<RelicSetConfig>
{
    let config = relicsetConfigCache[commitId]
    if (config == undefined)
    {
        const relicsetSkills = await retrieveJson('ExcelOutput/RelicSetSkillConfig.json', commitId, false) as RelicSetSkillConfig

        const relicsets = await retrieveJson('ExcelOutput/RelicSetConfig.json', commitId, false) as RelicSetConfig
        for (const key in relicsets)
        {
            const relicset = relicsets[key]
            await translate(commitId, relicset.SetName)
            relicset.Skills = relicsetSkills[relicset.SetID]
        }

        config = relicsetConfigCache[commitId] = relicsets
        console.log('cached relic set config for ' + commitId)
    }
    return config
}

export async function getRelicSet(commitId:string, relicsetId:number) : Promise<RelicSet>
{
    return (await getRelicSets(commitId))[relicsetId]
}