<template>
  <span class="mb-0 text-muted">© {{ year }} {{ title }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LCopyright',
  setup() {
    return {
      title: process.env.VUE_APP_TITLE,
      year: new Date().getFullYear(),
    };
  },
})
</script>