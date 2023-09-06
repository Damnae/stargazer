import { retrieveJson } from '@/common/datasource';
import { Mutex } from '@/common/mutex';
import translate, { Translatable, } from '@/common/translate';
import { GamecoreParam } from './gamecore';
import { cleanupMarkup } from '@/common/common';

// RogueMiracleDisplay.json


// Rogue Buff

export interface RogueBuff
{
    MazeBuffID: number
    MazeBuffLevel: number
    RogueBuffType: number
    RogueBuffRarity: number
    RogueBuffTag: number
    ExtraEffectIDList: number[]
    AeonID?: number
    RogueVersion: number
    UnlockIDList: number[]
    IsShow:boolean
    ActivityModuleID?:number
    HandbookUnlockDesc:Translatable

    MazeBuff?:RogueMazeBuff
    BuffType?:RogueBuffType
    SearchKeywords: string[]
}

export interface RogueBuffRanks
{
    [key: number]: RogueBuff
}

export interface RogueBuffConfig
{
    [key: number]: RogueBuffRanks
}

// Rogue Maze Buff

export interface RogueMazeBuff
{
    ID: number
    BuffSeries: number
    BuffRarity: number
    Lv: number
    LvMax: number
    ModifierName: string // out of combat modifier?
    InBattleBindingType: string
    InBattleBindingKey: string // in combat modifier?
    ParamList: GamecoreParam[]
    BuffName: Translatable
    BuffDesc: Translatable
    BuffSimpleDesc: Translatable
    BuffDescBattle: Translatable
    BuffEffect:string // always empty
    MazeBuffType:string // always "Level"
}

export interface RogueMazeBuffRanks
{
    [key: number]: RogueMazeBuff
}

export interface RogueMazeBuffConfig
{
    [key: number]: RogueMazeBuffRanks
}

// Rogue Buff Type

export interface RogueBuffType
{
    RogueBuffType: number // the id
    RogueBuffTypeTextmapID: Translatable
    RogueBuffTypeTitle: Translatable
    RogueBuffTypeSubTitle: Translatable
    HintDesc: Translatable
}

export interface RogueBuffTypeConfig
{
    [key: number]: RogueBuffType
}

const rogueBuffConfigCache:{[commitId: string]: RogueBuffConfig} = {}
const rogueBuffConfigMutex = new Mutex()
export async function getRogueBuffs(commitId:string) : Promise<RogueBuffConfig>
{
    return rogueBuffConfigMutex.runExclusive(async () => 
    {
        let config = rogueBuffConfigCache[commitId]
        if (config == undefined)
        {
            const rogueBuffTypes = await retrieveJson('ExcelOutput/RogueBuffType.json', commitId, false) as RogueBuffTypeConfig
            for (const key in rogueBuffTypes)
            {
                const rogueBuffType = rogueBuffTypes[key]
                await translate(commitId, rogueBuffType.RogueBuffTypeTextmapID)
                await translate(commitId, rogueBuffType.RogueBuffTypeTitle)
                await translate(commitId, rogueBuffType.RogueBuffTypeSubTitle)
                await translate(commitId, rogueBuffType.HintDesc)
            }

            const rogueMazeBuffs = await retrieveJson('ExcelOutput/RogueMazeBuff.json', commitId, false) as RogueMazeBuffConfig
            for (const skillKey in rogueMazeBuffs)
            {
                const ranks = rogueMazeBuffs[skillKey]        
                for (const rankKey in ranks)
                {
                    const rogueMazeBuff = ranks[rankKey]
                    await translate(commitId, rogueMazeBuff.BuffName)
                    await translate(commitId, rogueMazeBuff.BuffDesc)
                    await translate(commitId, rogueMazeBuff.BuffSimpleDesc)
                    await translate(commitId, rogueMazeBuff.BuffDescBattle)

                    rogueMazeBuff.BuffName.Text = cleanupMarkup(rogueMazeBuff.BuffName.Text);
                }
            }

            const rogueBuffs = await retrieveJson('ExcelOutput/RogueBuff.json', commitId, false) as RogueBuffConfig
            for (const skillKey in rogueBuffs)
            {
                const ranks = rogueBuffs[skillKey]        
                for (const rankKey in ranks)
                {
                    const rogueBuff = ranks[rankKey]
                    //await translate(commitId, rogueBuff.HandbookUnlockDesc) // Always "Yet to obtain this Blessing"
                    rogueBuff.MazeBuff = rogueMazeBuffs[skillKey]?.[rankKey]
                    rogueBuff.BuffType = rogueBuffTypes[rogueBuff.RogueBuffType]
                    
                    rogueBuff.SearchKeywords = []
                    if (rogueBuff.MazeBuff)
                        rogueBuff.SearchKeywords.push(rogueBuff.MazeBuff.BuffName.Text.toLowerCase())
                    if (rogueBuff.BuffType)
                        rogueBuff.SearchKeywords.push(rogueBuff.BuffType.RogueBuffTypeTextmapID.Text.toLowerCase())
                }
            }

            config = rogueBuffConfigCache[commitId] = rogueBuffs
            console.log('cached rogue buff config for ' + commitId)
        }
        return config
    })
}

export async function getRogueBuff(commitId:string, rogueBuffId:number) : Promise<RogueBuffRanks>
{
    const ranks = (await getRogueBuffs(commitId))[rogueBuffId]
    return ranks
}