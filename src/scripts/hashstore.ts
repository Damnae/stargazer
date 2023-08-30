import { reactive, } from 'vue'
import { getHash } from './translate'

const hashToName = reactive<{[key:number]:string}>({})
let dirty = false

export default function useHashStore() 
{
  function register(name:string) : void
  {
    const hash = getHash(name)
    if (hash in hashToName)
      return;

    hashToName[hash] = name
    dirty = true

    console.log(`registered ${hash} to ${name}`)
  }

  function translate(hash:number) : string | undefined
  {
    return hashToName[hash]
  }

  return { register, translate, }
}