<script setup>
import { ref, computed } from 'vue'
import GalTalk from './components/GalTalk.vue'
import SettingBox from './components/SettingBox.vue'

const width = 1280
const height = 720
const scale = ref(1)
const realWidth = computed(() => `${width * scale.value}px`)
const realHeight = computed(() => `${height * scale.value}px`)

const h = ref(1)
const v = ref(1)
const windowWidth = ref(width)

const setSize = () => {
  windowWidth.value = window.innerWidth
  h.value = window.innerWidth / width
  v.value = window.innerHeight / height
  scale.value = Math.min(h.value, v.value)
}
setSize()

window.onresize = () => {
  setSize()
}
</script>

<template>
  <main class="main">
    <div
      class="box"
      :style="{
        transform: `scale(${scale})`,
        width: `${width}px`,
        height: `${height}px`
      }"
    >
      <GalTalk />
      <SettingBox />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.main {
  overflow: hidden;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: v-bind(realWidth);
  height: v-bind(realHeight);

  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    transform-origin: left top;
  }
}
</style>
