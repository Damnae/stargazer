import { retrieveJson } from '@/common/datasource';
import { Monster } from './monster';
import { GamecoreTask } from './gamecore';

export interface AIVariable
{
    $type:string
    Value:string
    Name:string
}

export interface CharacterAI
{
    AIName: string
    VariableList: AIVariable[]
    DecisionList: GamecoreTask[]
}

export async function getCharacterAIByMonster(commitId:string, monster:Monster) : Promise<CharacterAI>
{
    const path = monster.OverrideAIPath.length > 0 ? monster.OverrideAIPath : monster.MonsterTemplate.AIPath
    return getCharacterAI(commitId, path)
}

async function getCharacterAI(commitId:string, path:string) : Promise<CharacterAI>
{
    const result = await retrieveJson(path, commitId, false) as CharacterAI
    return result
}