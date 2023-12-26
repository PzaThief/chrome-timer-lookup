import { useEffect, useState } from "react";
import "./App.css";
import { DEFAULT_UPDATE_INTERVAL } from "./config/const";
import { Timer, TransferableTimer } from "./types/timer";
import { TimerHistoryWindow } from "./types/window";
import { currentTab } from "./utils/chrome";
import { TimerHistoryTable } from "./components/TimerHistory";
import { isNullOrEmpty } from "./utils/misc";

async function updateSchedule(
  setSchedule: (value: React.SetStateAction<Timer[]>) => void
) {
  const tab = await currentTab();
  if (!tab) return;

  chrome.scripting
    .executeScript({
      target: { tabId: tab.id! },
      func: () => {
        const timerHistory = (window as Window as TimerHistoryWindow)
          .TimerHistory;
        if (timerHistory == null) return [];

        const transferableTimers: TransferableTimer[] = [];
        for (const [_, value] of timerHistory.entries()) {
          transferableTimers.push(value.toTransferable());
        }

        return transferableTimers;
      },
      world: "MAIN",
    })
    .then((resultWithFrames) => {
      if (resultWithFrames.length != 1) return;
      const result = resultWithFrames[0].result;
      if (isNullOrEmpty(result)) return;
      const timers = result.map((timer) =>
        TransferableTimer.fromObject(timer).toTimer()
      );
      console.log(timers);
      setSchedule(timers);
    });
}

function App() {
  const [schedule, setSchedule] = useState<Timer[]>([]);
  useEffect(() => {
    updateSchedule(setSchedule);
    setInterval(() => updateSchedule(setSchedule), DEFAULT_UPDATE_INTERVAL);
  }, []);

  return (
    <>
      <h1>Timer Schedule</h1>
      <TimerHistoryTable timerHistory={schedule} />
    </>
  );
}

export default App;
