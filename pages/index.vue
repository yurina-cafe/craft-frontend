<script setup lang="ts"></script>

<template>
  <div class="homepage">
    <section class="today">
      <h1>
        <Icon name="twemoji:empty-nest" />
        记录今天的日常~
      </h1>
      <div class="card-list"><DayCard></DayCard></div>
      <ActivityAdd class="ml-4"></ActivityAdd>
    </section>
    <section class="yesterday">
      <h1>
        <Icon name="twemoji:face-in-clouds" />
        昨天怎么样?
        <span class="subtitle">已存根，暂不可修改</span>
      </h1>
      <div class="card-list"><DayCard></DayCard></div>
    </section>

    <section class="tomorrow">
      <h1>
        <Icon name="twemoji:file-folder" />
        计划一下明天...
      </h1>
    </section>
  </div>
</template>

<style lang="scss" scoped>
  .homepage {
    @apply p-8;

    section {
      @apply w-full flex flex-wrap gap-6;

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
      @apply flex flex-col mt-24;
    }

    .tomorrow {
      @apply flex flex-col mt-24;
    }
  }
</style>
