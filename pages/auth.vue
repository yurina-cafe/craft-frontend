<script setup lang="ts">
  definePageMeta({
    layout: "auth",
  });

  const userName = ref("");
  const submit = () => {
    if (userName.value.length < 2 || userName.value.length > 7) {
      alert("ID 长度应为 2 到 7 位");
      return;
    }
    localStorage.setItem("user", JSON.stringify(userName.value));
    navigateTo("/");
  };
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1>FeelingCraft</h1>
      <div class="title">请输入你的 ID</div>
      <input
        class="id-inputer"
        type="text"
        maxlength="7"
        minlength="2"
        v-model="userName"
        placeholder="请输入字数为二到七的 ID"
      />
      <button class="btn" @click="submit">启动</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .auth-page {
    @apply w-full h-full items-center flex justify-center;
  }

  .auth-card {
    @apply rounded-lg w-[400px] h-[220px] flex items-center flex-col p-4 shadow-lg;
    @apply gap-3;
    background: white;

    h1 {
      @apply text-2xl font-semibold;
    }

    .title {
      @apply text-lg text-center;
    }

    .id-inputer {
      @apply w-[240px] h-[40px] mt-2 rounded-xl shadow-md;
      @apply border border-gray-300;
      text-align: center;

      &::placeholder {
        text-align: center;
      }
    }

    .btn {
      @apply w-[80px] h-[40px] mt-2 rounded-[15px] shadow-md;
      @apply bg-blue-900 text-white;
      @apply flex items-center justify-center font-semibold;
    }
  }
</style>
