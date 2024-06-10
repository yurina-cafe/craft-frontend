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
  @apply w-full h-[100vh] flex;
  background: rgb(40, 40, 40);
  color: rgb(222, 221, 220);
}
.left-side-nav {
  @apply w-[280px] h-[100vh];
}
</style>
