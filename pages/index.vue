<script setup lang="ts">
  import { useDayStore } from "~/stores/day";

  const user = ref();
  onMounted(() => {
    const u = localStorage.getItem("user");
    if (u) {
      user.value = JSON.parse(u);
    } else {
      navigateTo("/auth");
    }
  });

  const dayStore = useDayStore();
  const recentDays = computed(() => dayStore.recentDays.value);
  const refreshDays = async () => {
    dayStore.fetchRecentDays();
  };

  onMounted(refreshDays);
</script>

<template>
  <div class="homepage">
    <section class="today">
      <h1>
        <Icon name="twemoji:empty-nest" />
        你好啊 {{ user }}，开始记录今天的日常~
      </h1>
      <div class="card-list">
        <DayCard v-if="recentDays?.today" :data="recentDays.today"></DayCard>
      </div>
      <ActivityAdd @add="refreshDays" class="ml-4"></ActivityAdd>
      <ActivityEveryday class="ml-4"></ActivityEveryday>
      <FeelingSet @update="refreshDays"></FeelingSet>
    </section>

    <section class="tomorrow">
      <h1>
        <Icon name="twemoji:file-folder" />
        计划一下明天...
      </h1>
      <div class="card-list">
        <DayCard
          v-if="recentDays?.tomorrow"
          :data="recentDays.tomorrow"
        ></DayCard>
      </div>
    </section>

    <section class="yesterday">
      <h1>
        <Icon name="twemoji:face-in-clouds" />
        昨天怎么样?
        <span class="subtitle">已存根，暂不可修改</span>
      </h1>
      <div class="card-list">
        <DayCard
          v-if="recentDays?.yesterday"
          :data="recentDays.yesterday"
        ></DayCard>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
  .homepage {
    @apply p-8;

    .day-card {
      @apply min-w-[250px] min-h-[250px];
    }
    section {
      @apply w-full flex flex-wrap gap-6;
      @apply border-b border-gray-700 pb-16;

      h1 {
        @apply text-2xl mb-4 gap-3 flex items-center w-full;
      }

      .subtitle {
        @apply text-sm text-gray-500;
      }
    }

    .card-list {
      @apply flex gap-4;
    }

    .yesterday {
      @apply flex flex-col mt-8;
      @apply border-none;
    }

    .tomorrow {
      @apply flex flex-col mt-8;
    }
  }
</style>
