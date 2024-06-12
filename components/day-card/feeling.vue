<script setup lang="ts">
  import { Feeling } from "@/types/day";

  const props = defineProps<{
    feeling: Feeling;
  }>();

  interface FeelingProps {
    row: Feeling;
    iconifyName: string;
    description: string;
  }

  const feelingProps = computed<FeelingProps>(() => {
    switch (props.feeling) {
      case Feeling.HAPPY:
        return {
          row: props.feeling,
          iconifyName: "twemoji:grinning-face",
          description: "开心",
        };
      case Feeling.SAD:
        return {
          row: props.feeling,
          iconifyName: "twemoji:crying-face",
          description: "难过",
        };
      case Feeling.ANGRY:
        return {
          row: props.feeling,
          iconifyName: "twemoji:angry-face",
          description: "生气",
        };
      case Feeling.STRESSED:
        return {
          row: props.feeling,
          iconifyName: "twemoji:face-with-steam-from-nose",
          description: "压力大",
        };
      case Feeling.NEUTRAL:
        return {
          row: props.feeling,
          iconifyName: "twemoji:neutral-face",
          description: "一般",
        };
      default:
        return {
          row: props.feeling,
          iconifyName: "twemoji:neutral-face",
          description: "一般",
        };
    }
  });
</script>

<template>
  <div>
    <div class="feeling-card">
      <div class="name">{{ feelingProps.description }}</div>
      <div class="icon">
        <Icon :name="feelingProps.iconifyName" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .feeling-card {
    @apply flex items-center gap-2 text-[20px] drop-shadow-sm;

    .name {
      @apply font-semibold;
    }

    svg {
      @apply size-[25px] flex justify-center;
    }
  }
</style>
