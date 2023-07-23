<script setup>

defineProps({
  headers: {
    type: Array,
    required: true
  },
  batchDetails: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <v-table class="font-Inter text-sm font-medium px-6 border rounded-lg">
    <thead>
      <tr>
        <th class="table-head" v-for="(header, index) in headers" :key="'header-' + index">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(batchDetail, index) in batchDetails" :key="'batchDetail-' + index"  >
        <td v-for="(headerI, index) in headers" :key="'header-' + index" >
          <template v-if="headerI !== 'Action'">
            {{ batchDetail[headerI] }}
          </template>
          <template v-else>
            <button class="text-talocity-blue-color font-semibold">
            {{ batchDetail[headerI] }}
          </button>
          </template>
        </td>
      </tr>
    </tbody></v-table
  >
</template>

<style scoped>
.table-head {
  color: #001325eb !important;
  width: 25%;
}
</style>