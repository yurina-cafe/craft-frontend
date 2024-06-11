<script setup lang="ts"></script>

<template>
  <div class="feeling-set">
    <h1>今天心情怎么样</h1>
    <ul>
      <li>
        <span>
          <Icon name="twemoji:grinning-face" />
          开心
        </span>
        <section>今天过得很开心</section>
      </li>

      <li>
        <span>
          <Icon name="twemoji:crying-face" />
          难过
        </span>
        <section>今天过得很难过</section>
      </li>
      <li>
        <span>
          <Icon name="twemoji:angry-face" />
          生气
        </span>
        <section>今天过得很生气</section>
      </li>
      <li>
        <span>
          <Icon name="twemoji:face-with-steam-from-nose" />
          压力大
        </span>
        <section>今天压力很大</section>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  .feeling-set {
    h1 {
      @apply text-2xl font-semibold;
    }

    ul {
      @apply mt-4 flex flex-wrap gap-1;
      li {
        @apply w-[37%];
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
