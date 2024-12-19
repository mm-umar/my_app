import { Table } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toTitle } from "../lib/helper";

const ListViewPage = () => {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  const secondLastSegment = segments[segments.length - 2];
  const [data, setData] = useState<any | null>(null);
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
          const messageData = result.message;
          setData({
            keys: Array.isArray(messageData.keys) ? messageData.keys : [],
            values: Array.isArray(messageData.values) ? messageData.values : [],
          });
        } else {
          setData({ keys: [], values: [] });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData({ keys: [], values: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [secondLastSegment]);

  const columns =
    Array.isArray(data?.keys) &&
    data?.keys?.map((key: string | undefined) => ({
      title: toTitle(key),
      dataIndex: key,
      key,
      render:
        key === "image"
          ? (text: string) => (
              <img src={text} alt={key} style={{ width: 50, height: 50 }} />
            )
          : undefined,
    }));

  const dataSource =
    Array.isArray(data?.values) &&
    data?.values.map((valueArray: { [x: string]: any }, index: any) => {
      const record: Record<string, any> = { key: index };
      data?.keys?.forEach((key: string | number, i: string | number) => {
        record[key] = valueArray[i];
      });
      return record;
    });

  return (
    <Table
      columns={columns || []}
      dataSource={dataSource || []}
      loading={loading}
      pagination={{ pageSize: 5 }}
      scroll={{ x: "max-content" }}
      bordered
    />
  );
};

export default ListViewPage;
