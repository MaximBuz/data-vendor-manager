/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import Link from "next/link";

/* COMPONENTS */
import { Table, Input, Button, Space, Empty, Tooltip } from "antd";
import {
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";

/* DATA UTILS */
import parse from "parse-duration";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function UsageRawDataconsumerDataTable({
  data,
  isLoading,
}) {
  /* -----~~~~~>>>COLUMN DEFINITION<<<~~~~~----- */
  const columns = [
    {
      title: "Start",
      sorter: (a, b) => Date.parse(a.start_time) - Date.parse(b.start_time),
      children : [{
        title: "Date",
        render: (text, record) => record.start_time.split("T")[0]
      }, {
        title: "Time",
        render: (text, record) => record.start_time.split("T")[1]
      }]
    },{
      title: "End",
      sorter: (a, b) => Date.parse(a.end_time) - Date.parse(b.end_time),
      children : [{
        title: "Date",
        render: (text, record) => record.end_time.split("T")[0]
      }, {
        title: "Time",
        render: (text, record) => record.end_time.split("T")[1]
      }]
    },
    {
      title: "Usage Time",
      render: (text, record) => record.usage_time.replaceAll(":", " ").replace("d", " Days, "),
      sorter: (a, b) => parse(a.usage_time,"m") - parse(b.usage_time,"m"),
    },
  ];

  /* --------------------------------------------------------------------------- */
  /* ~~~~~~RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* --------------------------------------------------------------------------- */
  if (!isLoading) {
    return (
      <>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="start_time"
        />
      </>
    );
  } else if (isLoading) {
    return (
      <>
        {/* Here we can put an animated loading thingy */}
        Loading...
      </>
    );
  } else if (!data) {
    return <Empty />;
  }
}
