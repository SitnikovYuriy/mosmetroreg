<template>
  <div class="v-station-edit">
    <LSpinner :visible="waiting" :overlay="true">
      <form @submit.prevent="onSubmit"><!-- novalidate -->
        <div class="modal-header">
          <h5 class="modal-title">{{ id ? 'Редактирование станции метро' : 'Новая станция метро' }}</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          
          <div class="form-group required mb-3">
            <label for="titleInput" class="form-label">Название станции</label>
            <input v-model="form.title" type="text" class="form-control" id="titleInput" placeholder="Введите название" required>
            <div id="titleInputFeedback" class="invalid-feedback">Поле обязательно для заполнения</div>
          </div>

          <div class="form-group required mb-3">
            <label for="lineInput" class="form-label">Линия метро</label>
            <select v-model="form.line" class="form-select" id="lineInput" required><!-- .is-invalid -->
              <option v-for="line in lines" :key="line" :value="line.id" :selected="line.id === form.line">{{ line.title }}</option>
            </select>
            <div id="lineInputFeedback" class="invalid-feedback">Поле обязательно для заполнения</div>
          </div>

          <div class="form-group mb-3">
            <label for="transferLinesInput" class="form-label">Пересадки на другие линии метро</label>
            <select v-model="form.transferLines" class="form-select" id="transferLinesInput" multiple>
              <option v-for="line in lines" :key="line" :value="line.id" :selected="form.transferLines.includes(line.id)">{{ line.title }}</option>
            </select>
          </div>

        </div>
        <div class="modal-footer">
          <option></option>
          <button type="button" @click="$emit('close')" class="btn btn-secondary">Отменить</button>
          <button type="submit" class="btn btn-primary">Сохранить</button>
        </div>
      </form>
    </LSpinner>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, PropType, computed } from 'vue';
import { useStore, Action } from '@/store';
import LSpinner from '@/components/layouts/LSpinner.vue';
import { toast } from '@/components/ui/UToaster.vue';

export default defineComponent({
  name: 'VStationEdit',
  emits: ['close'],
  components: {
    LSpinner,
  },
  props: {
    id: {
      type: Number as PropType<number|null>,
    },
  },
  setup(props, { emit }) {
    const waiting = ref(false);

    const form = reactive({
      title: '',
      line: '',
      transferLines: [],
    });

    const store = useStore();
    if (props.id) {
      const station = store.getters.getStationById(props.id);
      form.title = station.title;
      form.line = station.line;
      form.transferLines = station.transferLines.slice();
    }
    
    const onSubmit = async () => {
      try {
        waiting.value = true;
        await store.dispatch(props.id ? Action.UPDATE_STATION : Action.ADD_STATION, {
          id: props.id,
          title: form.title,
          line: form.line,
          transferLines: form.transferLines,
        });
        toast.success(props.id ? 'Cтанция метро успешно обновлена' : 'Новая станция метро успешно создана');
        emit('close');
      } catch(err) {
        toast.error('Во время отправки данных произошла ошибка. Попробуйте повторить позже.');
        console.error(err.message, err.response);
      } finally {
        waiting.value = false;
      }
    }

    return { onSubmit, waiting, form, lines: computed(() => store.state.lines) };
  }
})
</script>

<style scoped lang="scss">
.v-station-edit {
  min-width: 480px;
}
</style>
