import type { CraftFormatTime } from "~/types/time";

export const getTomorrowTimeStamp = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.getTime();
};

export const checkIsTodayOrTomorrow = (date: number | string) => {
  if (typeof date === "string") {
    const today = getFormatTimeString(new Date().getTime());
    const tomorrow = getFormatTimeString(getTomorrowTimeStamp());
    if (date === today) {
      return "今天";
    } else if (date === tomorrow) {
      return "明天";
    }
    return "ERROR";
  }

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dateToCheck = new Date(date);
  if (dateToCheck.toDateString() === today.toDateString()) {
    return "今天";
  } else if (dateToCheck.toDateString() === tomorrow.toDateString()) {
    return "明天";
  }
  return "ERROR";
};

// 格式为 2024-6-11 的日期字符串
export const getFormatTimeString = (time: number): CraftFormatTime => {
  const date = new Date(time);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};
