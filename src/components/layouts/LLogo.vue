<template>
  <router-link to="/" class="l-logo d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
    <img class="l-logo__img" src="@/assets/images/metro.svg">
    <slot></slot>
  </router-link>
</template>

<style lang="scss" scoped>
.l-logo {
  &__img {
    height: 40px;
  }
}
</style>