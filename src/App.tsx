/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import "./App.css";
import { DEFAULT_UPDATE_INTERVAL, GET_TIMER_HISTORY_KEY } from "./config/const";
import { Timer } from "./types/timer";

function App() {
  const [schedule, setSchedule] = useState<Timer[]>();

  useEffect(() => {
    setInterval(async () => {
      const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
      console.log(tab)
      const response = await chrome.tabs.sendMessage(tab.id!, GET_TIMER_HISTORY_KEY);

      setSchedule(response);
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
