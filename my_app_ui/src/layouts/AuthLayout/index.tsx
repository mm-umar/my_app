import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const AuthLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: colorBgContainer,
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AuthLayout;
