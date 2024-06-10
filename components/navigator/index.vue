<script setup lang="ts"></script>

<template>
  <div class="navigator">
    <div class="title">
      <Icon name="uil:annoyed" />
      <div>FeelingCraft</div>
    </div>
    <div class="link-group">
      <NuxtLink to="/"><Icon name="uil:home-alt" />日常 Daily</NuxtLink>
      <NuxtLink to="/statistic"
        ><Icon name="uil:adjust-circle" />统计 Statistic</NuxtLink
      >
      <NuxtLink to="/achievement"
        ><Icon name="uil:award" />成就 Achievement</NuxtLink
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navigator {
  @apply w-full h-full;
  background: rgba(37, 31, 26, 0.677);
}

.title {
  @apply flex items-center justify-center text-[24px] h-24 gap-1;
  color: rgb(222, 221, 220, 0.62);
  svg {
    @apply size-[32px] mt-1;
  }
}
.link-group {
  @apply flex flex-col gap-2 items-start;

  a {
    @apply flex items-center gap-2 text-[16px];
    @apply w-full h-4 p-4 m-1;
    @apply rounded-lg;
  }

  svg {
    @apply size-[24px] mt-1;
  }
}
</style>
