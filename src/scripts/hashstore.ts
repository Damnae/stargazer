import { reactive, } from 'vue'
import { getHash } from './translate'

const hashToName = reactive<{[key:number]:string}>({})

export default function useHashStore() 
{
  function register(name:string) : void
  {
    const hash = getHash(name)
    hashToName[hash] = name
    console.log(`registered ${hash} to ${name}`)
  }

  function translate(hash:number) : string |undefined
  {
    return hashToName[hash]
  }

  return { register, translate, }
}