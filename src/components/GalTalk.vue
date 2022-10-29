<script setup>
import { computed, watch } from 'vue'
import { setting, setSettingShow, data } from '../store'
import { Setting } from '@element-plus/icons-vue'

const bgColor = computed(() => setting.bgColor)
const fontColor = computed(() => setting.fontColor)
const font = computed(() => setting.font)

watch(font, () => {
  console.log(font.value)
})

const next = () => {
  if (data.index + 1 === data.list.length) {
    data.index = 0
  } else {
    data.index += 1
  }
  if (!data.images[data.list[data.index].type]) {
    data.images[data.list[data.index].type] = true
  }
}

data.images[data.list[0].type] = true
</script>

<template>
  <div class="talk" @click="next">
    <img class="bg" :src="setting.bg" />
    <div class="image">
      <div class="left">
        <transition name="slide-up">
          <img
            v-show="data.images[0]"
            :class="{ lowlight: data.list[data.index].type == 1 }"
            class="img"
            :src="setting.character_0"
          />
        </transition>
      </div>
      <div class="right">
        <transition name="slide-up">
          <img
            v-show="data.images[1]"
            :class="{ lowlight: data.list[data.index].type == 0 }"
            class="img"
            :src="setting.character_1"
          />
        </transition>
      </div>
    </div>
    <div class="message">
      <div class="name-box" v-show="data.list[data.index].name">
        {{ data.list[data.index].name }}
      </div>
      <div class="message-bg">
        <div class="text">
          {{ data.list[data.index].text }}
        </div>
      </div>
      <div class="btn-list">
        <el-icon class="btn" :size="36" @click.stop="setSettingShow(true)">
          <Setting />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.talk {
  position: relative;
  width: 100%;
  height: 100%;
  user-select: none;
  font-family: v-bind(font);

  img {
    -webkit-user-drag: none;
  }

  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .image {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;

    & > * {
      flex: 0 0 50%;
      display: flex;
      justify-content: space-around;
      align-items: flex-end;

      .img {
        max-height: 100%;
        transition: all 0.2s;
      }
    }
  }

  .message {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    color: v-bind(fontColor);

    .message-bg {
      height: 100%;
      width: 90%;
      background: v-bind(bgColor);
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;

      .text {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        font-size: 24px;
        border-radius: 10px;
        padding: 15px 20px;
      }
    }

    .name-box {
      position: absolute;
      left: 5%;
      top: -60px;
      font-size: 30px;
      border-radius: 10px;
      padding: 8px 20px;
      background: v-bind(bgColor);
    }

    &:hover {
      .btn-list {
        opacity: 1;
      }
    }

    .btn-list {
      position: absolute;
      right: 5%;
      top: -50px;
      border-radius: 10px;
      padding: 0 10px;
      background: v-bind(bgColor);
      opacity: 0;
      transition: opacity 0.2s;

      .btn {
        cursor: pointer;
      }
    }
  }
}

.lowlight {
  filter: brightness(0.5);
  transform: scale(0.9);
  transform-origin: bottom;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s;
}

.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
