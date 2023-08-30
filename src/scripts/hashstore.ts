import { reactive, } from 'vue'
import { getHash } from './translate'

const hashToName = reactive<{[key:number]:string}>({})
let dirty = false

export default function useHashStore() 
{
  function register(name:string, autoCommit:boolean) : void
  {
    const hash = getHash(name)
    if (hash in hashToName)
      return;

    //console.log(`registered ${hash} to ${name}`)

    hashToName[hash] = name
    dirty = true

    if (autoCommit)
      commit()
  }

  function translate(hash:number) : string | undefined
  {
    return hashToName[hash]
  }

  function commit()
  {
    if (dirty)
    {
      dirty = false

    }
  }

  return { register, translate, commit, }
}