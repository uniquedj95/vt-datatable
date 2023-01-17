<script lang="ts">
import { computed, defineComponent } from 'vue'
import ChevronUpIcon from './ChevronUpIcon.vue'

export default defineComponent({
  components: { ChevronUpIcon },
  name: "ChevronDownIcon",
  props: {
    color:  String,
    size: Number,
  },
})
</script>

<template>
  <chevron-up-icon :size="size" :color="color" class="rotate-180" />
</template>