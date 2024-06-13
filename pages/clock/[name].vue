<script setup lang="ts">
  import { usePoromodoStore } from "~/stores/poromodo";

  const route = useRoute();
  const name = route.params.name;

  const ignoreWrongTips = ref(false);

  const poromodoStore = usePoromodoStore();
  const currentPoromodo = computed(() => {
    return poromodoStore.currentPoromodo.value;
  });

  /**
   * 开始一个番茄钟
   */
  const endTime = ref();
  const start = async () => {
    await poromodoStore.startPoromodo(name as string);
    endTime.value = await poromodoStore.getCurrentPoromodoEndTime(); // 记录结束时间
  };
  const completePoromodo = async () => {
    await poromodoStore.completeCurrentPoromodo();
  };
  onMounted(async () => {
    // 只有当前番茄钟是当前页面的时候才会获取结束时间
    if (currentPoromodo.value != name) return;
    endTime.value = await poromodoStore.getCurrentPoromodoEndTime();
  });

  /**
   * 获取倒计时
   */
  const countdown = ref();
  let interval: NodeJS.Timeout;
  onMounted(() => {
    interval = setInterval(() => {
      // 根据结束时间计算倒计时
      const diff = endTime.value - Date.now();
      if (diff <= 0) {
        clearInterval(interval);
        completePoromodo();
        return;
      }
      countdown.value = timeStampToCountdown(diff);
    }, 1000);
  });
  onUnmounted(() => {
    clearInterval(interval);
  });
</script>

<template>
  <div class="poromodo">
    <h1>
      <Icon name="twemoji:tomato" />
      完成番茄钟
    </h1>
    <h2 @click="navigateTo('/clock')" class="cursor-pointer">
      <Icon class="mt-[2px]" name="feather:arrow-left" />
      回到所有番茄钟页面
    </h2>

    <div
      class="wrong-tips"
      v-if="!ignoreWrongTips && currentPoromodo && currentPoromodo != name"
    >
      <span
        class="text-red-300"
        @click="navigateTo(`/clock/${currentPoromodo}`)"
      >
        走错了？回到当前运行的番茄钟 "{{ currentPoromodo }}"
      </span>
      <span class="text-gray-500" @click="ignoreWrongTips = true">
        忽略，留在该页面
      </span>
    </div>
    <div class="poromodo-actions">
      <h1>{{ name }}</h1>

      <transition appear>
        <Countdown
          v-if="currentPoromodo == name && endTime && countdown"
          :hour="countdown.hour"
          :minute="countdown.minute"
          :second="countdown.second"
        ></Countdown>
      </transition>

      <footer v-if="!(currentPoromodo == name && endTime)">
        <button @click="start">开始番茄钟</button>
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .poromodo {
    @apply p-8;

    h1 {
      @apply text-2xl flex items-center gap-2;
    }

    h2 {
      @apply text-sm text-gray-400 mt-2 mb-2 items-center flex gap-1;
      transition: all 0.3s;

      &:hover {
        @apply text-cyan-50;
        transform: translateX(-4px);
      }
    }

    .wrong-tips {
      @apply text-sm text-red-200;
      @apply flex gap-4 mb-4 ml-4;
    }

    &-actions {
      @apply flex flex-col items-center justify-center w-full max-w-[500px] h-[300px] rounded-xl gap-4 pb-6 mt-6;
      background: linear-gradient(145deg, #b77d7d, #4444446e);

      h1 {
        @apply text-3xl font-semibold text-white drop-shadow-md;
        letter-spacing: 2px;
      }

      footer {
        button {
          @apply border-none bg-red-400 px-4 rounded-2xl shadow-lg text-white;
          @apply h-[40px];
          transition: all 0.3s;

          &:hover {
            transform: scale(1.05);
          }
        }
      }
    }
  }
</style>
