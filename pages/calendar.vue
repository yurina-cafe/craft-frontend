<script setup lang="ts">
  import { type NaturalDay } from "@/types/day";

  const days = ref<NaturalDay[]>([]);
</script>

<template>
  <div class="calendar-page">
    <Calendar></Calendar>
  </div>
</template>

<style lang="scss" scoped>
  .calendar-page {
    @apply p-8 w-full h-full;
  }
</style>
