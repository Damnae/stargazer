import { retrieveJson } from '@/common/datasource';
import { Mutex } from '@/common/mutex';
import { translateFromKey } from '@/common/translate';
import { Creature } from './creature';
import { GamecoreParam } from './gamecore';

export interface BattleEvent extends Creature
{
    BattleEventID:number
    Team:string
    EventSubType:string
    BattleEventName:string
    DescrptionText:string
    AbilityList: string[]
    OverrideProperty: 
    [
        {
            PropertyType:string 
            Value:
            {
                Value:number
            }
        }
    ]
    HardLevel:boolean
    EliteGroup:boolean
    Speed: 
    {
        Value: number
    }
    ParamList: GamecoreParam[]

    Data?:BattleEventData
    SearchKeywords: string[]
}

export interface BattleEventConfig
{
    [key: string]: BattleEvent
}


export interface BattleEventData
{
    BattleEventID:number
    Config:string
    Prefab:string
    LevelAreaPrefab:string
    BasePoint:string
    SkillIDList:number[]
}

export interface BattleEventDataConfig
{
    [key: string]: BattleEventData
}

const battleEventConfigCache:{[commitId: string]: BattleEventConfig} = {}
const battleEventConfigMutex = new Mutex()
export async function getBattleEvents(commitId:string) : Promise<BattleEventConfig>
{
    return battleEventConfigMutex.runExclusive(async () => 
    {
        let config = battleEventConfigCache[commitId]
        if (config == undefined)
        {
            const battleData = await retrieveJson('ExcelOutput/BattleEventData.json', commitId, false) as BattleEventDataConfig
            const battleEvents = await retrieveJson('ExcelOutput/BattleEventConfig.json', commitId, false) as BattleEventConfig
            for (const key in battleEvents)
            {
                const battleEvent = battleEvents[key]
                battleEvent.BattleEventName = await translateFromKey(commitId, battleEvent.BattleEventName) ?? battleEvent.BattleEventName
                battleEvent.DescrptionText = await translateFromKey(commitId, battleEvent.DescrptionText) ?? battleEvent.DescrptionText
                battleEvent.Data = battleData[key]

                battleEvent.SearchKeywords = []
                battleEvent.SearchKeywords.push(battleEvent.BattleEventName.toLowerCase())
                for (const ability of battleEvent.AbilityList)
                    battleEvent.SearchKeywords.push(ability.toLowerCase())
            }
    
            config = battleEventConfigCache[commitId] = battleEvents
            console.log('cached battle event config for ' + commitId)
        }
        return config
    })
}

export async function getBattleEvent(commitId:string, battleEventId:number) : Promise<BattleEvent>
{
    return (await getBattleEvents(commitId))[battleEventId]
}