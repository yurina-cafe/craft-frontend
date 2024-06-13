import type { NaturalDay } from "./day";
import type { CraftFormatTime } from "./time";

export interface DayCell {
  date: CraftFormatTime;
  day: number;
  naturalDay?: NaturalDay;
}
