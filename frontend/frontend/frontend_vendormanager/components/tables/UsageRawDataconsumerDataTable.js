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
export default function UsageByDataConsumerDataTable({
  data,
  isLoading,
  scrollView,
  rowSelection,
}) {
  /* -----~~~~~>>>COLUMN DEFINITION<<<~~~~~----- */
  const columns = [
    {
      title: "Start",
      sorter: (a, b) => parse(a.usage_time,"m") - parse(b.usage_time,"m"),
      children : [{
        title: "Date",
        render: (text, record) => record.start_time.split("T")[0]
      }, {
        title: "Time",
        render: (text, record) => record.start_time.split("T")[1]
      }]
    },
    {
      title: "Usage Time",
      render: (text, record) => record.usage_time.replaceAll(":", " ").replace("d", " Days, "),
      sorter: (a, b) => parse(a.usage_time,"m") - parse(b.usage_time,"m"),
      fixed: "left",
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
          rowSelection={rowSelection}
          dataSource={data}
          scroll={scrollView}
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
