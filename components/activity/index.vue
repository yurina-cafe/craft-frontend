<script setup lang="ts">
  import { useDayStore } from "~/stores/day";
  import { ActivityType, type Activity, type Clock } from "~/types/activity";
  import type { CraftFormatTime } from "~/types/time";

  const props = defineProps<{
    day: CraftFormatTime;
    activity: Activity;
    hideAdditionInfo?: boolean;
  }>();

  const dayStore = useDayStore();

  const hovering = ref(false);

  const toPoromodo = (clock: Clock) => {
    navigateTo(`/clock/${clock.name}`);
  };
  const activityViewModel = computed(() => {
    switch (props.activity.type) {
      case ActivityType.CHECKLIST:
        return {
          icon: "twemoji:check-box-with-check",
          viewContext: props.activity.name,
          additionInfo: props.activity.finished ? "已完成" : "未完成",
          bgColor: props.activity.finished ? "bg-green-400" : "bg-red-400",
          finished: props.activity.finished,
        };
      case ActivityType.NOTE:
        return {
          icon: "twemoji:spiral-notepad",
          viewContext: props.activity.content,
          additionInfo: "笔记",
          bgColor: "bg-cyan-100",
        };
      case ActivityType.CLOCK:
        return {
          icon: "twemoji:alarm-clock",
          viewContext: props.activity.clock.name,
          additionInfo: `${props.activity.clock.duration} min${
            props.activity.clock.finished ? " 已完成" : " 未完成"
          }`,
          bgColor: props.activity.clock.finished
            ? "bg-green-400"
            : "bg-red-400",
          finished: props.activity.clock.finished,
        };
      default:
        return {
          icon: "twemoji:cherries",
          viewContext: "未知的任务类型",
          additionInfo: "ERROR",
          bgColor: "bg-red-400",
        };
    }
  });

  const deleteActivity = (activity: Activity) => {
    const naturalDay = dayStore.days.value.find((d) => d.date === props.day);
    if (!naturalDay) return;

    naturalDay.activities = naturalDay.activities.filter((act: Activity) => {
      return JSON.stringify(act) !== JSON.stringify(activity);
    });

    dayStore.updateDayActivities(naturalDay, naturalDay.activities);
  };

  const toggleFinishStatus = (activity: Activity) => {
    const naturalDay = dayStore.days.value.find((d) => d.date === props.day);
    if (!naturalDay) return;

    const targetActivity = naturalDay.activities.find(
      (act: Activity) => JSON.stringify(act) === JSON.stringify(activity)
    );
    if (!targetActivity) return;

    if (targetActivity.type === ActivityType.CLOCK) {
      targetActivity.clock.finished = !targetActivity.clock.finished;
    } else if (targetActivity.type === ActivityType.CHECKLIST) {
      targetActivity.finished = !targetActivity.finished;
    } else {
      return;
    }
    dayStore.updateDayActivities(naturalDay, naturalDay.activities);
  };
</script>

<template>
  <div
    class="growing-card"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <Icon :class="activityViewModel.bgColor" :name="activityViewModel.icon" />
    <div v-if="hovering" class="opeartion">
      <Icon
        name="wpf:full-trash"
        class="bg-gray-100 cursor-pointer"
        @click="deleteActivity(activity)"
      />
    </div>
    <div
      v-if="hovering && activity.type == ActivityType.CHECKLIST"
      class="opeartion"
    >
      <Icon
        :name="
          activityViewModel.finished
            ? 'twemoji:check-mark-button'
            : 'twemoji:cross-mark'
        "
        class="bg-gray-100 cursor-pointer"
        @click="toggleFinishStatus(activity)"
      />
    </div>
    <div
      v-if="
        hovering &&
        activity.type == ActivityType.CLOCK &&
        !activity.clock.finished
      "
      class="opeartion"
    >
      <Icon
        name="twemoji:tomato"
        class="bg-gray-100 cursor-pointer"
        @click="toPoromodo(activity.clock)"
      />
    </div>
    <div class="content">
      <p>{{ activityViewModel.viewContext }}</p>
      <p v-if="!hovering && !hideAdditionInfo" class="additional-info">
        {{ activityViewModel.additionInfo }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .growing-card {
    @apply flex items-start gap-2 text-[15px];
    @apply select-none;

    svg {
      @apply size-[27px] flex justify-center p-[6px] shadow-sm rounded-full;
    }

    .content {
      @apply flex gap-1 items-center;
    }
    .additional-info {
      @apply text-gray-500 text-[11px] self-end mb-[1px];
    }

    transition: all 0.2s;
    &:hover {
      transform: scale(1.03);
    }

    &:active {
      transform: scale(1) translateX(0);
    }
  }
</style>
