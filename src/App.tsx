/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import "./App.css";
import { DEFAULT_UPDATE_INTERVAL } from "./config/const";
import { Timer } from "./types/timer";
import { TimerHistoryWindow } from "./types/window";

function App() {
  const [schedule, setSchedule] = useState<Timer[]>();
  useEffect(() => {
    setInterval(async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (!tab) return;

      chrome.scripting
        .executeScript({
          target: { tabId: tab.id! },
          func: () => {
            return (window as Window as TimerHistoryWindow).TimerHistory;
          },
          world: "MAIN"
        })
        .then(resultWithFrames => {
          if (resultWithFrames.length != 1) return;
          setSchedule(resultWithFrames[0].result);
        });
    }, DEFAULT_UPDATE_INTERVAL);
  }, []);

  return (
    <>
      <h1>Timer Schedule</h1>
      <ul>
        {schedule?.map((item, i) => (
          <li key={i}>{item.id}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
