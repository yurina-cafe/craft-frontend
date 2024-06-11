<script setup lang="ts">
  const props = defineProps<{
    to: string;
    icon: string;
    text: string;
  }>();

  const goPage = () => {
    navigateTo(props.to);
  };
</script>

<template>
  <div class="nav-item" @click="goPage">
    <NuxtLink
      class="w-full rounded-lg h-full flex items-center gap-2 pl-4"
      style="transition: all 0.3s"
      :class="{
        'bg-gray-900': $route.path === $props.to,
        'hover:bg-gray-800': $route.path !== $props.to,
      }"
    >
      <Icon :name="icon" />
      {{ text }}
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
  .nav-item {
    @apply flex items-center gap-2 text-[16px];
    @apply w-[100%] h-[48px] px-2 py-[2px];
    @apply cursor-pointer;
    transition: all 0.3s;
  }
</style>
