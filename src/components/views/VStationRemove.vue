<template>
  <div class="v-station-remove">
    <LSpinner :visible="waiting" :overlay="true">
      <div class="modal-header">
        <h5 class="modal-title">Удаление станции метро</h5>
        <button type="button" class="btn-close" @click="$emit('close')"></button>
      </div>
      <div class="modal-body">
        <p>Вы уверены, что хотите удалить эту станцию метро?</p>
      </div>
      <div class="modal-footer">
        <button type="button" @click="remove" class="btn btn-primary">Да</button>
        <button type="button" @click="$emit('close')" class="btn btn-secondary">Нет</button>
      </div>
    </LSpinner>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import { useStore, Action } from '@/store';
import LSpinner from '@/components/layouts/LSpinner.vue';
import { toast } from '@/components/ui/UToaster.vue';

export default defineComponent({
  name: 'VStationRemove',
  emits: ['close'],
  components: {
    LSpinner,
  },
  props: {
    id: {
      type: Number as PropType<number>,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const waiting = ref(false);

    const remove = async () => {
      try {
        waiting.value = true;
        await store.dispatch(Action.DELETE_STATION, props.id);
        toast.success('Станция метро успешно удалена');
      } catch(err) {
        toast.error('Во время удаления данных произошла ошибка. Попробуйте повторить позже.');
        console.error(err.message, err.response);
      } finally {
        waiting.value = false;
        emit('close');
      }
    }

    return { waiting, remove };
  }
})
</script>