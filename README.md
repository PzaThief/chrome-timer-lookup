# Timer lookup Chrome extension for Developer

look up the schedule created by calling `setTimeout` and `setInterval`.
inspired by [setInterval-sniffer](https://github.com/NV/setInterval-sniffer)

## How to use

1. Install

   A. Install from [Chrome Web Store]() (recommended)

   B. build and install manually

   1. build following package.json.

   - This project has dependency of Vite and Typescript

   1. go to extension tab(`chrome://extensions`) and Load unpacked target to `dist` folder.

   - You should enable Developer mode by toggling

1. lookup timers in extension popup or devtools

## How it works

before page load started extension inject script that replace `setTimeout` and `setInterval` to capture.

## Roadmap

- support Firefox
- integration with devtools
- more comfortable UI
