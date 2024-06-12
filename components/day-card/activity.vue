<script setup lang="ts">
  import { ActivityType, type Activity } from "~/types/activity";

  const props = defineProps<{
    activity: Activity;
  }>();

  const hovering = ref(false);

  const activityViewModel = computed(() => {
    switch (props.activity.type) {
      case ActivityType.CHECKLIST:
        return {
          icon: "twemoji:check-box-with-check",
          viewContext: props.activity.name,
          additionInfo: props.activity.finished ? "已完成" : "未完成",
          bgColor: props.activity.finished ? "bg-green-400" : "bg-red-400",
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
</script>

<template>
  <div
    class="growing-card"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <Icon :class="activityViewModel.bgColor" :name="activityViewModel.icon" />
    <div class="content">
      <p>{{ activityViewModel.viewContext }}</p>
      <p class="additional-info">{{ activityViewModel.additionInfo }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .growing-card {
    @apply flex items-start gap-2 text-[15px];
    @apply cursor-pointer select-none;

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
      transform: scale(1.05) translateX(5px);
    }

    &:active {
      transform: scale(1) translateX(0);
    }
  }
</style>
