export enum ActivityType {
  CHECKLIST = "CHECKLIST", // 完成了某些任务
  CLOCK = "CLOCK", // 完成了一次番茄钟
  NOTE = "NOTE", // 纯文本笔记
}

export interface IActivity {
  type: ActivityType;
  start: number;
}

export type Activity = ChecklistActivity | ClockActivity | NoteActivity;

export interface ChecklistActivity extends IActivity {
  type: ActivityType.CHECKLIST;
  finished: boolean;
}

export interface ClockActivity extends IActivity {
  type: ActivityType.CLOCK;
  clock: Clock;
}

export interface NoteActivity extends IActivity {
  type: ActivityType.NOTE;
  content: string;
}

export interface Clock {
  start: number;
  end: number;
  duration: number;
  name: string; // 番茄钟名称
}
