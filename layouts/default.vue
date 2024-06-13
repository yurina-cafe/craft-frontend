<script setup lang="ts"></script>

<template>
  <div class="layout-default">
    <div class="left-side-nav">
      <Navigator />
    </div>
    <div class="layout-body">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .layout-default {
    @apply w-full flex min-h-[100vh];
    background: rgb(40, 40, 40);
    color: rgb(222, 221, 220);
  }
  .left-side-nav {
    @apply h-[100vh] sticky top-0 left-0;
  }
  .layout-body {
    @apply w-full h-full;
    padding: 12px;
  }
</style>
