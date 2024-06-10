<script setup lang="ts"></script>

<template>
  <div class="homepage">
    <section class="yesterday">
      <h1>昨天怎么样?</h1>
      <div class="card-list"><DayCard></DayCard></div>
    </section>
    <Calender></Calender>
    <section class="today">
      <h1>今天继续努力!</h1>
    </section>
    <section class="tomorrow">
      <h1>计划一下明天...</h1>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.homepage {
  @apply p-8;

  section {
    @apply w-full;

    h1 {
      @apply text-xl;
    }
  }

  .card-list {
    @apply flex gap-4 my-4;
  }

  .yesterday {
    @apply flex flex-col;
  }
}
</style>
