import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { convertSlugToTitle } from "../lib/helper";
import { Button, Card, Col, Row, Space } from "antd";

const DynamicPage = () => {
  const location = useLocation();
  const lastSegment = location.pathname.split("/").pop();
  const [data, setData] = useState<any>();
  const sections = data ? Object.keys(data).map((key) => key) : [];

  // Fetch data using useEffect
  useEffect(() => {
    const fetchData = async () => {
      const page = { name: convertSlugToTitle(lastSegment) };
      const formData = new FormData();
      formData.append("page", JSON.stringify(page));
      try {
        const response = await fetch(
          import.meta.env.VITE_BASE_PATH +
            "/api/method/frappe.desk.desktop.get_desktop_page",
          {
            method: "POST",
            headers: {
              "X-Frappe-CSRF-Token": import.meta.env.VITE_CSRF_TOKEN,
            },
            body: formData,
          }
        );
        const result = await response.json();

        // Ensure data is an array
        if (result?.message) {
          setData(result?.message); // Store fetched data in state
        } else {
          setData([]); // Fallback to empty array if the data is not an array
        }
      } catch (error) {
        console.error("Error fetching data:", error); // Handle errors
        setData([]); // Ensure empty array if there's an error
      }
    };

    if (lastSegment) {
      fetchData(); // Call the async function
    }
  }, [lastSegment]); // Effect now runs whenever `lastSegment` changes

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {sections?.map(
        (section) =>
          data[section]?.items?.length > 0 && (
            <Card
              key={section}
              title={convertSlugToTitle(section)}
              style={{
                border: "solid 2px #1890ff", // Adjust border color to match Ant Design's blue
              }}
            >
              <Row gutter={[10, 10]}>
                {data[section]?.items?.map((item: any, index: number) => (
                  <Col key={index} span={6}>
                    <Button key={index} className="w-full">
                      {item.label}
                    </Button>
                  </Col>
                ))}
              </Row>
            </Card>
          )
      )}
    </Space>
  );
};

export default DynamicPage;
