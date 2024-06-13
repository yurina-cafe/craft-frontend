<script setup lang="ts">
  import { Feeling } from "@/types/day";
  import { useDayStore } from "~/stores/day";

  const emits = defineEmits<{
    (e: "update"): void;
  }>();

  const dayStore = useDayStore();
  const { updateTodayFeeling } = useDayStore();

  const checkedFeeling = ref<Feeling | null>(null);
  onMounted(async () => {
    await dayStore.fetchRecentDays();
    checkedFeeling.value = dayStore.today.value.feeling;
  });

  const setFeelingToday = async (feeling: Feeling) => {
    try {
      await updateTodayFeeling(feeling);
    } catch (e) {
      console.error(e);
    } finally {
      checkedFeeling.value = feeling;
      emits("update");
    }
  };

  const feelingViewModel = ref([
    {
      feeling: Feeling.HAPPY,
      icon: "twemoji:grinning-face",
      title: "开心",
      description: "今天过得很开心",
    },
    {
      feeling: Feeling.SAD,
      icon: "twemoji:crying-face",
      title: "难过",
      description: "今天过得很难过",
    },
    {
      feeling: Feeling.ANGRY,
      icon: "twemoji:angry-face",
      title: "生气",
      description: "今天过得很生气",
    },
    {
      feeling: Feeling.STRESSED,
      icon: "twemoji:face-with-steam-from-nose",
      title: "压力大",
      description: "今天压力很大",
    },
    {
      feeling: Feeling.NEUTRAL,
      icon: "twemoji:neutral-face",
      title: "一般",
      description: "今天过得很一般",
    },
  ]);
</script>

<template>
  <div class="feeling-set">
    <h1>今天心情怎么样</h1>
    <ul>
      <li
        v-for="feeling in feelingViewModel"
        :key="feeling.title"
        @click="setFeelingToday(feeling.feeling)"
        :class="{
          'bg-gray-700': checkedFeeling === feeling.feeling,
        }"
      >
        <span>
          <Icon :name="feeling.icon" />
          <span>{{ feeling.title }}</span>
        </span>
        <section>{{ feeling.description }}</section>
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
      @apply select-none;
      @apply mt-4 flex flex-wrap gap-1;
      li {
        @apply w-[37%];
        @apply rounded-lg text-[16px] flex flex-col gap-1 cursor-pointer;
        @apply hover:bg-gray-600 px-4 pb-2 pt-3;
        transition: all 0.3s;

        &:hover {
          transform: scale(1.07);
        }

        &:active {
          transform: scale(1);
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
