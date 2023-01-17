<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none">
    <path :fill="color" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "ChevronUpIcon",
  props: {
    color: {
      type: String,
      default: '#343434'
    },
    size: {
      type: Number,
      default: 24
    }
  },
})
</script>