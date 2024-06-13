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
      class="nav-item__link w-full rounded-lg h-full flex items-center gap-2 pl-4 overflow-hidden"
      style="transition: all 0.3s"
      :class="{
        'bg-[rgb(50,44,40)]': $route.path === $props.to,
        'hover:bg-gray-800': $route.path !== $props.to,
      }"
    >
      <Icon :name="icon" />
      <p class="nav-item__desc">{{ text }}</p>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
  .nav-item {
    @apply flex items-center flex-nowrap gap-2 text-[16px];
    @apply w-[100%] h-[48px] px-2 py-[2px];
    @apply cursor-pointer;
    transition: all 0.3s;

    svg {
      @apply size-[16px] min-h-[16px] min-w-[16px];
    }
  }

  @media (max-width: 768px) {
    .nav-item {
      @apply h-[40px];

      svg {
        @apply size-[20px];
      }

      &__link {
        @apply justify-center pl-0;
      }

      &__desc {
        display: none;
      }
    }
  }
</style>
