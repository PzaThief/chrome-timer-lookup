/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {
  GET_TIMER_HISTORY_KEY,
  GET_GLOBAL_ACTIVATE_KEY,
} from "../config/const";
import { currentHost, injectScript, readLocalStorage } from "../utils/chrome";
import sniffTimer from './sniffTimer?script&module'

async function isValidActivate(): Promise<boolean> {
  const globalActivate = await readLocalStorage(GET_GLOBAL_ACTIVATE_KEY);
  if (!globalActivate) return false;

  const currentHostActivate = await readLocalStorage(await currentHost());
  return Boolean(currentHostActivate);
}

async function activateSniff(): Promise<boolean> {
  if (!isValidActivate()) return false;

  injectScript(sniffTimer)  

  return true;
}


(async () => {
  chrome.runtime.onMessage.addListener(function (
    request,
    _sender,
    sendResponse
  ) {
    console.log("received message " + request);
    if (request == GET_TIMER_HISTORY_KEY) sendResponse(timerHistory);
  });

  console.log("activate");

  const activated = await activateSniff();
  console.log("activated status " + activated);
})();
