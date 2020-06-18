<template>
  <el-radio-group
    :value="value"
    :disabled="disabled"
    @input="handleInput"
    @change="handleChange"
  >
    <el-radio
      v-for="item in options"
      :key="item.dictId"
      :label="item.dictId"
    >
      {{ item.dictName }}
    </el-radio>
  </el-radio-group>
</template>
<script>
import { dict } from '@/mixins/dict'
export default {
  name: 'DictRadio',
  mixins: [dict],
  props: {
    dictTypeId: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
