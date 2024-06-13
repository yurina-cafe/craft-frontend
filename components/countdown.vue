<script setup lang="ts">
  const props = defineProps<{
    hour?: number;
    minute?: number;
    second?: number;
  }>();
</script>

<template>
  <ul class="countdown-com">
    <li>
      <span>
        <span :style="{ '--value': hour }"></span>
      </span>
      小时
    </li>
    <li>
      <span>
        <span :style="{ '--value': minute }"></span>
      </span>
      分钟
    </li>
    <li>
      <span>
        <span :style="{ '--value': second }"></span>
      </span>
      秒
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  .countdown-com {
    @apply flex gap-4 text-center;

    li {
      @apply flex flex-col p-4 shadow-xl rounded-box text-neutral-content;
      background: #333;

      span {
        @apply countdown text-[50px];
      }
    }
  }
</style>
