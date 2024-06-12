<script setup lang="ts">
  import { type NaturalDay } from "@/types/day";

  const props = defineProps<{
    data: NaturalDay;
  }>();
</script>

<template>
  <div class="day-card">
    <div class="feeling">
      <span class="date">2024-6-10</span>
      <DayCardFeeling :feeling="data.feeling"></DayCardFeeling>
    </div>

    <div class="divider"></div>

    <div class="growing" v-for="act in data.activities">
      <DayCardGrowing :activity="act"></DayCardGrowing>
    </div>
    <div class="empty-growing" v-if="!data.activities.length">
      <Icon name="twemoji:blueberries" />
      <span>今天还没有记录哦</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .day-card {
    @apply rounded-xl flex flex-col gap-2 p-4 shadow-xl;
    background: linear-gradient(145deg, #5b3d3d, #515e76);

    .date {
      @apply text-[17px];
      color: #eee;
    }

    .feeling {
      @apply flex justify-between items-center px-2 gap-2;
    }

    .growing {
      @apply flex flex-col justify-center;
    }

    .empty-growing {
      @apply flex items-center gap-2 p-1;
      color: #999;

      svg {
        @apply mt-[2px] text-[22px];
      }
    }

    .divider {
      @apply h-[1px] w-full my-1;
      background: #ffffff18;
    }

    @apply cursor-pointer;
    transition: all 0.3s;
    &:hover {
      transform: scale(1.05);
    }
  }
</style>
