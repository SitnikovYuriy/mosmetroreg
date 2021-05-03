<template>
  <div class="w-100 mb-3" style="overflow-x: auto">
    <table class="u-table table table-hover align-middle mb-0">
      <thead>
        <tr>
          <th
            v-for="column in config.columns"
            :key="column.id"
            class="text-truncate"
            :title="column.title"
            :style="{ 'width': column.width ?? 'auto', 'max-width': column.width ?? 'auto' }"
          >
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in displayRows" :key="row[config.keyExpr]">
          <td v-for="column in config.columns" :key="column.id" :style="{ 'width': column.width ?? 'auto', 'max-width': column.width ?? 'auto' }">
            <template v-if="column.template">
              <slot :name="column.template" :value="row[column.id]"></slot>
            </template>
            <template v-else>
              {{ row[column.id] }}
            </template>
          </td>
        </tr>
        <tr v-if="!displayRows.length">
          <td :colspan="config.columns.length" class="text-center py-5">
            Нет данных
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="row">
    <div class="col d-flex justify-content-start">
      <div class="btn-group u-table__selector">
        <template v-for="(size, index) in allowedPageSizes" :key="size">
          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            :id="`btnradio${index}`"
            :value="size"
            v-model="paginator.pageSize.value"
            autocomplete="off"
            :checked="(size === config?.paging.pageSize)"
          >
          <label class="btn btn-outline-secondary" :for="`btnradio${index}`">{{ size }}</label>
        </template>
      </div>
    </div>
    <div class="col d-flex justify-content-center align-items-center">
      <input
        type="number"
        :value="pageInput"
        @input="onPageInput"
        @paste.prevent
        @keypress="checkNumber"
        class="u-table__page form-control text-end me-2"
      >
      <div class="text-muted">из {{ paginator.lastPage.value }}</div>
    </div>
    <div class="col d-flex justify-content-end">
      <div class="btn-toolbar">
        <div class="btn-group">
          <button type="button" class="btn btn-outline-secondary material-icons" @click="paginator.first">first_page</button>
          <button type="button" class="btn btn-outline-secondary material-icons" @click="paginator.prev">chevron_left</button>
          <button type="button" class="btn btn-outline-secondary material-icons" @click="paginator.next">chevron_right</button>
          <button type="button" class="btn btn-outline-secondary material-icons" @click="paginator.last">last_page</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType, watch } from 'vue';
import usePagination from '@/use/pagination';

export interface IColumnTable {
  id: string,
  title: string,
  sortable?: boolean,
  template?: string,
  width?: string,
}

export interface IConfigTable {
  columns: IColumnTable[],
  paging: {
    pageSize: number,
    allowedPageSizes: number[],
  }
  keyExpr: string,
}

export default defineComponent({
  name: 'UTable',
  props: {
    config: {
      type: Object as PropType<IConfigTable>,
      requied: true,
    },
    rows: {
      type: Array as PropType<Record<string, unknown>[]>,
      requied: true,
      default: () => [],
    },
  },
  setup(props) {
    const sortingRows = computed(() => props.rows);
    const totalCount = computed(() => sortingRows.value.length);
    const paginator = usePagination(totalCount, props.config?.paging.pageSize);
    const displayRows = computed(() => sortingRows.value.slice(paginator.from.value, paginator.to.value));
    const allowedPageSizes = computed(() => props.config?.paging.allowedPageSizes.slice().sort((a, b) => a - b) ?? []);

    const pageInput = ref('');

    const onPageInput = (event: InputEvent) => {
      const { value } = event.target as HTMLInputElement;
      pageInput.value = value;
      const parsedValue = parseInt(value);
      paginator.currentPage.value = isNaN(parsedValue) ? 1 : parsedValue;
      pageInput.value = paginator.currentPage.value.toString();
    }

    watch(paginator.currentPage, () => {
      pageInput.value = paginator.currentPage.value.toString();
    }, { immediate: true });

    const checkNumber = (event: KeyboardEvent) => {
      if (!/^[0-9]+$/.test(event.key)) event.preventDefault();
    }
    
    return { displayRows, paginator, allowedPageSizes, pageInput, checkNumber, onPageInput };
  },
})
</script>

<style scoped lang="scss">
.u-table {
  &__selector {
    margin-left: 1px;
  }
  &__page {
    max-width: 43px;
  }
}
</style>