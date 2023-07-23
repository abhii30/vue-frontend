<script setup>
  import { Inputs } from "@talocityui/ui";
  import { JobsWrapper } from "@talocityui/wrappers";
  const items = [1,2,34,4,43,1,1,1,1,1,1,1]
</script>

<template>
  <div class="flex items-center justify-center h-screen w-screen flex-col">
    <div class="w-1/2">
      <Inputs.Select :items="items" />
    </div>
  </div>
</template>
