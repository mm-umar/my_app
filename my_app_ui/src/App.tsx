import { useState } from "react";
import { FrappeProvider } from "frappe-react-sdk";
import { ConfigProvider, Switch, Typography } from "antd";
import AppRoutes from "./AppRoutes";

const { Text } = Typography;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const getSiteName = () => {
    const frappe: {
      boot?: {
        versions?: { frappe?: string };
        sitename?: string;
      };
    } = (window as any).frappe || {};

    const frappeVersion = frappe.boot?.versions?.frappe;
    const siteName = frappe.boot?.sitename;

    return frappeVersion?.startsWith("15") || frappeVersion?.startsWith("16")
      ? siteName ?? import.meta.env.VITE_SITE_NAME
      : import.meta.env.VITE_SITE_NAME;
  };

  // Theme tokens for dynamic customization
  const themeTokens = {
    light: {
      token: {
        colorPrimary: "#4A90E2", // Vibrant blue for light mode
        borderRadius: 10,
        colorText: "#2E3A59", // Soft text color for better readability
        colorBgContainer: "#F9FAFB",
        colorBgLayout: "#FFFFFF",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s ease-in-out",
      },
    },
    dark: {
      token: {
        colorPrimary: "#1E90FF", // Neon blue for dark mode
        borderRadius: 10,
        colorText: "#E5E7EB", // Subtle light text for dark mode
        colorBgContainer: "#1F2937",
        colorBgLayout: "#111827",
        boxShadow: "0 4px 16px rgba(255, 255, 255, 0.1)",
        transition: "all 0.3s ease-in-out",
      },
    },
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor: isDarkMode
          ? themeTokens.dark.token.colorBgLayout
          : themeTokens.light.token.colorBgLayout,
        minHeight: "100vh",
        transition: themeTokens.light.token.transition,
      }}
    >
      <ConfigProvider theme={isDarkMode ? themeTokens.dark : themeTokens.light}>
        <FrappeProvider
          socketPort={import.meta.env.VITE_SOCKET_PORT}
          siteName={getSiteName()}
        >
          {/* Dark Mode Toggle */}
          <div
            style={{
              position: "fixed",
              top: 10,
              right: 10,
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              gap: "10px",
              backgroundColor: isDarkMode
                ? "rgba(31, 41, 55, 0.8)"
                : "rgba(255, 255, 255, 0.8)",
              padding: "5px 15px",
              borderRadius: "20px",
              boxShadow: isDarkMode
                ? themeTokens.dark.token.boxShadow
                : themeTokens.light.token.boxShadow,
              backdropFilter: "blur(10px)",
              transition: themeTokens.light.token.transition,
            }}
          >
            <Text
              strong
              style={{
                color: isDarkMode
                  ? themeTokens.dark.token.colorPrimary
                  : themeTokens.light.token.colorPrimary,
              }}
            >
              {isDarkMode ? "Dark Mode" : "Light Mode"}
            </Text>
            <Switch
              checked={isDarkMode}
              onChange={() => setIsDarkMode((prev) => !prev)}
              checkedChildren="🌙"
              unCheckedChildren="☀️"
              style={{
                backgroundColor: isDarkMode
                  ? themeTokens.dark.token.colorPrimary
                  : themeTokens.light.token.colorPrimary,
              }}
            />
          </div>

          {/* App Routes */}
          <AppRoutes />
        </FrappeProvider>
      </ConfigProvider>
    </div>
  );
}

export default App;
