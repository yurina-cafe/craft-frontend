<script setup lang="ts">
  import { ActivityType, type Activity } from "@/types/activity";

  const dayText = computed(() => {
    return "今天";
  });

  const showAddDialog = ref(false);
  const initializeType = ref<ActivityType>(ActivityType.CLOCK);
  const openAcitivityDialog = (type: ActivityType) => {
    initializeType.value = type;
    showAddDialog.value = true;
  };
</script>

<template>
  <DialogActivity
    v-model="showAddDialog"
    :key="initializeType"
    :init-type="initializeType"
    :appointment-time="getFormatTimeString(Date.now())"
  ></DialogActivity>
  <div class="activity-add">
    <h1>给{{ dayText }}添加活动</h1>
    <ul>
      <li @click="openAcitivityDialog(ActivityType.CLOCK)">
        <span>
          <Icon name="twemoji:hollow-red-circle" />
          定个番茄钟
        </span>
        <section>希望今天留出一段时间做什么？番茄钟搞定。</section>
      </li>

      <li @click="openAcitivityDialog(ActivityType.CHECKLIST)">
        <span>
          <Icon name="twemoji:hollow-red-circle" />
          记一个备忘
        </span>
        <section>有什么备忘？打勾完成。</section>
      </li>

      <li @click="openAcitivityDialog(ActivityType.NOTE)">
        <span>
          <Icon name="twemoji:hollow-red-circle" />
          写一段笔记
        </span>
        <section>今天发生了什么？</section>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  .activity-add {
    h1 {
      @apply text-2xl font-semibold;
    }

    ul {
      @apply mt-4 flex flex-col gap-1;
      li {
        @apply rounded-lg text-[16px] flex flex-col gap-1 cursor-pointer;
        @apply hover:bg-gray-700 px-4 pb-2 pt-3;
        transition: all 0.3s;

        &:hover {
          transform: scale(1.07);
        }

        span {
          @apply flex items-center gap-2;
        }

        svg {
          @apply mt-1 size-[18px];
        }

        section {
          @apply text-gray-400 text-xs mb-2;
        }
      }
    }
  }
</style>
