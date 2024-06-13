<script setup lang="ts">
  onMounted(() => {
    const u = localStorage.getItem("user");
    if (!u) {
      navigateTo("/auth");
    }
  });
</script>

<template>
  <NuxtLayout>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
