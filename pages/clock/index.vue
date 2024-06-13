<script setup lang="ts">
  import { usePoromodoStore } from "~/stores/poromodo";

  const poromodoStore = usePoromodoStore();

  const clocks = computed(() => {
    return poromodoStore.allPoromodos.value;
  });
  onMounted(() => {
    poromodoStore._forceUpdatePodomodoStates();
  });
</script>

<template>
  <div class="clock-home">
    <h1>
      <Icon name="twemoji:tomato" />
      番茄钟
    </h1>
    <h2>最近 3 天待完成的番茄钟</h2>

    <div class="clocks">
      <PoromodoCard v-for="c in clocks" :data="c"></PoromodoCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .clock-home {
    @apply p-8;

    h1 {
      @apply text-2xl flex items-center gap-2;
    }

    h2 {
      @apply text-sm text-gray-500 mt-2 mb-8;
    }

    .clocks {
      @apply flex gap-8 flex-wrap;

      .poromodo-card {
        @apply h-[165px] w-[230px];
      }
    }
  }
</style>
