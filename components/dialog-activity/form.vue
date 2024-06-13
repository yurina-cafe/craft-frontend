<script setup lang="ts">
  import { ActivityType, type Clock } from "@/types/activity";
  import { type CraftFormatTime } from "@/types/time";

  const props = defineProps<{
    type: ActivityType;
    appointmentTime: CraftFormatTime;
  }>();

  const emits = defineEmits<{
    (e: "update", value: object): void;
  }>();

  const formValue = ref({
    name: "",
    finished: false,
    content: "",
    clock: {
      duration: 0,
      name: "",
      created: getFormatTimeString(Date.now()),
    } as Clock,
  });

  watch(
    () => formValue.value,
    (newVal) => {
      emits("update", {
        type: props.type,
        created: props.appointmentTime,
        ...newVal,
      });
    },
    { deep: true }
  );

  const showCreatedTime = ref(false);
</script>

<template>
  <div class="activity-form form flex flex-col gap-4">
    <div v-if="showCreatedTime" class="start-time">
      <h3>创建时间</h3>
      <div class="text-gray-500">{{ Date.now() }}</div>
    </div>

    <div class="name" v-if="type == ActivityType.CHECKLIST">
      <h3>事件名</h3>
      <input
        type="text"
        v-model="formValue.name"
        class="input input-sm input-bordered"
      />
    </div>

    <div class="clock-name" v-if="type == ActivityType.CLOCK">
      <h3>番茄钟名</h3>
      <input
        type="text"
        v-model="formValue.clock.name"
        class="input input-sm input-bordered"
      />
    </div>

    <div class="clock-time" v-if="type == ActivityType.CLOCK">
      <h3>时长 (分钟)</h3>
      <input
        type="number"
        v-model="formValue.clock.duration"
        class="input input-sm w-[90px] input-bordered"
      />
    </div>

    <div v-if="type == ActivityType.CHECKLIST">
      <h3>是否已完成</h3>
      <input
        type="checkbox"
        :checked="formValue.finished"
        v-model="formValue.finished"
        class="ml-1 checkbox"
      />
    </div>

    <div v-if="type == ActivityType.NOTE">
      <h3 class="self-start mt-[2px]">笔记内容</h3>
      <textarea
        class="textarea textarea-bordered w-[300px]"
        v-model="formValue.content"
      ></textarea>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .activity-form {
    & > div {
      @apply flex items-center gap-2;
    }
  }
</style>
