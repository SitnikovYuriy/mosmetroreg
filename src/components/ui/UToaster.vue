<template>
  <teleport :to="target">
    <transition-group name="list" tag="div" class="u-toaster toast-container position-fixed top-0 end-0 p-3">
      <div v-for="toast in toasts" :key="toast" :class="`toast list-item align-items-center text-white bg-${toast.theme} border-0 show mb-0`">
        <div class="d-flex">
          <div class="toast-body">
            {{ toast.message }}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="removeToast(toast)"></button>
        </div>
        <div class="toast-bar" :style="`animation-duration: ${toast.duration}ms`"></div>
      </div>
    </transition-group>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';

enum ToastTheme {
  Primary = 'primary',
  Danger = 'danger',
  Warning = 'warning',
  Success = 'success',
}

interface IToast {
  theme: ToastTheme,
  message: string,
  duration: number,
}

const toasts: Ref<IToast[]> = ref([]);

const removeToast = (toast: IToast): void => {
  const index = toasts.value.indexOf(toast);
  if (index !== -1) {
    toasts.value.splice(index, 1);
  }
};

const makeToast = (theme: ToastTheme, message: string, duration = 5000): void => {
  const toast: IToast = { theme, message, duration };
  toasts.value.unshift(toast);
  setTimeout(() => removeToast(toast), duration);
};

export const toast = {
  info(message: string, duration?: number): void {
    makeToast(ToastTheme.Primary, message, duration);
  },
  error(message: string, duration?: number): void {
    makeToast(ToastTheme.Danger, message, duration);
  },
  warning(message: string, duration?: number): void {
    makeToast(ToastTheme.Warning, message, duration);
  },
  success(message: string, duration?: number): void {
    makeToast(ToastTheme.Success, message, duration);
  },
};

export default defineComponent({
  name: 'LToaster',
  props: {
    target: {
      type: String,
      default: 'body',
    },
  },
  setup() {
    return { toasts, removeToast };
  },
})
</script>

<style lang="scss" scoped>
.u-toaster {
  z-index: 2000;

  .toast {
    transition: 0.3s;
    opacity: 0.95;
    overflow: hidden;

    &:hover,
    &:active
    {
      opacity: 0.85;
      margin-left: -10px;
      margin-right: 10px;
    }
  }
  .toast + .toast {
    margin-top: 12px;
  }
  .toast-bar {
    top: auto;
    left: 0px;
    right: 0px;
    bottom: 0px;
    width: 0%;
    height: 4px;
    margin-top: -4px;
    background-color: black;
    opacity: 0.25;
    animation-name: progress;
    animation-timing-function: linear;
  }
  .toast-body {
    font-size: 16px;
  }
  @keyframes progress {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }
}
</style>