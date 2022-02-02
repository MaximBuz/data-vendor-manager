/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* DATA UTILS */
import parse from "parse-duration";

/* COMPONENTS */
import { Radio, Spin, Empty } from "antd";
import { FullscreenOutlined } from "@ant-design/icons";

/* CHARTS */
import { Bar } from "@ant-design/plots";

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
  const transformedData = usageDataQuery.data && usageDataQuery.data.map((entry) => ({
    activity_tag_pk: entry.activity_tag_pk,
    activity_tag: entry.activity_tag,
    duration: parse(
      entry.usage_time,
      durationType
    ),
  }));

  /* -----~~~~~>>>USER CONTROLS<<<~~~~~----- */
  const onRadioChange = (e) => setDurationType(e.target.value);

  /* -----~~~~~>>>CHART CONFIGURATION<<<~~~~~----- */

  const config = {
    data: transformedData,
    width: size == "small" ? 300 : size == "medium" ? 600 : 800,
    height: size == "small" ? 100 : size == "medium" ? 300 : 500,
    xField: "duration",
    yField: "activity_tag",
    barWidthRatio: size == "small" ? 0.3 : size == "medium" ? 0.4 : 0.4,
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
          value: Math.round(item.duration) + durationType,
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
    scrollbar:
      size == "small"
        ? false
        : size == "medium"
        ? false
        : {
            type: "vertical",
          },
  };

  /* --------------------------------------------------------------------------- */
  /* ~~~~~~RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* --------------------------------------------------------------------------- */
  if (usageDataQuery.isLoading) {
    return <Spin/>;
  }

  if (usageDataQuery.error) {
    return <Empty/>;
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
          Usage by Activity Tag
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
      <Bar {...config} />
    </>
  );
}
