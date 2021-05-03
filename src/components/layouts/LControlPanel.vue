<template>
  <div class="l-control-panel">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.l-control-panel {
   :deep(button) {
    background-color: transparent;
    border: none;
    color: #6c757d;
    transition: color 0.2s ease;
    
    &:hover:not(:active) {
      color: #000;
    }
  }
}
</style>