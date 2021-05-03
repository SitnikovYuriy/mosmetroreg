<template>
  <ul class="nav nav-pills">
    <li v-for="route in routes" class="nav-item" :key="route.path">
      <router-link class="nav-link" :to="route.path">{{ route.name }}</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { RouteRecordRaw } from 'vue-router'

export default defineComponent({
  name: 'LNavPills',
  props: {
    routes: {
      type: Array as PropType<RouteRecordRaw[]>,
      requied: true,
    },
  },
})
</script>