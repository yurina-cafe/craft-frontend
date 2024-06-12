<script setup lang="ts">
  import { type NaturalDay } from "@/types/day";

  const days = ref<NaturalDay[]>([]);
</script>

<template>
  <div class="calendar">
    <div class="day" v-for="day in days" :key="day.date">
      {{ day }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1rem;
  }
</style>
