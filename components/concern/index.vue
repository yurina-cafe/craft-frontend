<script setup lang="ts">
  const user = ref();
  const concerns = ref([]);

  const checkLocalStorageUsedUser = () => {
    const u = localStorage.getItem("user");
    if (u) {
      user.value = JSON.parse(u);
    } else {
      navigateTo("/auth");
    }
  };

  const checkConcernUsers = () => {
    const cs = localStorage.getItem("concern");
    if (cs) {
      concerns.value = JSON.parse(cs);
    }
  };

  const toConcern = (name: string) => {
    localStorage.setItem("user", JSON.stringify(name));
  };

  onBeforeMount(() => {
    checkLocalStorageUsedUser();
    checkConcernUsers();
  });
</script>

<template>
  <div class="concern">
    <div class="user">
      <span>{{ user }}</span>
    </div>
    <div class="user" v-for="i in concerns" @click="toConcern(i)">
      <span>{{ i }}</span>
    </div>
    <div class="add">
      <svg
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
        width="17px"
        height="17px"
        viewBox="0 0 36 36"
      >
        <path
          d="M31 15H21V5a3 3 0 1 0-6 0v10H5a3 3 0 1 0 0 6h10v10a3 3 0 1 0 6 0V21h10a3 3 0 1 0 0-6"
        />
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .concern {
    @apply flex gap-2 m-2;
    div {
      @apply flex items-center justify-center;
      @apply size-[64px] bg-slate-900 rounded-lg;
      @apply cursor-pointer;

      transition: all 0.3s;

      &:hover {
        transform: scale(1.12);
      }
    }

    .user {
      span {
        @apply font-semibold;
        transform: scale(0.9, 1.15);
      }
    }
  }
</style>
