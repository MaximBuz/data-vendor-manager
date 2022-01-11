/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* DATA UTILS */
import parse from "parse-duration";

/* COMPONENTS */
import { Radio } from "antd";
import { FullscreenOutlined } from "@ant-design/icons";

/* CHARTS */
import { Line } from "@ant-design/plots";

/* HOOKS */
import { useState } from "react";

/* ------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */
export default function UsageOverTimeChart({
  usageDataQuery,
  size,
  openModal,
}) {
  /* -----~~~~~>>>INITIALIZE<<<~~~~~----- */
  const [durationType, setDurationType] = useState("h");

  /* -----~~~~~>>>DATA TRANSFORMATION<<<~~~~~----- */
  const newUsageData = usageDataQuery.data?.map((entry) => ({
    date: entry.start_time,
    hours: parse(
      `${entry.sum.split(":")[0]}h:${entry.sum.split(":")[0]}m`,
      durationType
    ),
  }));

  /* -----~~~~~>>>USER CONTROLS<<<~~~~~----- */
  const onRadioChange = (e) => setDurationType(e.target.value);

  /* -----~~~~~>>>CHART CONFIGURATION<<<~~~~~----- */

  const config = {
    data: newUsageData,
    autoFit: false,
    width: size == "small" ? 300 : size == "medium" ? 600 : 800,
    height: size == "small" ? 100 : size == "medium" ? 300 : 500,
    xField: "date",
    yField: "hours",
    point: {
      size: size == "small" ? 0 : size == "medium" ? 4 : 5,
      shape: "diamond",
    },
    tooltip: {
      formatter: (item) => {
        return {
          name:
            durationType == "d"
              ? "Days"
              : durationType == "h"
              ? "Hours"
              : durationType == "m"
              ? "Minutes"
              : "Error",
          value: Math.round(item.hours) + durationType,
        };
      },
    },
    yAxis: {
      label:
        size == "small"
          ? false
          : {
              autoRotate: true,
            },
    },
    xAxis: {
      label: {
        autoRotate: true,
      },
      tickCount: size == "small" ? 3 : size == "medium" ? 5 : 8,
    },
    slider:
      size == "small"
        ? false
        : size == "medium"
        ? false
        : {
            start: 0,
            end: 1,
          },
  };

  /* --------------------------------------------------------------------------- */
  /* ~~~~~~RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* --------------------------------------------------------------------------- */
  if (usageDataQuery.isLoading) {
    return <>Loading...</>;
  }

  if (usageDataQuery.error) {
    return <>Error...</>;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ marginBottom: "20px", lineHeight: "1em" }}>
          Usage over Time
        </h2>
        {size != "small" ? (
          <Radio.Group
            onChange={onRadioChange}
            value={durationType}
            defaultValue="treeView"
            style={{ marginBottom: "15px" }}
          >
            <Radio value="d">Days</Radio>
            <Radio value="h">Hours</Radio>
            <Radio value="m">Minutes</Radio>
          </Radio.Group>
        ) : (
          ""
        )}
        {size == "small" && (
          <FullscreenOutlined
            onClick={openModal}
            style={{ marginBottom: "20px" }}
          />
        )}
      </div>
      <Line {...config} />
    </>
  );
}
