import { GET_GLOBAL_ACTIVATE_KEY } from "../config/const";

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    chrome.storage.local.set({ [GET_GLOBAL_ACTIVATE_KEY]: true });
  } else if (details.reason == "update") {
    // pass
  }
});
