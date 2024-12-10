import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/"); // Adjust the path to your home page
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={handleBackHome}>
          Back to Home
        </Button>
      }
      style={{ padding: "50px" }}
    />
  );
};

export default NotFound;
