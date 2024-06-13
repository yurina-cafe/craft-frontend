<script setup lang="ts">
  import dayjs from "dayjs";
  import { useDayStore } from "~/stores/day";
  import type { NaturalDay } from "~/types/day";

  const dayStore = useDayStore();
  const days = computed<NaturalDay[]>(() => {
    return dayStore.days.value;
  });

  const headerArray = computed<string[]>(() => {
    return ["一", "二", "三", "四", "五", "六", "日"];
  });

  /**
   * 页数切换
   */
  const selectedDate = ref<Date>(new Date());
  const yearAndMonthText = computed<string>(() => {
    return `${selectedDate.value.getFullYear()} 年 ${
      selectedDate.value.getMonth() + 1
    } 月`;
  });
  const addMonth = (month: number) => {
    selectedDate.value = dayjs(selectedDate.value).add(month, "month").toDate();
  };

  // 一个月几天
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // 几个空格
  const getFirstDayInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  onMounted(() => {
    dayStore._forceSyncDataFromSvr();
  });
</script>

<template>
  <div class="calendar">
    <header class="calendar-header">
      <div class="month-toggle" @click="addMonth(-1)"><-</div>
      <p>{{ yearAndMonthText }}</p>
      <div class="month-toggle" @click="addMonth(1)">-></div>
    </header>
    <div class="calendar-row">
      <div
        v-for="header in headerArray"
        :key="header"
        class="calendar-row-cell"
      >
        {{ header }}
      </div>
    </div>
    <div class="calendar-body">
      <div
        class="calendar-empty-cell"
        v-for="_ in getFirstDayInMonth(selectedDate)"
      ></div>

      <div
        v-for="day in getDaysInMonth(selectedDate)"
        :key="day"
        class="calendar-cell"
      >
        {{ day }}
      </div>

      <div
        class="calendar-empty-cell"
        v-for="_ in getFirstDayInMonth(selectedDate)"
      ></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .calendar {
    header {
      @apply flex justify-start gap-8 mb-4 p-4;
      @apply rounded-xl shadow-xl;
      background: rgb(68, 60, 55);
    }

    &-body {
      @apply flex flex-wrap rounded-b-xl overflow-hidden;
    }

    &-row {
      @apply flex flex-wrap;
      @apply rounded-t-xl overflow-hidden;
      &-cell {
        @apply w-[calc(100%/7)] h-[50px] justify-center items-center flex text-center;
        @apply font-semibold;
        color: #aaa;
        background: rgb(36, 32, 29);
      }
    }

    &-empty-cell {
      @apply w-[calc(100%/7)] h-[100px] bg-gray-800 justify-center items-center flex text-center;
      @apply border border-[rgb(42,35,33)] border-[1px];
      background-color: rgb(42, 35, 33);
    }

    &-cell {
      @apply w-[calc(100%/7)] h-[100px] bg-gray-500 p-2;
      @apply justify-start items-start flex text-center;
      @apply border border-[rgb(42,35,33)] border-[1px];
      background-color: rgb(66, 59, 54);
    }
  }
</style>
