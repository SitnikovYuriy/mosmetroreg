<template>
  <div class="l-spinner">
    <slot></slot>
    <div v-if="overlay && visible" class="l-spinner__overlay"></div>
    <div v-if="visible" class="l-spinner__wrapper">
      <div class="spinner-border text-primary"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'LSpinner',
  props: {
    visible: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    overlay: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
})
</script>

<style lang="scss" scoped>
.l-spinner {
  position: relative;
  
  &__wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 500;
  }

  &__overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #FFF;
    opacity: 0.7;
    z-index: 500;
  }
}
</style>