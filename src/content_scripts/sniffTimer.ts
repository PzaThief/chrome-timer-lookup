import { Timer, TimerType, TimerStatus } from "../types/timer";
import { TimerHistoryWindow } from "../types/window";
import { getCallStack } from "../utils/misc";

declare const window: TimerHistoryWindow;

const timerHistory: Map<number, Timer> = new Map();

const originals = {
  setTimeout: window.setTimeout.bind(window),
  setInterval: window.setInterval.bind(window),
  clearTimeout: window.clearTimeout.bind(window),
  clearInterval: window.clearInterval.bind(window),
};

window.setTimeout = function (func, delay) {
  const id = originals.setTimeout(() => {
    (func as () => unknown)();
    timerHistory.get(id)!.lastExecuted = new Date();
    timerHistory.get(id)!.status = TimerStatus.Done;
  }, delay);
  const currentTime = new Date();
  const callStack = getCallStack(1);
  const timer = new Timer(
    id,
    TimerType.Timeout,
    func,
    callStack,
    delay,
    currentTime,
    undefined,
    TimerStatus.Running
  );
  timerHistory.set(id, timer);

  return id;
};

window.setInterval = function (func, delay) {
  const id = originals.setInterval(() => {
    (func as () => unknown)();
    timerHistory.get(id)!.lastExecuted = new Date();
  }, delay);

  const currentTime = new Date();
  const callStack = getCallStack(1);
  const timer = new Timer(
    id,
    TimerType.Interval,
    func,
    callStack,
    delay,
    currentTime,
    undefined,
    TimerStatus.Running
  );
  timerHistory.set(id, timer);

  return id;
};

window.TimerHistory = timerHistory;
