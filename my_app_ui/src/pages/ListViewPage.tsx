import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toTitle } from "../lib/helper";
import { Table, Typography, message } from "antd";

const { Title } = Typography;

interface Data {
  keys: string[];
  values: any[][];
}

const ListViewPage = () => {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  const secondLastSegment = segments[segments.length - 2];
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!secondLastSegment) return;

      setLoading(true);
      const doctype = toTitle(secondLastSegment);
      const fields = JSON.stringify(["*"]);

      const formData = new FormData();
      formData.append("doctype", doctype);
      formData.append("fields", fields);

      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BASE_PATH
          }/api/method/frappe.desk.reportview.get`,
          {
            method: "POST",
            headers: { "X-Frappe-CSRF-Token": import.meta.env.VITE_CSRF_TOKEN },
            body: formData,
          }
        );
        const result = await response.json();

        if (result?.message) {
          setData(result.message);
        } else {
          setData({ keys: [], values: [] });
          message.warning("No data found!");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch data. Please try again later.");
        setData({ keys: [], values: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [secondLastSegment]);

  const columns =
    data?.keys?.map((key) => ({
      title: toTitle(key), // Capitalize column titles
      dataIndex: key,
      key,
      render:
        key === "image"
          ? (text: string) => (
              <img src={text} alt={key} style={{ width: 50, height: 50 }} />
            )
          : undefined,
    })) || [];

  const dataSource =
    data?.values?.map((valueArray, index) => {
      const record: Record<string, any> = { key: index };
      data?.keys.forEach((key, i) => {
        record[key] = valueArray[i];
      });
      return record;
    }) || [];

  return (
    <Table
      title={() => <Title level={4}>{toTitle(secondLastSegment)} List</Title>}
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      bordered
      pagination={{ pageSize: 5 }}
      scroll={{ x: "max-content" }}
    />
  );
};

export default ListViewPage;
