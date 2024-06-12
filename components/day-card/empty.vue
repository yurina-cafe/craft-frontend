<script setup lang="ts"></script>

<template>
  <div class="card-empty">
    <Icon name="uil:comment-add" />
    <div class="description">今天还没有记录哦</div>
  </div>
</template>

<style lang="scss" scoped>
  .card-empty {
    @apply flex items-center flex-col gap-1 justify-center pb-[35px];

    svg {
      @apply text-[42px];
    }
  }
</style>
