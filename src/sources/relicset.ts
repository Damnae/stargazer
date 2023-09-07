import { retrieveJson } from '@/common/datasource';
import { Mutex } from '@/common/mutex';
import translate, { Translatable, } from '@/common/translate';
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
            NAOGDGBJNOJ: string // PropertyType
            MBOHKHKHFPD: // Value
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
    SearchKeywords: string[]
}

export interface RelicSetConfig
{
    [key: string]: RelicSet
}

const relicsetConfigCache:{[commitId: string]: RelicSetConfig} = {}
const relicsetConfigMutex = new Mutex()
export async function getRelicSets(commitId:string) : Promise<RelicSetConfig>
{
    return relicsetConfigMutex.runExclusive(async () => 
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
    
                relicset.SearchKeywords = []
                relicset.SearchKeywords.push(relicset.SetName.Text.toLowerCase())
            }
    
            config = relicsetConfigCache[commitId] = relicsets
            console.log('cached relic set config for ' + commitId)
        }
        return config
    })
}

export async function getRelicSet(commitId:string, relicsetId:number) : Promise<RelicSet>
{
    return (await getRelicSets(commitId))[relicsetId]
}