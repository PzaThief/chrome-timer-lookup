import {
  GET_TIMER_HISTORY_KEY,
  GET_GLOBAL_ACTIVATE_KEY,
} from "../config/const";
import { Timer, TimerType } from "../types/timer";

const originals = {
  setTimeout: window.setTimeout,
  setInterval: window.setInterval,
  clearTimeout: window.clearTimeout,
  clearInterval: window.clearInterval,
};

const timerHistory: Timer[] = [];

async function readLocalStorage(key: string): Promise<unknown> {
  const obj = await chrome.storage.local.get([key]);
  return obj[key];
}

async function currentHost(): Promise<string> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = new URL(tab.url!);
  return url.hostname;
}

async function isValidActivate(): Promise<boolean> {
  const globalActivate = await readLocalStorage(GET_GLOBAL_ACTIVATE_KEY);
  if (!globalActivate) return false;

  const currentHostActivate = await readLocalStorage(await currentHost());
  return Boolean(currentHostActivate);
}

async function activateSniff(): Promise<boolean> {
  if (!isValidActivate()) return false;

  console.log(window)

  console.log(window.setTimeout)
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
  console.log(window.setTimeout)

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

  chrome.runtime.onMessage.addListener(function (
    request,
    _sender,
    sendResponse
  ) {
    console.log("received message "+ request)
    if (request == GET_TIMER_HISTORY_KEY) sendResponse(timerHistory);
  });

  return true;
}

activateSniff().then((e) => console.log("activated status " + e));

export { originals };
export default activateSniff;
