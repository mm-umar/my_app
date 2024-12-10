import React, { useEffect, useMemo } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useFrappePostCall } from "frappe-react-sdk";
import {
  generateBreadcrumbItems,
  getPathSegments,
  groupSidebarItems,
} from "../../lib/helper";

const { Header, Content, Sider } = Layout;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();

  // Extract Ant Design theme token for dynamic styles
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Fetch sidebar items once when the component mounts
  const { call, result } = useFrappePostCall(
    "frappe.desk.desktop.get_workspace_sidebar_items"
  );

  useEffect(() => {
    call({});
  }, [call]);

  // Memoize the menu items to avoid unnecessary recalculations
  const menuItems = useMemo(() => {
    if (result?.message?.pages) {
      return groupSidebarItems(result.message.pages, navigate);
    }
    return [];
  }, [result, navigate]);

  // Memoize breadcrumb items to avoid unnecessary recalculations
  const breadcrumbItems = useMemo(() => generateBreadcrumbItems(), []);

  // Styles
  const headerStyle = {
    display: "flex",
    alignItems: "center",
    background: colorBgContainer,
    padding: "0 24px",
    fontSize: "20px", // Adjust the font size as needed
  };

  const siderStyle = {
    background: colorBgContainer,
  };

  const contentStyle = {
    padding: 24,
    margin: 0,
    minHeight: 280,
    background: colorBgContainer,
    borderRadius: borderRadiusLG,
  };

  return (
    <Layout>
      {/* Header */}
      <Header style={headerStyle}>Education Management System</Header>

      <Layout>
        {/* Sider (Sidebar) */}
        <Sider width={200} style={siderStyle}>
          <Menu
            mode="inline"
            selectedKeys={getPathSegments()} // Dynamically set selected keys based on path segments
            style={{ height: "100%", borderRight: 0 }}
            items={menuItems} // Sidebar menu items
          />
        </Sider>

        <Layout style={{ padding: "0 24px 24px" }}>
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} style={{ margin: "16px 0" }} />

          {/* Content */}
          <Content style={contentStyle}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
