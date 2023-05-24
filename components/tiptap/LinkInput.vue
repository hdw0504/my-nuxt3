<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

const emit = defineEmits<{
  (event: 'select', elStr: string): void
}>()

const formRef = ref<FormInstance>()
const formModel = ref({
  text: '',
  link: '',
})

const rules = ref<FormRules>({
  text: [{ required: true, message: 'Please input link text', trigger: 'blur' }],
  link: [
    { required: true, message: 'Please input link address', trigger: 'blur' },
    { validator: validateLink, trigger: 'blur' },
  ],
})

function validateLink(rule: any, value: any, callback: any) {
//   if (value === '')
//     callback(new Error('Please input link address'))

  if (!/^https?:\/\//.test(value))
    callback(new Error('Link address must start with \'https://\''))

  callback()
}

async function checkAndInsert() {
  if (!formRef.value)
    return
  const isValid = await formRef.value.validate()
  if (!isValid)
    return

  emit('select', ` <a href="${formModel.value.link}" target="_blank">${formModel.value.text}</a> `)
  resetFrom()
}

function resetFrom() {
  if (!formRef.value)
    return
  formRef.value.resetFields()
}
</script>

<template>
  <el-popover :width="376" trigger="click">
    <template #reference>
      <div cursor-pointer i-ep:link />
    </template>
    <template #default>
      <el-form ref="formRef" :model="formModel" :rules="rules">
        <el-form-item label="Text" prop="text">
          <el-input v-model="formModel.text" />
        </el-form-item>
        <el-form-item label="Link" prop="link">
          <el-input v-model="formModel.link" />
        </el-form-item>
      </el-form>
      <div text-right>
        <el-button type="warning" @click="checkAndInsert">
          insert
        </el-button>
      </div>
    </template>
  </el-popover>
</template>

<style lang="scss" scoped>

</style>
