export enum Feeling {
  HAPPY = "HAPPY",
  SAD = "SAD",
  NEUTRAL = "NEUTRAL",
  STRESSED = "STRESSED",
  ANGRY = "ANGRY",
}

export interface NaturalDay {
  date: string;
  feeling: Feeling;
  note: string;
}
