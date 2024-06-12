import type { Activity } from "~/types/activity";
import type { Feeling, NaturalDay } from "~/types/day";
import type { CraftFormatTime } from "~/types/time";

export const getRecentDays = async () => {
  const res = await useHttp("/day/recent", "GET");
  return res.data;
};

export const getDay = async (day: number | CraftFormatTime) => {
  if (typeof day === "number") {
    day = getFormatTimeString(day);
  }
  const res = await useHttp(`/day/${day}`, "GET");
  return res.data as NaturalDay;
};

export const addDayActivity = async (
  day: number | CraftFormatTime,
  activity: Activity
) => {
  if (typeof day === "number") {
    day = getFormatTimeString(day);
  }

  // get day data
  const naturalDay = await getDay(day);
  const data = { activities: [...naturalDay.activities, activity] };

  const res = await useHttp(`/day/${day}/activities`, "POST", data);
  return res.data as NaturalDay;
};

export const setTodayFeeling = async (feeling: Feeling) => {
  const today = getFormatTimeString(new Date().getTime());
  const res = await useHttp(`/day/${today}/feeling`, "POST", { feeling });
  return res.data as NaturalDay;
};
