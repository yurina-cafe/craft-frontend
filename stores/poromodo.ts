import type { Clock } from "~/types/activity";

export const usePoromodoStore = () => {
  const allPoromodos = useState<Clock[]>("all-poromodos");
  const currentPoromodo = useState("current-poromodo");

  const _forceUpdatePodomodoStates = async () => {
    fetchAllPodomodos();
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

  return {
    _forceUpdatePodomodoStates,
    allPoromodos,
    currentPoromodo,
    fetchAllPodomodos,
    startPoromodo,
    completeCurrentPoromodo,
  };
};
