<script>
import { InputDropdown, InputSearch, InputMulti, InputRadio } from '../components/sfc'
import Content from '../components/sfc/Choices.json'
export default {
  components: {
    InputSearch,
    InputDropdown,
    InputMulti,
    InputRadio
  },
  data() {
    return { job: '', department: '', industry: '', location: '', Content: Content }
  }
}
</script>

<template>
  <div class="my-10 mx-5 flex flex-col gap-6">
    <InputSearch placeholder="Search by job" label="Job Title" v-model="job" />
    <InputDropdown
      label="Type of Function/ Department"
      :choices="Content.choices"
    />
    <InputDropdown label="Type of Industry" important="false" :choices="Content.choices" />
    <InputMulti
      label="Office Location"
      placeholder="Where are you hiring for this role?"
      :options="Content.data"
    />
    <InputRadio label="Job Visibility" :options="Content.visibility" v-model="selectedOption" />
    <InputRadio
      label="What's your remote policy for this job?"
      :options="Content.location"
      v-model="selectedOption"
    />
  </div>
</template>