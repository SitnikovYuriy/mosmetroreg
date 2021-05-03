import { ref, computed, watch, Ref, ComputedRef, WritableComputedRef } from 'vue';
import minMax from '@/utils/min-max';

interface IPaginator {
  pageSize: Ref<number>,
  lastPage: ComputedRef<number>,
  currentPage: WritableComputedRef<number>,
  from: ComputedRef<number>,
  to: ComputedRef<number>,
  first: () => number,
  prev: () => number,
  next: () => number,
  last: () => number,
}

export default function usePagination(totalCount: ComputedRef<number>, perPage = 10, initialPage = 1): IPaginator {
  const pageSize = ref(Math.max(perPage, 1));

  const lastPage = computed(() => Math.max(1, Math.ceil(totalCount.value / pageSize.value)));

  const page = ref(1);
  const currentPage = computed<number>({
    get: () => page.value,
    set: value => {
      page.value = minMax(value, 1, lastPage.value);
    },
  });
  currentPage.value = initialPage;

  watch(
    [lastPage, pageSize],
    () => {
      if (currentPage.value > lastPage.value) {
        currentPage.value = lastPage.value;
      }
    },
    { immediate: false },
  );

  const from = computed(() => (currentPage.value - 1) * pageSize.value);
  const to = computed(() => from.value + pageSize.value);

  const first = () => currentPage.value = 1;
  const prev = () => --currentPage.value;
  const next = () => ++currentPage.value;
  const last = () => currentPage.value = lastPage.value;

  return { pageSize, lastPage, currentPage, from, to, first, prev, next, last };
}