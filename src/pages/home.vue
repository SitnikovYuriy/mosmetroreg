<template>
  <div class="home">
    <!-- just decorative page -->
    <section class="py-5 text-center container bg-light rounded-3 mb-3">
      <div class="row py-lg-5">
        <div class="col-lg-8 col-md-8 mx-auto">
          <h1 class="fw-light">Задание <img height="40" alt="Vue logo" src="@/assets/images/vue.png"> + <img height="40" alt="TypeScript logo" src="@/assets/images/ts.png"></h1>
          <p class="lead text-muted">Разработать веб-приложение для введения реестра станций метро г.&nbsp;Москва.</p>
          <p>
            <a href="mailto:sity@inbox.ru" class="btn btn-primary my-2">Сделать оффер</a> <a href="https://hh.ru/employer" target="_blank" class="btn btn-secondary my-2">Поискать ещё</a>
          </p>
        </div>
      </div>
    </section>
    <div class="album">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col">
          <div class="card h-100" @click="toast.info('Функциональные требования реализованы в разделе Реестр станций')">
            <div class="card-body">
              <p class="text-center">Функциональные требования</p>
              <ul class="text-muted">
                <li>Отображать реестр станций метро с постраничным выводом</li>
                <li>Должна быть возможность просмотра, создания, редактирования, удаления станций метро</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100" @click="toast.warning('Атрибутивный состав объектов можно посмотреть в разделе Реестр станций')">
            <div class="card-body">
              <p class="text-center">Атрибутивный состав</p>
              <ul class="text-muted">
                <li>Название станции</li>
                <li>Пересадки на другие линии метро</li>
                <li>Линия метро</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100" @click="toast.success('Технические требования были учтены при реализации данного проекта')">
            <div class="card-body">
              <p class="text-center">Технические требования</p>
              <ul class="text-muted">
                <li>Работа с БД не требуется, для предоставления и хранения данных использовать «сервис-заглушку»</li>
                <li>Формат передачи данных JSON</li>
                <li>VueJS 3 (Composition API)</li>
                <li>TypeScript</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { toast } from '@/components/ui/UToaster.vue';

export default defineComponent({
  name: 'HomePage',
  setup() {
    return { toast };
  }
})
</script>

<style lang="scss" scoped>
.card {
  cursor: pointer;
  &:hover {
    box-shadow: 0px 7px 14px rgba(0, 0, 0, 0.15);
    transition: all 0.2s ease-in-out;
    transform: translate(0px, -3px);
  }
}
</style>
