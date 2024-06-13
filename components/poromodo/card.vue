<script setup lang="ts">
  import { type Clock } from "~/types/activity";

  const props = defineProps<{
    data: Clock;
  }>();
</script>

<template>
  <div class="poromodo-card">
    <Icon class="big-bang" name="twemoji:tomato" />
    <div class="title">
      {{ props.data.name }}
    </div>
    <ul>
      <li>
        <Icon name="feather:clock" />
        <span>创建时间</span>
        <span>{{ props.data.created }}</span>
      </li>
      <li>
        <Icon name="feather:info" />
        <span>时长</span>
        <span>{{ props.data.duration }} 分钟</span>
      </li>
    </ul>
    <footer>
      <button @click="navigateTo(`/clock/${$props.data.name}`)">GO</button>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
  .big-bang {
    @apply w-10 h-10 absolute top-[-10px] right-[-10px];
    transform: rotate(12deg);
    color: #9b4a4a;
  }

  .poromodo-card {
    @apply relative px-6 py-4 rounded-lg shadow-md flex flex-col;
    background: linear-gradient(30deg, #c08771 0%, #e4bcbc 10%, #eee 30%);

    .title {
      @apply text-xl font-semibold flex items-center gap-2 mb-2;
      color: #9b4a4a;
    }

    ul {
      @apply text-gray-500 flex flex-col gap-1;

      li {
        @apply flex items-center gap-2;

        svg {
          @apply w-4 h-4 mt-[2px];
        }
      }
    }

    footer {
      @apply mt-auto ml-auto;
      button {
        @apply px-[15px] py-[5px] bg-red-300 text-white rounded-lg font-bold shadow-sm hover:shadow-xl transition-all duration-300;
        @apply hover:bg-red-400;
      }
    }
  }
</style>
