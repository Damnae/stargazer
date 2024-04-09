import { reactive, } from 'vue'

const navigationState = reactive<{[key:string]:any}>({
  changeTab: 'Files',
  changeContext: 'Avatars',
})

export default function useNavigationState()
{
  return navigationState
}