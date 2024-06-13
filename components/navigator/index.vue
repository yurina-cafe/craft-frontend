<script setup lang="ts"></script>

<template>
  <div class="navigator">
    <div class="title">
      <Icon name="uil:annoyed" />
      <h1>FeelingCraft</h1>
    </div>
    <div class="link-group">
      <NavigatorItem to="/" icon="uil:home" text="首页 Home"></NavigatorItem>
      <NavigatorItem
        to="/calendar"
        icon="uil:calendar-alt"
        text="日历 Calendar"
      ></NavigatorItem>
      <NavigatorItem
        to="/clock"
        icon="uil:clock"
        text="番茄钟 Pomodoro"
      ></NavigatorItem>
      <!-- clock -->
      <!-- <NavigatorItem
        to="/statistic"
        icon="uil:adjust-circle"
        text="统计 Statistic"
      ></NavigatorItem>
      <NavigatorItem
        to="/achievement"
        icon="uil:award"
        text="成就 Achievement"
      ></NavigatorItem> -->
    </div>
    <div class="concern-list">
      <Concern></Concern>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .navigator {
    @apply w-[270px] h-full;
    background: rgba(37, 31, 26, 0.677);

    .concern-list {
      @apply flex flex-col items-center justify-center gap-4;
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }

  .title {
    @apply flex items-center justify-center text-[24px] h-24 gap-1;
    color: rgb(222, 221, 220, 0.62);
    svg {
      @apply size-[32px] mt-1;
    }
  }
  .link-group {
    @apply flex flex-col items-start;

    svg {
      @apply size-[24px] mt-1;
    }
  }

  @media (max-width: 768px) {
    .navigator {
      @apply w-[55px];
    }

    .title {
      h1 {
        display: none;
      }
    }

    .concern-list > * {
      display: none;
    }
  }
</style>
