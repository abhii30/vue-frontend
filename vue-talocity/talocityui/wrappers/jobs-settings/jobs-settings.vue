<script setup>
import { ref, watch } from 'vue'
import { Buttons } from '@talocityui/ui'
import { LockIcon } from '@talocityui/icons'

const props = defineProps({
  title: {
    type: String,
    required: true,
    default: ''
  },
  enable: {
    type: Boolean,
    default: false
  },
  mandatory: {
    type: Boolean,
    default: false
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  sources: {
    type: String,
    default: ''
  },
  other: {
    type: Boolean,
    default: false
  },
  bgColor: {
    type: String
  },
  show: {
    type: Boolean,
    default: false
  }
})
const enable = ref(props.enable)
const mandatory = ref(props.mandatory)
const show = ref(props.show)
const emit = defineEmits(['update:enable', 'update:mandatory'], ['update:show'])
watch([enable, mandatory], () => {
  emit('update:enable', enable.value)
  emit('update:mandatory', mandatory.value)
})
const fieldPopup = () => {
  if (props.isDisabled === true) {
    emit('update:show', true)
  }
}
</script>

<template>
  <tr class="h-[72px]">
    <td>{{ title }}</td>
    <td>
      <Buttons.ToggleSwitch
        v-model:isChecked="enable"
        :isDisabled="isDisabled"
        :color="bgColor"
        :disabledColor="bgColor"
        @click="fieldPopup()"
      />
    </td>
    <td v-if="enable">
      <Buttons.ToggleSwitch
        v-model:isChecked="mandatory"
        :isDisabled="isDisabled"
        :color="bgColor"
        :disabledColor="bgColor"
        @click="fieldPopup()"
      />
    </td>
    <td v-else class="text-disabled-color">N/A</td>
    <td v-if="enable">
      <slot v-if="other" name="component"></slot>
      <div v-else>{{ sources }}</div>
    </td>
    <td v-else class="text-disabled-color">N/A</td>
    <td v-if="isDisabled" class="w-1/7"><LockIcon /></td>
    <td v-else></td>
  </tr>
</template>
