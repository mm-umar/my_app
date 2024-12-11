import { useState } from "react";
import { ConfigProvider, Switch } from "antd";
import { Outlet } from "react-router-dom";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const themeTokens = {
    light: {
      token: {
        colorPrimary: "#4A90E2",
        colorText: "#2E3A59",
        colorBgContainer: "#F9FAFB",
        colorBgLayout: "#FFFFFF",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
      },
    },
    dark: {
      token: {
        colorPrimary: "#1E90FF",
        colorText: "#E5E7EB",
        colorBgContainer: "#1F2937",
        colorBgLayout: "#111827",
        boxShadow: "0 4px 16px rgba(255, 255, 255, 0.1)",
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
        transition: "all 0.3s ease-in-out",
      }}
    >
      <ConfigProvider theme={isDarkMode ? themeTokens.dark : themeTokens.light}>
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 10,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            backgroundColor: isDarkMode
              ? "rgba(31, 41, 55, 0.8)"
              : "rgba(255, 255, 255, 0.8)",
            borderRadius: "20px",
            boxShadow: isDarkMode
              ? themeTokens.dark.token.boxShadow
              : themeTokens.light.token.boxShadow,
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease-in-out",
          }}
        >
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
        <Outlet />
      </ConfigProvider>
    </div>
  );
}

export default App;
