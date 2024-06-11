<script setup lang="ts"></script>

<template>
  <div class="layout-auth">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  .layout-auth {
    @apply flex items-center justify-center h-screen;
    @apply bg-slate-900;
  }
</style>
