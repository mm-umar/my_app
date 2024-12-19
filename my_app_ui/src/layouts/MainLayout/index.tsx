import React, { useEffect, useMemo } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useFrappeAuth, useFrappePostCall } from "frappe-react-sdk";
import {
  generateBreadcrumbItems,
  getPathSegments,
  groupSidebarItems,
} from "../../lib/helper";

const { Content, Sider } = Layout;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout, isLoading } = useFrappeAuth();
  const { call, result } = useFrappePostCall(
    "frappe.desk.desktop.get_workspace_sidebar_items"
  );

  useEffect(() => {
    if (!isLoading && !currentUser) {
      logout();
      navigate("/login", { replace: true });
    }
  }, [currentUser, isLoading, logout, navigate]);

  useEffect(() => {
    call({});
  }, [call]);

  const menuItems = useMemo(
    () =>
      result?.message?.pages
        ? groupSidebarItems(result.message.pages, navigate)
        : [],
    [result, navigate]
  );

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        collapsible
        width={240}
        style={{
          backgroundColor: "#001529",
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            background: "linear-gradient(90deg, #fa8c16 0%, #ffa940 100%)",
          }}
        >
          <img
            src="/vite.svg"
            alt="Logo"
            style={{ width: 32, height: 32, borderRadius: "50%" }}
          />
          <h2
            style={{
              marginLeft: 12,
              fontSize: 18,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Education
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={getPathSegments(location.pathname)}
          style={{
            height: "100%",
            borderRight: 0,
            fontSize: "14px", // Improve readability
          }}
          items={menuItems}
        />
      </Sider>
      <Layout style={{ padding: "0 24px 24px", background: "#f0f2f5" }}>
        <Breadcrumb
          items={generateBreadcrumbItems(location.pathname)}
          style={{
            margin: "16px 0",
            padding: "8px 16px",
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)", // Elevation for breadcrumb
          }}
        />
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Box shadow for content
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
