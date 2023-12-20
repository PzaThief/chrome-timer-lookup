/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { GET_GLOBAL_ACTIVATE_KEY } from "../config/const";
import { injectScript, readLocalStorage } from "../utils/chrome";
import sniffTimer from "./sniffTimer?script&module";

async function isValidActivate(): Promise<boolean> {
  const globalActivate = await readLocalStorage(GET_GLOBAL_ACTIVATE_KEY);
  if (!globalActivate) return false;

  const currentHostActivate = await readLocalStorage(window.location.host);
  return Boolean(currentHostActivate);
}

async function activateSniff(): Promise<boolean> {
  if (!isValidActivate()) return false;
  injectScript(sniffTimer);

  return true;
}

activateSniff().then((activated) => {
  if (activated) {
    console.log("activated sniffing timer api");
  }
});
