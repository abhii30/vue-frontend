<script setup>
    import {defineProps} from 'vue';
    const props = defineProps({
        label:String,
        id:String
    })
    console.log(props.label)
</script>
<template>
  <div class="flex justify-center items-center">
    <input type="checkbox" :id="id" v-model="isChecked" class="my-checkbox" />
    <label :for="id">{{label}}</label>
  </div>
</template>
<style>
.my-checkbox {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 20px;
  height: 20px;
  background-color: #FFFFFF;
  border: 1.5px solid rgba(0, 19, 37, 0.16);
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}
.my-checkbox:checked::before {
  content: '\2714';
  color: white;
  display: block;
  width: 100%;
  height: 100%;
  background-color: rgba(16, 204, 203, 1);
  text-align: center;
  font-size: 18px;
  line-height: 20px;
}
</style>