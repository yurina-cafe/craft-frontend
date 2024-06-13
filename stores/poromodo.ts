import type { Clock } from "~/types/activity";

export const usePoromodoStore = () => {
  const allPoromodos = useState<Clock[]>("all-poromodos");
  const currentPoromodo = useState("current-poromodo");

  const _forceUpdatePodomodoStates = async () => {
    await fetchAllPodomodos();
    currentPoromodo.value = localStorage.getItem("currentPoromodo");
  };

  const fetchAllPodomodos = async () => {
    const res = await useHttp("/clock/all", "GET");
    allPoromodos.value = res.data;
    return allPoromodos.value;
  };

  const startPoromodo = async (podomodoName: string) => {
    localStorage.setItem("currentPoromodo", podomodoName);
    localStorage.setItem("currentPoromodoStartTime", Date.now().toString());
    currentPoromodo.value = podomodoName;
    return currentPoromodo.value;
  };

  const completeCurrentPoromodo = async () => {
    const res = await useHttp("/clock/complete", "POST", {
      currentPoromodo: currentPoromodo.value,
      startTime: localStorage.getItem("currentPoromodoStartTime"),
      endTime: Date.now().toString(),
    });
    _forceUpdatePodomodoStates();

    return res.data;
  };

  const getCurrentPoromodoStartTime = () => {
    return localStorage.getItem("currentPoromodoStartTime");
  };

  const getCurrentPoromodoEndTime = async () => {
    const start = localStorage.getItem("currentPoromodoStartTime");
    if (!start) {
      return null;
    }

    const durationMin = await fetchCurrentPoromodoDuration();
    if (!durationMin) {
      return null;
    }

    return parseInt(start) + durationMin * 60 * 1000;
  };

  const fetchCurrentPoromodoDuration = async () => {
    if (!allPoromodos.value) {
      await _forceUpdatePodomodoStates();
    }
    const pomodoro = allPoromodos.value.find(
      (p) => p.name === currentPoromodo.value
    );
    if (!pomodoro) {
      return null;
    }

    return pomodoro.duration;
  };

  return {
    _forceUpdatePodomodoStates,
    allPoromodos,
    currentPoromodo,
    fetchAllPodomodos,
    fetchCurrentPoromodoDuration,
    startPoromodo,
    completeCurrentPoromodo,
    getCurrentPoromodoStartTime,
    getCurrentPoromodoEndTime,
  };
};
