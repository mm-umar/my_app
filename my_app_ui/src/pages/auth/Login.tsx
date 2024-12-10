import { useState } from "react";
import { Form, Input, Button, Card, Typography, message, Space } from "antd";
import { useFrappeAuth } from "frappe-react-sdk";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useFrappeAuth();
  const navigate = useNavigate();

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    setIsLoading(true);
    const { username, password } = values;

    try {
      const res = await login({ username, password });
      if (res.message === "Logged In") {
        navigate("/");
      } else {
        message.error("Unexpected response during login.");
      }
    } catch (err: any) {
      message.error(err.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

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
            Login
          </Title>
        }
        style={{ width: 400, maxWidth: "100%" }}
      >
        <Form
          layout="vertical"
          onFinish={handleLogin}
          requiredMark={false}
          style={{ width: "100%" }}
        >
          <Form.Item
            label="Username/Email"
            name="username"
            rules={[{ required: true, message: "Please enter your username." }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password." }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isLoading}
            size="large"
          >
            Login
          </Button>
        </Form>
      </Card>
    </Space>
  );
};

export default Login;
