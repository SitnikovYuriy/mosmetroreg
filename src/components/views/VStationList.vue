<template>
  <div class="v-station-list">
    <LSpinner :visible="loading" :overlay="true">

      <div class="row">
        <div class="col">
          <h4 class="fw-light">Реестр станций метро</h4>
        </div>
        <div class="col justify-content-end d-inline-flex align-items-center">
          <LControlPanel class="d-inline-flex me-1">
            <button type="button" @click="loadData" class="material-icons" title="Обновить">refresh</button>
          </LControlPanel>
          <button class="btn btn-danger" type="button" @click="$emit('add')">
            <i class="material-icons float-start me-1">add</i>Новая станция
          </button>
        </div>
      </div>

      <UTable :config="config" :rows="rows">

        <template #title="{ value }">
          <span class="d-inline-block text-truncate w-100" :title="value">{{ value }}</span>
        </template>
        
        <template #line="{ value }">
          <span class="d-flex align-items-center" :title="value.title">
            <span class="line-circle d-block me-1" :style="`background-color: ${value.color}`">{{ value.shortTitle }}</span>
            <span class="d-inline-block text-truncate w-100">{{ value.title }}</span>
          </span>
        </template>

        <template #transferLines="{ value }">
          <span class="d-flex align-items-center">
            <span v-for="transferLine in value" :key="transferLine.id" class="line-circle d-block me-1" :style="`background-color: ${transferLine.color}`" :title="transferLine.title">{{ transferLine.shortTitle }}</span>
            <!-- <span class="d-inline-block text-truncate w-100">{{ value.title }}</span> -->
          </span>
        </template>

        <template #panel="{ value }">
          <LControlPanel class="d-flex justify-content-end">
            <button type="button" @click="$emit('edit', value)" class="material-icons" title="Редактировать">edit</button>
            <button type="button" @click="$emit('remove', value)" class="material-icons" title="Удалить">delete</button>
          </LControlPanel>
        </template>
        
      </UTable>

    </LSpinner>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from 'vue';
import { useStore, Action } from '@/store';
import UTable, { IConfigTable } from '@/components/ui/UTable.vue';
import LControlPanel from '@/components/layouts/LControlPanel.vue';
import LSpinner from '@/components/layouts/LSpinner.vue';
import { toast } from '@/components/ui/UToaster.vue';

export default defineComponent({
  name: 'VStationList',
  emits: ['add', 'edit', 'remove'],
  components: {
    UTable,
    LSpinner,
    LControlPanel,
  },
  setup() {
    const config = reactive<IConfigTable>({
      columns: [
        {
          id: 'id',
          title: '#',
          width: '40px',
        },
        {
          id: 'title',
          title: 'Название станции',
          template: 'title',
          width: '200px',
        },
        {
          id: 'line',
          title: 'Линия метро',
          template: 'line',
          width: '300px',
        },
        {
          id: 'transferLines',
          title: 'Пересадки на другие линии метро',
          template: 'transferLines',
          width: '200px',
        },
        {
          id: 'id',
          title: '',
          template: 'panel',
          width: '80px',
        }
      ],
      paging: {
        pageSize: 10,
        allowedPageSizes: [10, 15, 20],
      },
      keyExpr: 'id',
    });

    const store = useStore();

    const rows = computed(() => {
      return store.state.stations.map(station => ({
        id: station.id,
        title: station.title,
        line: store.state.lines.find(line => line.id === station.line),
        transferLines: station.transferLines.map(item => store.state.lines.find(line => line.id === item)),
      }));
    });

    const loadData = async () => {
      try {
        await store.dispatch(Action.LOAD_DATA);
      } catch(err) {
        toast.error('Во время запроса данных произошла ошибка. Попробуйте повторить запрос позже.');
        console.error(err.message, err.response);
      }
    }
    loadData();

    return {
      config,
      loading: computed(() => store.state.loading),
      loadData,
      rows,
    };
  },
})
</script>

<style scoped lang="scss">
.v-station-list {
  .line-circle {
    border-radius: 50%;
    width: 20px;
    height: 20px;
    min-width: 20px;
    padding: 4px;
    color: #fff;
    text-align: center;
    font-size: 12px;
    line-height: 12px;
    box-sizing: border-box;
    cursor: pointer;
  }
}
</style>