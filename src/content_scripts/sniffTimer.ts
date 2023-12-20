import { Timer, TimerType } from "../types/timer";
import { TimerHistoryWindow } from "../types/window";

declare const window: TimerHistoryWindow;

const timerHistory: Timer[] = [];

const originals = {
  setTimeout: window.setTimeout.bind(window),
  setInterval: window.setInterval.bind(window),
  clearTimeout: window.clearTimeout.bind(window),
  clearInterval: window.clearInterval.bind(window),
};

window.setTimeout = function (func, delay) {
  let lastExecuted: Date | undefined = undefined;
  const id = originals.setTimeout(() => {
    (func as () => unknown)();
    lastExecuted = new Date();
  }, delay);
  const currentTime = new Date();
  const timer = new Timer(
    id,
    TimerType.Timeout,
    func,
    delay,
    currentTime,
    lastExecuted
  );
  timerHistory.push(timer);

  return id;
};

window.setInterval = function (func, delay) {
  let lastExecuted: Date | undefined = undefined;
  const id = originals.setInterval(() => {
    (func as () => unknown)();
    lastExecuted = new Date();
  }, delay);

  const currentTime = new Date();
  const timer = new Timer(
    id,
    TimerType.Interval,
    func,
    delay,
    currentTime,
    lastExecuted
  );
  timerHistory.push(timer);

  return id;
};

window.TimerHistory = timerHistory
