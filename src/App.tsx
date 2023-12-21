import { useEffect, useState } from "react";
import "./App.css";
import { DEFAULT_UPDATE_INTERVAL } from "./config/const";
import { SimplifiedTimer } from "./types/timer";
import { TimerHistoryWindow } from "./types/window";
import { currentTab } from "./utils/chrome";
import { TimerHistoryTable } from "./components/TimerHistory";
import { isNullOrEmpty } from "./utils/misc";

function App() {
  const [schedule, setSchedule] = useState<SimplifiedTimer[]>([]);
  useEffect(() => {
    setInterval(async () => {
      const tab = await currentTab();
      if (!tab) return;

      chrome.scripting
        .executeScript({
          target: { tabId: tab.id! },
          func: () => {
            const timerHistory = (
              window as Window as TimerHistoryWindow
            ).TimerHistory
            if (timerHistory == null) return [];

            const simplifiedTimers: SimplifiedTimer[] = [];
            for (const [_, value] of timerHistory.entries()) {
              simplifiedTimers.push(value.simplify());
            }

            return simplifiedTimers;
          },
          world: "MAIN",
        })
        .then((resultWithFrames) => {
          if (resultWithFrames.length != 1) return;
          const result = resultWithFrames[0].result;
          console.log(result);
          if (isNullOrEmpty(result)) return;
          setSchedule(result);
        });
    }, DEFAULT_UPDATE_INTERVAL);
  }, []);

  return (
    <>
      <h1>Timer Schedule</h1>
      <TimerHistoryTable timerHistory={schedule} />
    </>
  );
}

export default App;
