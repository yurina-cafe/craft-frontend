<script setup lang="ts">
  import { type NaturalDay } from "@/types/day";

  const props = defineProps<{
    data: NaturalDay;
  }>();
</script>

<template>
  <div class="day-card">
    <div class="feeling">
      <span class="date">{{ data.date }}</span>
      <DayCardFeeling :feeling="data.feeling"></DayCardFeeling>
    </div>

    <div class="divider"></div>

    <div class="growing" v-for="act in data.activities">
      <Activity :activity="act"></Activity>
    </div>
    <div class="empty-growing" v-if="!data.activities.length">
      <DayCardEmpty class="w-full h-full"></DayCardEmpty>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .day-card {
    @apply rounded-xl flex flex-col gap-2 p-4 shadow-xl;

    background: linear-gradient(100deg, #eae7de, #d2d2c9);
    color: #333;

    .date {
      @apply text-[17px];
      color: #333;
    }

    .feeling {
      @apply flex justify-between items-center px-2 gap-2;
    }

    .growing {
      @apply flex flex-col justify-center h-[30px];
      color: #444;
    }

    .empty-growing {
      @apply flex items-center gap-2 font-light p-1 flex-1;
      color: #838383;
    }

    .divider {
      @apply h-[1px] my-2;
      background: #ffffffbe;
    }
  }
</style>
