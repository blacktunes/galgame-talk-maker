<script setup>
import { ref } from 'vue'
import { setting, setSettingShow, reset } from '../store'
import { Refresh } from '@element-plus/icons-vue'

const changeImg = type => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = () => {
    if (input.files[0]) {
      const file = new FileReader()
      file.readAsDataURL(input.files[0])
      file.onload = e => {
        switch (type) {
          case 0:
            setting.character_0 = e.target.result
            break
          case 1:
            setting.character_1 = e.target.result
            break
          default:
            setting.bg = e.target.result
            break
        }
      }
    }
  }
  input.click()
}

const onAdd = () => {
  setting.list.push({
    type: 0,
    name: '',
    text: ''
  })
}

const deleteRow = index => {
  setting.list.splice(index, 1)
}

const fonts = ref(new Set(['default']))

try {
  window.queryLocalFonts().then(data => {
    data.forEach(font => {
      fonts.value.add(font.family)
    })
  })
} catch (err) {
  console.error('字体加载失败')
}
</script>

<template>
  <div class="setting" v-show="setting.show">
    <div class="bg">
      <el-button-group>
        <el-button @click="changeImg(-1)">更换背景</el-button>
        <el-button type="warning" :icon="Refresh" @click="reset('bg')" />
      </el-button-group>
      <el-button-group>
        <el-button @click="changeImg(0)">更换左立绘</el-button>
        <el-button
          type="warning"
          :icon="Refresh"
          @click="reset('character_0')"
        />
      </el-button-group>
      <el-button-group>
        <el-button @click="changeImg(1)">更换右立绘</el-button>
        <el-button
          type="warning"
          :icon="Refresh"
          @click="reset('character_1')"
        />
      </el-button-group>
      <el-color-picker v-model="setting.bgColor" show-alpha />
      <el-color-picker v-model="setting.fontColor" />
      <el-select v-model="setting.font" placeholder="Select" size="large">
        <el-option
          v-for="item in fonts"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-button @click="setSettingShow(false)">关闭</el-button>
      <el-table :data="setting.list" style="width: 100%" max-height="600">
        <el-table-column fixed="left" label="index" width="120">
          <template #default="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column fixed prop="type" label="立绘" width="150">
          <template #default="scope">
            <el-radio-group v-model="setting.list[scope.$index].type">
              <el-radio :label="0">左</el-radio>
              <el-radio :label="1">右</el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column fixed prop="name" label="name" width="150">
          <template #default="scope">
            <el-input v-model="setting.list[scope.$index].name" />
          </template>
        </el-table-column>
        <el-table-column fixed prop="text" label="text">
          <template #default="scope">
            <el-input v-model="setting.list[scope.$index].text" />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="" width="120">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click.prevent="deleteRow(scope.$index)"
            >
              Remove
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="mt-4" style="width: 100%" @click="onAdd">Add</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.setting {
  z-index: 9;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .bg {
    width: 95%;
    height: 95%;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 15px;
  }
}
</style>
