<script setup>
import { ref, computed } from 'vue'
import { colors, helpers } from '@talocityui/theme'
const isChecked = ref(props.isChecked)
const props = defineProps({
  isChecked: {
    type: Boolean,
    default: false
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  disabledColor: {
    type: String,
    default: colors['talocity-blue-color']
  },
  color: {
    type: String,
    default: colors['talocity-blue-color']
  }
})
const backgroundColor = computed(() => helpers.fadeColor(props.color, '0.16'))
</script>

<template>
  <div>
    <label class="switch">
      <input
        type="checkbox"
        v-model="isChecked"
        @change="$emit('update:isChecked', isChecked)"
        :disabled="isDisabled"
      />
      <span class="slider">
        <svg
          v-if="isChecked"
          class="tick-mark"
          :fill="color"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path
            d="m382-362.131 334.696-334.695Q730.37-710.5 749.141-710.5q18.772 0 32.446 13.674t13.674 32.446q0 18.771-13.674 32.445L414.065-264.413Q400.391-250.739 382-250.739t-32.065-13.674L178.413-435.935q-13.674-13.674-13.294-32.445.381-18.772 14.055-32.446T211.62-514.5q18.771 0 32.445 13.674L382-362.131Z"
          /></svg
      ></span>
    </label>
  </div>
</template>

<style>
.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 28px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f3f4f5;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 20px;
  outline: 1.5px solid rgba(0, 19, 37, 0.16);
}

.slider:before {
  position: absolute;
  content: '';
  height: 22px;
  width: 22px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
  box-shadow: 0px 2px 3px rgba(0, 19, 37, 0.16);
}

input:hover + .slider {
  outline-color: v-bind(color);
}
input:hover + .slider:before {
  outline: 9px solid v-bind(backgroundColor);
}
input:active + .slider:before {
  outline: 5px solid v-bind(backgroundColor);
}
input:checked + .slider {
  background-color: v-bind(color);
  outline-color: v-bind(color);
}

input:checked + .slider:before {
  -webkit-transform: translateX(16px);
  -ms-transform: translateX(16px);
  transform: translateX(16px);
}
input:disabled:hover + .slider {
  cursor: not-allowed;
  outline: 1.5px solid rgba(0, 19, 37, 0.16);
}
input:disabled + .slider:before {
  box-shadow: none;
  outline: none;
}

input:disabled:checked + .slider {
  cursor: not-allowed;
  background-color: v-bind(disabledColor);
  outline: none;
}

input:hover:disabled:checked + .slider:before {
  box-shadow: none;
  outline: none;
}
.tick-mark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  -webkit-transition: 0.8s;
  transition: 0.8s;
}
</style>
