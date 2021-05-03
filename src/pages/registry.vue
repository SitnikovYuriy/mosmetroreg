<template>
  <div class="registry">

    <VStationList @add="onAdd" @edit="onEdit" @remove="onRemove"/>

    <UPopup :visible="popupVisible" @close="popupVisible = false">
      <VStationEdit v-if="form === Form.Edit" :id="stationId" @close="popupVisible = false"/>
      <VStationRemove v-if="form === Form.Remove" :id="stationId" @close="popupVisible = false"/>
    </UPopup>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import VStationList from '@/components/views/VStationList.vue';
import VStationEdit from '@/components/views/VStationEdit.vue';
import VStationRemove from '@/components/views/VStationRemove.vue';
import UPopup from '@/components/ui/UPopup.vue';

enum Form {
  Edit,
  Remove,
}

export default defineComponent({
  name: 'RegistryPage',
  components: {
    VStationList,
    VStationEdit,
    VStationRemove,
    UPopup,
  },
  setup() {
    const popupVisible = ref(false);
    const stationId = ref<null|number>(null);
    const form = ref<Form>(Form.Edit);

    const onAdd = () => {
      form.value = Form.Edit;
      stationId.value = null;
      popupVisible.value = true;
    };
    const onEdit = (id: number) => {
      form.value = Form.Edit;
      stationId.value = id;
      popupVisible.value = true;
    };
    const onRemove = (id: number) => {
      form.value = Form.Remove;
      stationId.value = id;
      popupVisible.value = true;
    };

    return { onAdd, onEdit, onRemove, popupVisible, stationId, form, Form };
  },
})
</script>