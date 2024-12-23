import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toTitle, toSlug } from "../lib/helper";
import { Button, Card, Col, Row, Space, Spin } from "antd";

const DesktopPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const lastSegment = location.pathname.split("/").pop();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const sections = data ? Object.keys(data).map((key) => key) : [];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const page = { name: toTitle(lastSegment) };
      const formData = new FormData();
      formData.append("page", JSON.stringify(page));
      try {
        const response = await fetch(
          import.meta.env.VITE_BASE_PATH +
            "/api/method/frappe.desk.desktop.get_desktop_page",
          {
            method: "POST",
            headers: { "X-Frappe-CSRF-Token": import.meta.env.VITE_CSRF_TOKEN },
            body: formData,
          }
        );
        const result = await response.json();

        if (result?.message) {
          setData(result?.message);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    if (lastSegment) {
      fetchData();
    }
  }, [lastSegment]);

  // Handle link click with replace path
  const handleLinkClick = (slug: string) => {
    navigate(`/${slug}`, { replace: true });
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" style={{ marginTop: "20px" }} />
        </div>
      ) : (
        <Space direction="vertical" style={{ width: "100%" }}>
          {sections?.map(
            (section) =>
              data[section]?.items?.length > 0 && (
                <Card
                  key={section}
                  title={toTitle(section)}
                  style={{ border: "solid 2px #1890ff" }}
                >
                  <Row gutter={[10, 10]}>
                    {data[section]?.items?.map((item: any, index: number) => (
                      <Col key={index} span={6}>
                        <Button
                          key={index}
                          className="w-full"
                          onClick={() =>
                            handleLinkClick(`${toSlug(item.label)}/list`)
                          }
                        >
                          {item.label}
                        </Button>
                      </Col>
                    ))}
                  </Row>
                </Card>
              )
          )}
        </Space>
      )}
    </div>
  );
};

export default DesktopPage;
