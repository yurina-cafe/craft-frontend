<script setup lang="ts">
  import type { Activity } from "~/types/activity";
  import type { DayCell } from "~/types/calendar";

  const props = defineProps<{
    data: DayCell;
  }>();

  interface DayCellViewModel {
    day: number;
    feeling: string;
    activities: Activity[];
  }
</script>

<template>
  <div class="day-cell">
    <header>
      <div class="day">{{ props.data.day }}</div>
      <!-- <div class="feeling">{{ props.data.naturalDay?.feeling }}</div> -->
    </header>

    <div class="activities">
      <div v-for="activity in props.data.naturalDay?.activities">
        <Activity
          :day="data.date"
          :activity="activity"
          hide-addition-info
        ></Activity>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .day-cell {
    @apply flex gap-2 relative overflow-hidden;

    header {
      @apply flex justify-between;
    }

    .activities {
      @apply flex flex-col mt-1 gap-2;
    }

    .day {
      @apply text-[45px] font-mono;
      @apply absolute bottom-[-20px] right-[11px];
      transform: rotate(5deg);
    }
  }
</style>
