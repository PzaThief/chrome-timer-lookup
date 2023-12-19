// import { useState } from 'react'
import './App.css'

function App() {
  // const [count, setCount] = useState(0) 
  
  const changeColorOnClick = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.url?.startsWith("chrome://")) return undefined;

    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        document.body.style.backgroundColor = 'green';
      }
    });
  }
  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => changeColorOnClick()}>
         Change Color
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
