export async function readLocalStorage(key: string): Promise<unknown> {
  const obj = await chrome.storage.local.get([key]);
  return obj[key];
}

// can not use in content script due to access chrome.tabs
export async function currentTab(): Promise<chrome.tabs.Tab> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

export function injectScript(script: string) {
  const s = document.createElement('script');
  s.id = "injected-script-" + parseInt('' + Math.floor((Math.random() * 100) + 1) + ((new Date()).getTime()));
  s.type = "module";
  s.src = chrome.runtime.getURL(script);
  document.head.prepend(s);
  s.remove();
}
