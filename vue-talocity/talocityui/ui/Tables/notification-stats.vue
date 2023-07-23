<script setup>
import { ref } from 'vue'
const headers = ref(['Notification Type', 'Sent', 'Delivered'])
const notifications = ref([
  {
    type: 'Text',
    sent: 10,
    recieved: 10
  },
  {
    type: 'IVR',
    sent: 10,
    recieved: 10
  },
  {
    type: 'Email',
    sent: 1200,
    recieved: 800
  },

  {
    type: 'Whatsapp',
    sent: 10,
    recieved: 10
  }
])
</script>

<template>
  <div class="grid grid-cols-3 font-Inter text-sm font-normal">
    <div v-for="header in headers" :key="header">
      {{ header }}
    </div>
    <div
      v-for="(notification, index) in notifications"
      :key="'notification-' + index"
      class="grid grid-cols-3"
    >
      <td class="py-2">{{ notification.type }}</td>
      <td class="py-2">{{ notification.sent }}</td>
      <td class="py-2">{{ notification.recieved }}</td>
    </div>
  </div>
</template>

<style scoped>
.custom-hr {
  border: none;
  height: 2px;
  background-color: #000;
  margin: 8px -8px;
  width: 100%;
}
.v-table tbody tr:not(:last-child) {
  border-bottom: none !important;
}
</style>