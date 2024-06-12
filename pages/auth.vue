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
    <div
      class="hero min-h-screen"
      style="
        background-image: url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg);
      "
    >
      <div class="hero-overlay bg-opacity-70"></div>
      <div class="hero-content text-center text-neutral-content">
        <div class="text-[rgb(233,233,233)]">
          <h1
            class="mb-5 text-3xl items-center flex justify-center gap-2 font-semibold"
          >
            <Icon class="size-[36px] mt-1" name="uil:annoyed" />
            加入 FeelingCraft
          </h1>
          <p class="mb-8 w-full text-md">
            縱使被說壞話、被討厭，也沒什麼好在意的，因為「對方如何看你」，那是對方的課題。
          </p>
          <input
            v-model="userName"
            type="text"
            class="input input-sm input-bordered max-w-xs text-center"
            placeholder="请输入字数为二到七的 ID"
          />
          <button class="btn btn-sm btn-primary ml-4" @click="submit">
            进入
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .auth-page {
    @apply w-full h-full items-center flex justify-center;
  }
</style>
