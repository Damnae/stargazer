import { reactive, watch, } from 'vue'

const settings = reactive<{[key:string]:any}>({
  token: '',
  customRepo: '',
  useCustomRepo: false,
  includeWhiteBox: false,
})

const sessionSettings = reactive<{[key:string]:any}>({
})

watch(settings, () => localStorage.setItem("settings", JSON.stringify(settings)))
{
  const settingsData = localStorage.getItem("settings")
  if (settingsData) Object.assign(settings, JSON.parse(settingsData))

  settings.includeWhiteBox = import.meta.env.DEV || settings.useCustomRepo
}

export default function useSettings()
{
  return [settings, sessionSettings]
}