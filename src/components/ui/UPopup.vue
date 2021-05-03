<template>
  <teleport :to="target">
    <div v-if="display" class="u-popup modal fade" :class="{ 'show': modal, 'd-block': block }" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content overflow-hidden">
          <slot>
            <div class="modal-header">
              <button type="button" class="btn-close" @click="$emit('close')"></button>
            </div>
            <div class="modal-body">
              <p class="text-muted">Содержимое не определено</p>
            </div>
          </slot>
        </div>
      </div>
    </div>
    <div v-if="display" class="modal-backdrop fade" :class="{ show: backdrop }"></div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch, PropType, onUnmounted } from 'vue';

export default defineComponent({
  name: 'LPopup',
  emits: ['close'],
  props: {
    target: {
      type: String as PropType<string>,
      default: 'body',
    },
    visible: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
  setup(props) {
    const state = reactive({
      display: false,
      modal: false,
      block: false,
      backdrop: false,
    })

    const show = () => {
      document.body.classList.add('modal-open');
      state.display = true;
      setTimeout(() => {
        state.backdrop = true;
        state.block = true;
      }, 150);
      setTimeout(() => {
        state.modal = true;
      }, 300);
    }

    const hide = () => {
      state.modal = false;
      setTimeout(() => {
        state.block = false;
        state.backdrop = false;
      }, 150);
      setTimeout(() => {
        state.display = false;
        document.body.classList.remove('modal-open');
      }, 300);
    }

    watch(() => props.visible, (newValue: boolean) => {
      newValue ? show() : hide();
    }, { immediate: true });

    onUnmounted(() => {
      document.body.classList.remove('modal-open');
    });

    return { ...toRefs(state) };
  },
})
</script>