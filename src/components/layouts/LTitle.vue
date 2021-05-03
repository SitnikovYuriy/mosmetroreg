<template>
  <span class="ms-2 fs-4">{{ title }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LTitle',
  setup() {
    return {
      title: process.env.VUE_APP_TITLE,
    };
  },
})
</script>