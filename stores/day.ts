import type { Activity } from "~/types/activity";
import type { Feeling, NaturalDay, RecentDay } from "~/types/day";

export const useDayStore = () => {
  const days = useState<NaturalDay[]>("days", () => []);
  const recentDays = useState<RecentDay>("recentDays");
  const today = useState<NaturalDay>("today");

  const _forceSyncDataFromSvr = () => {
    fetchAllDays();
    fetchRecentDays();
  };

  const fetchAllDays = async () => {
    const res = await useHttp("/day/all", "GET");
    days.value = res.data;
    return days.value;
  };

  const fetchRecentDays = async () => {
    const res = await useHttp("/day/recent", "GET");
    recentDays.value = res.data;
    today.value = res.data.today;
    return recentDays.value;
  };

  const updateDayActivities = async (
    day: string | NaturalDay,
    activities: Activity[]
  ) => {
    if (typeof day !== "string") {
      day = day.date;
    }

    const res = await useHttp(`/day/${day}/activities`, "POST", { activities });
    _forceSyncDataFromSvr();
    return res.data;
  };

  const addDayActivity = async (
    day: string | NaturalDay,
    activity: Activity
  ) => {
    if (typeof day !== "string") {
      day = day.date;
    }

    const naturalDay = days.value.find((d) => d.date === day);
    if (!naturalDay) {
      throw new Error("Day not found");
    }

    const res = await useHttp(`/day/${day}/activities`, "POST", {
      activities: [...naturalDay.activities, activity],
    });
    _forceSyncDataFromSvr();
    return res.data as NaturalDay;
  };

  const updateTodayFeeling = async (feeling: Feeling) => {
    const today = getFormatTimeString(new Date().getTime());
    const res = await useHttp(`/day/${today}/feeling`, "POST", { feeling });
    _forceSyncDataFromSvr();
    return res.data as NaturalDay;
  };

  return {
    _forceSyncDataFromSvr,
    fetchRecentDays,
    updateTodayFeeling,
    updateDayActivities,
    addDayActivity,
    recentDays,
    days,
    today,
  };
};
