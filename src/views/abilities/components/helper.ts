import { Character } from "@/sources/character"
import { HashValues } from "@/sources/gamecore"
import { CreatureSkill } from "@/sources/skill"

export function buildAbilityHashValues(character?:Character, skills?:CreatureSkill[]) : HashValues
{
  const values:HashValues = {}
  if (character?.SkillAbilityList && skills)
    for (const skillEntry of character.SkillAbilityList)
    {
      const skill = findSkill(skillEntry.Skill, skills)
      if (!skill?.ShowStanceList)
        continue

      for (const ability of skillEntry.AbilityList)
      {
        if (ability.includes('Camera') || ability.includes('EnterReady'))
            continue

        values[ability] = {}
        values[ability][1659254037] = skill.ShowStanceList[0].Value   // Single
        values[ability][1182064154] = skill.ShowStanceList[1].Value   // All
        values[ability][-1315627076] = skill.ShowStanceList[2].Value  // Adjacent
      }
    }
  return values
}

function findSkill(skillId:string, skills:CreatureSkill[]) : CreatureSkill | undefined
{
  for (const skill of skills)
    if (skill.SkillTriggerKey == skillId)
      return skill
}