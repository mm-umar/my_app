import "@radix-ui/themes/styles.css";
import { FrappeProvider } from "frappe-react-sdk";
import { Theme } from "@radix-ui/themes";
import Login from "./pages/auth/Login";

function App() {
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
      <Theme appearance="dark" accentColor="iris" panelBackground="translucent">
        <FrappeProvider
          socketPort={import.meta.env.VITE_SOCKET_PORT}
          siteName={getSiteName()}
        >
          <Login />
        </FrappeProvider>
      </Theme>
    </div>
  );
}

export default App;
