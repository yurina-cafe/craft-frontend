<script setup lang="ts">
  import { type Clock } from "@/types/activity";
  const clockToday = ref<Clock[]>([]);
  const clockTomorrow = ref<Clock[]>([]);
</script>

<template>
  <div>
    <div class="clock">
      <h1>TODAY</h1>
      <div class="clock-today" v-for="clock in clockToday" :key="clock.start">
        {{ clock }}
      </div>
    </div>
    <div class="clock">
      <h1>TOMORROW</h1>
      <div
        class="clock-tomorrow"
        v-for="clock in clockTomorrow"
        :key="clock.start"
      >
        {{ clock }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
