<script setup>
import { ref, onMounted } from 'vue'
import { Buttons } from '@talocityui/ui'
import { MailIcon, DeleteIcon, EditIcon } from '@talocityui/icons'

defineProps({
  profile: {
    type: Object,
    default: () => {}
  }
})
</script>

<template>
  <tr>
    <td>{{ profile.name }}</td>
    <td class="text-center">{{ profile.jobsHandled }}</td>
    <td>{{ profile.addedOn }}</td>
    <td>{{ profile.addedBy }}</td>
    <td class="flex items-center gap-6 justify-center">
      <button @click="$emit('action-mail')"><MailIcon /></button>
      <button @click="$emit('action-edit')"><EditIcon /></button>
      <button @click="$emit('action-delete')"><DeleteIcon /></button>
    </td>
  </tr>
</template>

<style scoped></style>
