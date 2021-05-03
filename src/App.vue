<template>
  <LApp>

    <LHeader>
      <LLogo>
        <LTitle/>
      </LLogo>
      <LNavPills :routes="$router.options.routes"/>
    </LHeader>

    <LMain>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <keep-alive>
            <component :is="Component"></component>
          </keep-alive>
        </transition>
      </router-view>
    </LMain>

    <LFooter>
      <LCopyright/>
    </LFooter>

    <UToaster/>

  </LApp>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue';
import LApp from '@/components/layouts/LApp.vue';
import LHeader from '@/components/layouts/LHeader.vue';
import LLogo from '@/components/layouts/LLogo.vue';
import LTitle from '@/components/layouts/LTitle.vue';
import LNavPills from '@/components/layouts/LNavPills.vue';
import LMain from '@/components/layouts/LMain.vue';
import LFooter from '@/components/layouts/LFooter.vue';
import LCopyright from '@/components/layouts/LCopyright.vue';
import UToaster, { toast } from '@/components/ui/UToaster.vue';
import { FetchError } from './utils/fetch-json';

export default defineComponent({
  name: 'App',
  components: {
    LApp,
    LHeader,
    LLogo,
    LTitle,
    LNavPills,
    LMain,
    LFooter,
    LCopyright,
    UToaster,
  },
  setup() {
    const onUnhandledRejection = (event:  { reason: Error|FetchError }) => {
      if (event.reason instanceof FetchError) {
        toast.error('Во время запроса произошла ошибка. Попробуйте повторить запрос позже.');
        console.error(event.reason.message, event.reason.response);
      }
    };

    window.addEventListener('unhandledrejection', onUnhandledRejection);

    onUnmounted(() => {
      window.removeEventListener('unhandledrejection', onUnhandledRejection);
    });
  }
})
</script>

<style lang="scss">
@import '~@/assets/styles/styles.scss';
</style>