<script setup lang="ts">
import { Feeling } from "@/types/day";

interface DayCardProps {
  feeling: Feeling;
}

const props = ref({
  feeling: Feeling.ANGRY,
});
</script>

<template>
  <div class="day-card">
    <div class="feeling">
      <DayCardFeeling :feeling="props.feeling"></DayCardFeeling>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.day-card {
  @apply w-[200px] h-[210px] rounded-md;
  background: linear-gradient(145deg, #b68e8e, #858ea0);

  .feeling {
    @apply flex flex-col justify-center p-4;
  }
}
</style>
