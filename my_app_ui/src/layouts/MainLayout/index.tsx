import { Layout, Menu } from "antd";
import { useFrappePostCall } from "frappe-react-sdk";
import { useEffect, useState, useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import toSlug from "../../utils/helper";

const { Header, Content, Sider, Footer } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const { call, result, error } = useFrappePostCall(
    "frappe.desk.desktop.get_workspace_sidebar_items"
  );
  const [selectedKey, setSelectedKey] = useState<string>("");

  useEffect(() => {
    call({});
  }, [call]);

  const handleNavigation = useCallback(
    (label: string) => {
      const slug = toSlug(label);
      setSelectedKey(slug); // Update selected key on navigation
      navigate(slug);
    },
    [navigate]
  );

  // Function to group sidebar items and subitems
  const groupSidebarItems = (pages: any[]) => {
    const groupedItems: any[] = [];
    const parentItems = pages.filter((item) => !item.parent_page);
    const childItems = pages.filter((item) => item.parent_page);

    parentItems.forEach((parent) => {
      const children = childItems
        .filter((child) => child.parent_page === parent.name)
        .map((child) => ({
          key: child.name,
          label: child.label,
          onClick: () => handleNavigation(child.label),
        }));

      groupedItems.push({
        key: parent.name,
        label: parent.label,
        onClick: () => handleNavigation(parent.label),
        children: children.length > 0 ? children : undefined,
      });
    });

    return groupedItems;
  };

  // Safely handle result when it's available
  const menuItems = result?.message?.pages
    ? groupSidebarItems(result.message.pages)
    : [];

  if (error) {
    return <div>Error loading sidebar items</div>;
  }

  if (!result) {
    return <div>Loading...</div>; // Show loading while fetching data
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider collapsible breakpoint="lg" style={{ background: "#001529" }}>
        <div
          style={{
            height: "64px",
            margin: "16px",
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
          }}
        />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]} // Dynamic selected key based on navigation
          items={menuItems}
        />
      </Sider>

      {/* Main Layout */}
      <Layout>
        {/* Header */}
        <Header
          style={{
            background: "#fff",
            padding: 0,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              padding: "0 16px",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            App Header
          </div>
        </Header>

        {/* Content Area */}
        <Content
          style={{ margin: "16px", padding: "16px", background: "#fff" }}
        >
          <Outlet />
        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: "center" }}>
          My Application ©2024 Created with Ant Design
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
