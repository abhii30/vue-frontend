<script setup>
import { ref, onMounted, computed } from 'vue'
import {
  PlayIcon,
  PauseIcon,
  DownloadIcon,
  FilterIcon,
  TurtleIcon,
  RabbitIcon,
  SpeakerIcon,
  SpeakerMuteIcon
} from '@talocityui/icons'
import audio from '../../../src/assets/audio.mp3'

const audioPlayer = ref(null)
const showFilters = ref(false)
const isPlaying = ref(false)
const audioSource = audio
const progressWidth = ref('0%')
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(1)
const selectedSpeed = ref(1)

const togglePlayPause = () => {
  if (isPlaying.value) {
    audioPlayer.value.pause()
  } else {
    audioPlayer.value.play()
  }
  isPlaying.value = !isPlaying.value
}

const toggleDropdown = () => {
  showFilters.value = !showFilters.value
}

const onTimeUpdate = () => {
  const progress = (audioPlayer.value.currentTime / audioPlayer.value.duration) * 100
  progressWidth.value = `${progress}%`
  currentTime.value = audioPlayer.value.currentTime
  duration.value = audioPlayer.value.duration
}
const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, '0')
  return `${minutes}:${seconds}`
}

const currentTimeFormatted = computed(() => formatTime(currentTime.value))
const durationFormatted = computed(() => formatTime(duration.value))

// seek audio to a specific time
const seekAudio = (event) => {
  const progressBar = event.currentTarget
  const rect = progressBar.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const progressBarWidth = rect.width
  const progressPercentage = clickX / progressBarWidth
  const seekTime = audioPlayer.value.duration * progressPercentage
  audioPlayer.value.currentTime = seekTime
}

//update volume
const updateVolume = () => {
  audioPlayer.value.volume = volume.value
}

// playback speed
const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]
const updatePlaybackSpeed = () => {
  audioPlayer.value.playbackRate = selectedSpeed.value
}

//download audio
const downloadAudio = () => {
  const link = document.createElement('a')
  link.href = audioSource
  link.download = 'audio.mp3'
  link.click()
}

onMounted(() => {
  audioPlayer.value.addEventListener('timeupdate', onTimeUpdate)
})
</script>

<template>
  <div
    class="w-max max-w-xs bg-[#0013250A] h-9 px-3 rounded-lg flex flex-row items-center gap-3"
  >
    <PauseIcon class="cursor-pointer" v-if="isPlaying" @click="togglePlayPause" />
    <PlayIcon class="cursor-pointer" v-else @click="togglePlayPause" />
    <div class="text-xs text-secondary-color w-max">
      {{ currentTimeFormatted }}/ {{ durationFormatted }}
    </div>
    <audio ref="audioPlayer" :src="audioSource"></audio>
    <div
      class="h-[2px] rounded-[1px] bg-disabled-color w-32 cursor-pointer"
      @click="seekAudio($event)"
    >
      <div class="h-full rounded-[1px] bg-base-color" :style="{ width: progressWidth }"></div>
    </div>

    <div class="dropdown relative">
      <div id="dropdown" class="cursor-pointer flex items-center" @click="toggleDropdown">
        <FilterIcon class="cursor-pointer" :color="showFilters ? '#10CCCB' : '#001325'" />
      </div>
      <div v-if="showFilters" class="drop-down flex flex-col gap-3">
        <div class="playback-speed">
          <span class="text-xs text-secondary-color">Playback Speed</span>
          <div class="flex flex-row items-center gap-2">
            <TurtleIcon />
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.25"
              v-model="selectedSpeed"
              @input="updatePlaybackSpeed"
            />
            <RabbitIcon />
          </div>
          <!-- <div class="markers">
      <span class="marker" v-for="speed in playbackSpeeds" :key="speed">
        <span class="marker-line"></span>
        {{ speed }}
      </span>
    </div> -->
        </div>
        <div class="volume-slider">
          <span class="text-xs text-secondary-color">Volume Control</span>
          <div class="flex flex-row items-center gap-2">
            <SpeakerMuteIcon />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              v-model="volume"
              @input="updateVolume"
            />
            <SpeakerIcon />
          </div>
        </div>
      </div>
    </div>
    <DownloadIcon class="cursor-pointer" @click="downloadAudio" />
  </div>
</template>

<style scoped>
.dropdown {
  display: flex;
  align-items: center;
}
.dropdown .drop-down {
  position: absolute;
  z-index: 9999;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  list-style: none;
  padding: 0px 12px 16px 12px;
  margin: 10px 0;
  border: 1px solid rgba(0, 19, 37, 0.08);
  box-shadow: 0px 2px 4px -2px rgba(17, 19, 20, 0.12), 0px 2px 8px rgba(17, 19, 20, 0.08);
  border-radius: 8px;
  width: max-content;
}

/* Customize the volume slider appearance */
input[type='range'] {
  -webkit-appearance: none;
  width: 96px;
  height: 2px;
  background-color: #00132529;
  outline: none;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 10px;
  height: 10px;
  margin-top: -3.5px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid #10cccb;
  cursor: pointer;
  /* transform: translateX(50%); */
}

input[type='range']::-moz-range-thumb {
  width: 10px;
  height: 10px;
  margin-top: -3.5px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid #10cccb;
  cursor: pointer;
}

/* Customize the volume slider track color */
input[type='range']::-webkit-slider-runnable-track {
  height: 2px;
  background-color: #00132529;
}

input[type='range']::-moz-range-track {
  height: 2px;
  background-color: #00132529;
}
.playback-speed {
  position: relative;
  margin-top: 10px;
}

.markers {
  display: flex;
  justify-content: space-between;
}

.marker {
  top: -17px;
  font-size: 12px;
  color: #888;
  transform: translateX(-50%);
  position: relative;
  display: inline-block;
}
.marker-line {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: 100%;
  background-color: #888;
}
</style>