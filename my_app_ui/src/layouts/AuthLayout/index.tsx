import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const AuthLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AuthLayout;
