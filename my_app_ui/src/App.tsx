import { useState } from "react";
import viteLogo from "./assets/vite.svg";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { FrappeProvider } from "frappe-react-sdk";
function App() {
  const [count, setCount] = useState(0);

  // we need to pass sitename only if the Frappe version is v15 or above

  const getSiteName = () => {
    //@ts-ignore
    const frappeVersion = window.frappe?.boot?.versions?.frappe;
    //@ts-ignore
    const siteName = window.frappe?.boot?.sitename;
    return frappeVersion?.startsWith("15") || frappeVersion?.startsWith("16")
      ? siteName ?? import.meta.env.VITE_SITE_NAME
      : import.meta.env.VITE_SITE_NAME;
  };

  return (
    <div className="App">
      <FrappeProvider
        socketPort={import.meta.env.VITE_SOCKET_PORT}
        siteName={getSiteName()}
      >
        <div>
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://reactjs.org" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React + Frappe</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.jsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </div>
      </FrappeProvider>
    </div>
  );
}

export default App;
