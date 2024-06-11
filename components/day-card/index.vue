<script setup lang="ts">
  import { Feeling } from "@/types/day";
  import { ActivityType, type Activity } from "@/types/activity";

  interface DayCardProps {
    feeling: Feeling;
    activities: Activity[];
  }

  const props = ref<DayCardProps>({
    feeling: Feeling.ANGRY,
    activities: [
      {
        type: ActivityType.CHECKLIST,
        start: 2,
        finished: false,
        name: "吃饭",
      },
      {
        type: ActivityType.NOTE,
        start: 1,
        content: "今天天气不错",
      },
      {
        type: ActivityType.CLOCK,
        start: 123,
        clock: {
          name: "打豆豆",
          start: 123,
          end: 455,
          duration: 12,
        },
      },
    ],
  });
</script>

<template>
  <div class="day-card">
    <div class="feeling">
      <span class="date">2024-6-10</span>
      <DayCardFeeling :feeling="props.feeling"></DayCardFeeling>
    </div>

    <div class="divider"></div>

    <div class="growing" v-for="act in props.activities">
      <DayCardGrowing :activity="act"></DayCardGrowing>
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
