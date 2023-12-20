import { Timer } from "./timer";

export interface TimerHistoryWindow extends Window {
  TimerHistory: Map<number, Timer>;
}
