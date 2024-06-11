<script setup lang="ts">
  import { type Activity } from "~/types/activity";

  const props = defineProps<{
    activity: Activity;
  }>();

  const activityViewContext = computed(() => {
    if (props.activity.type === "CHECKLIST") {
      return props.activity.finished;
    } else if (props.activity.type === "NOTE") {
      return props.activity.content;
    } else if (props.activity.type === "CLOCK") {
      return props.activity.clock.name;
    } else {
      return "未知的任务类型";
    }
  });

  const activityIcon = computed(() => {
    if (props.activity.type === "CHECKLIST") {
      return "twemoji:check-mark-button";
    } else if (props.activity.type === "NOTE") {
      return "twemoji:spiral-notepad";
    } else if (props.activity.type === "CLOCK") {
      return "twemoji:alarm-clock";
    } else {
      return "twemoji:cherries";
    }
  });
</script>

<template>
  <div class="growing-card">
    <Icon :name="activityIcon" />
    <div class="content">{{ activityViewContext }}</div>
  </div>
</template>

<style lang="scss" scoped>
  .growing-card {
    @apply flex items-center gap-2 text-[15px];
    color: #eee;

    svg {
      @apply size-[17px] flex justify-center;
    }
  }
</style>
