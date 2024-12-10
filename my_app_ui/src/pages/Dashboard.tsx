import { Card, Button, Typography, Space } from "antd";
import { useFrappeAuth } from "frappe-react-sdk";
import { NavLink } from "react-router-dom";

const { Title } = Typography;

const Dashboard = () => {
  const { currentUser, logout, isLoading } = useFrappeAuth();

  return (
    <Space
      style={{
        height: "100vh",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        title={
          <Title level={3} style={{ textAlign: "center", marginBottom: 0 }}>
            Vite + React + Frappe User
          </Title>
        }
        style={{ width: 400, maxWidth: "100%" }}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          {currentUser ? (
            <Button
              type="primary"
              block
              onClick={logout}
              loading={isLoading}
              size="large"
            >
              Logout
            </Button>
          ) : (
            <NavLink to="/login" style={{ width: "100%" }}>
              <Button type="primary" block size="large" loading={isLoading}>
                Login
              </Button>
            </NavLink>
          )}
        </Space>
      </Card>
    </Space>
  );
};

export default Dashboard;
