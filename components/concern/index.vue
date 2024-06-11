<script setup lang="ts">
  const user = ref();
  const concerns = ref<string[]>([]);

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

  const loading = ref(false);
  const toConcern = (name: string) => {
    if (loading.value) {
      return;
    }

    loading.value = true;
    if (name === user.value) {
      location.reload();
      return;
    }
    for (let i = 0; i < concerns.value.length; i++) {
      if (concerns.value[i] === name) {
        concerns.value.splice(i, 1);
        concerns.value.push(user.value);
        localStorage.setItem("concern", JSON.stringify(concerns.value));
      }
    }
    localStorage.setItem("user", JSON.stringify(name));
    location.reload();
    loading.value = false;
  };

  onBeforeMount(() => {
    checkLocalStorageUsedUser();
    checkConcernUsers();
  });

  const showConcernDialog = ref(false);
</script>

<template>
  <ClientOnly>
    <ConcernDialogConcern
      v-model="showConcernDialog"
      @add-concern="checkConcernUsers"
    ></ConcernDialogConcern>
    <div class="concern" v-show="!loading">
      <div
        class="user !bg-[rgb(60,64,60)]"
        :key="user"
        @click="toConcern(user)"
      >
        <span>{{ user }}</span>
      </div>
      <div class="user" v-for="i in concerns" :key="i" @click="toConcern(i)">
        <span>{{ i }}</span>
      </div>
      <div v-show="false"></div>
      <div class="add" @click="showConcernDialog = true">
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
  </ClientOnly>
</template>

<style lang="scss">
  .add-concern-block {
    @apply shadow-xl bg-gray-700 p-6 rounded-xl;
    @apply flex-col flex items-center gap-2;
    color: white;
  }
</style>
<style lang="scss" scoped>
  .concern {
    @apply flex gap-2 m-2;
    div {
      @apply flex items-center justify-center;
      @apply size-[58px] bg-[rgb(50,44,40)] rounded-lg;
      @apply cursor-pointer;

      transition: all 0.3s;

      &:hover {
        transform: scale(1.12);
      }
    }

    .user {
      span {
        @apply font-semibold;
        transform: scale(0.9, 1.18);
      }
    }
  }
</style>
