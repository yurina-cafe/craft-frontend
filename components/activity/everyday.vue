<script setup lang="ts"></script>

<template>
  <div v-show="false" class="activity-add">
    <h1>设定每天都有的 TODO</h1>
    <ul>
      <li>
        <span>
          <Icon name="twemoji:blue-circle" />
          每日 番茄钟
        </span>
        <section>每天拿出一点时间做一个重要的事</section>
      </li>

      <li>
        <span>
          <Icon name="twemoji:blue-circle" />
          每日 Check
        </span>
        <section>检查一遍每天都要做的事</section>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  .activity-add {
    h1 {
      @apply text-2xl font-semibold;
    }

    ul {
      @apply mt-4 flex flex-col gap-1;
      li {
        @apply rounded-lg text-[16px] flex flex-col gap-1 cursor-pointer;
        @apply hover:bg-gray-700 px-4 pb-2 pt-3;
        transition: all 0.3s;

        &:hover {
          transform: scale(1.07);
        }

        span {
          @apply flex items-center gap-2;
        }

        svg {
          @apply mt-1 size-[18px];
        }

        section {
          @apply text-gray-400 text-xs mb-2;
        }
      }
    }
  }
</style>
