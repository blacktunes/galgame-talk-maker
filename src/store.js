import { reactive } from 'vue'
import defaultBg from './assets/教室.jpg'
import defaultCharacter_0 from './assets/老师.png'
import defaultCharacter_1 from './assets/学姐.png'

const defaultSetting = {
  bg: defaultBg,
  character_0: defaultCharacter_0,
  character_1: defaultCharacter_1,
  bgColor: 'rgba(255, 192, 203, 0.7)',
  fontColor: '#666666',
  font: 'default'
}

export const reset = key => {
  setting[key] = defaultSetting[key]
}

export const setting = reactive({
  show: false,
  bg: defaultBg,
  character_0: defaultSetting.character_0,
  character_1: defaultSetting.character_1,
  bgColor: defaultSetting.bgColor,
  fontColor: defaultSetting.fontColor,
  font: defaultSetting.font,
  list: []
})

export const setSettingShow = flag => {
  if (flag) {
    setting.list = JSON.parse(JSON.stringify(data.list))
    setting.show = true
  } else {
    data.index = 0
    data.list = JSON.parse(JSON.stringify(setting.list))
    setting.show = false
    const first = data.list[0].type
    data.images[first] = true
    data.images[first === 0 ? 1 : 0] = false
  }
}

export const data = reactive({
  images: [false, false],
  index: 0,
  list: [
    { type: 1, name: 'Nya', text: 'Nyaaaaaaaaaaaaaaaaaaaaaa' },
    { type: 0, name: '喵喵喵', text: '喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵' }
  ]
})
