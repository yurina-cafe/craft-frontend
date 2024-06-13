<script setup lang="ts">
  import dayjs from "dayjs";
  import { useDayStore } from "~/stores/day";
  import type { DayCell } from "~/types/calendar";
  import type { NaturalDay } from "~/types/day";
  import type { CraftFormatTime } from "~/types/time";

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
  const resetMonth = () => {
    selectedDate.value = new Date();
  };

  // 一个月几天
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // 几个空格
  const getFirstDayInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  /**
   * 日期单元
   */
  const dayCells = computed<DayCell[]>(() => {
    const cells: DayCell[] = [];
    const daysInMonth = getDaysInMonth(selectedDate.value);

    for (let i = 1; i <= daysInMonth; i++) {
      const formatDate = `${selectedDate.value.getFullYear()}-${
        selectedDate.value.getMonth() + 1
      }-${i}` as CraftFormatTime;
      cells.push({
        date: formatDate,
        day: i,
        naturalDay: days.value.find((d) => d.date === formatDate),
      });
    }
    return cells;
  });

  onMounted(() => {
    dayStore._forceSyncDataFromSvr();
  });
</script>

<template>
  <div class="calendar">
    <header class="calendar-header">
      <div class="month-toggle" @click="addMonth(-1)">
        <Icon name="uil:arrow-left" />
      </div>
      <p>{{ yearAndMonthText }}</p>
      <div class="month-toggle" @click="addMonth(1)">
        <Icon name="uil:arrow-right" />
      </div>
      <div class="month-toggle ml-[-20px]" @click="resetMonth">
        <Icon name="uil:sync" />
      </div>
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

      <CalendarCell
        v-for="c in dayCells"
        :key="c.date"
        :data="c"
        class="calendar-cell"
      ></CalendarCell>

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
      @apply flex justify-start items-center gap-8 mb-4 p-4;
      @apply rounded-xl shadow-xl;
      background: rgb(68, 60, 55);

      p {
        @apply text-[20px] font-semibold;
        color: #aaa;
      }

      .month-toggle {
        @apply cursor-pointer rounded-full;
        @apply p-1 font-semibold;
        background: rgba(42, 35, 33, 0.39);
        color: #aaa;
        transition: all 0.3s;

        svg {
          @apply w-8 h-8;
        }

        &:hover {
          background: rgba(42, 35, 33, 0.79);
          transform: scale(1.1);
        }

        &:active {
          background: rgba(42, 35, 33, 0.99);
          transform: scale(1);
        }
      }
    }

    &-body {
      @apply flex flex-wrap rounded-b-xl overflow-hidden p-3;
      background-color: rgb(42, 35, 33);
    }

    &-row {
      @apply flex flex-wrap;
      @apply rounded-t-xl overflow-hidden;
      &-cell {
        @apply w-[calc(100%/7)] h-[45px] justify-center items-center flex text-center;
        @apply font-semibold;
        color: #aaa;
        background: rgb(36, 32, 29);
      }
    }

    &-empty-cell {
      @apply w-[calc(100%/7)] h-[100px] justify-center items-center flex text-center;
      @apply border border-[rgb(42,35,33)] border-[1px];
    }

    &-cell {
      @apply w-[calc(100%/7)] h-[100px] bg-gray-500 p-2 rounded-lg drop-shadow-lg;
      @apply justify-start items-start flex text-center;
      @apply border border-[rgb(42,35,33)] border-[3px];
      background-color: rgb(66, 59, 54);
    }
  }
</style>
