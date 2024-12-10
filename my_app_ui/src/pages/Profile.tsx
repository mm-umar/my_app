import { Card, Avatar, Typography, Row, Col, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

const Profile = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Software Developer passionate about React and Node.js. Enthusiastic about open-source contributions.",
    avatarUrl: "https://joeschmoe.io/api/v1/johndoe", // You can replace with a dynamic URL or from your API
  };

  return (
    <div style={{ padding: "20px" }}>
      <Card
        style={{ maxWidth: 600, margin: "auto" }}
        cover={
          <Avatar size={120} src={user.avatarUrl} style={{ margin: "auto" }} />
        }
        actions={[
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => alert("Edit profile")}
            style={{ width: "100%" }}
          >
            Edit Profile
          </Button>,
        ]}
      >
        <Typography.Title level={2} style={{ textAlign: "center" }}>
          {user.name}
        </Typography.Title>
        <Typography.Paragraph style={{ textAlign: "center" }}>
          <strong>{user.email}</strong>
        </Typography.Paragraph>

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Typography.Text strong>Bio:</Typography.Text>
          </Col>
          <Col span={12}>
            <Typography.Text>{user.bio}</Typography.Text>
          </Col>
        </Row>

        {/* You can add more user details here, like phone, address, etc. */}
      </Card>
    </div>
  );
};

export default Profile;
