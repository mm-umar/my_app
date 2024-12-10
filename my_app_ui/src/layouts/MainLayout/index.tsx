import React, { useEffect } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useFrappePostCall } from "frappe-react-sdk";
import {
  generateBreadcrumbItems,
  getPathSegments,
  groupSidebarItems,
} from "../../lib/helper";

const { Header, Content, Sider } = Layout;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { call, result } = useFrappePostCall(
    "frappe.desk.desktop.get_workspace_sidebar_items"
  );

  useEffect(() => {
    call({});
  }, [call]);

  // Safely handle result when it's available
  const menuItems = result?.message?.pages
    ? groupSidebarItems(result.message.pages, navigate)
    : [];

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          background: colorBgContainer,
          padding: "0 24px",
          fontSize: "20px", // Adjust the font size as needed
        }}
      >
        Education Management System
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            selectedKeys={getPathSegments(location.pathname)} // Pass pathname to helper
            style={{ height: "100%", borderRight: 0 }}
            items={menuItems}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb
            items={generateBreadcrumbItems(location.pathname)} // Pass pathname to helper
            style={{ margin: "16px 0" }}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
