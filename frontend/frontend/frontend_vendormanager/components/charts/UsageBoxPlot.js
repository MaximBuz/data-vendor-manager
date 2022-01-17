/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* DATA UTILS */
import parse from "parse-duration";

/* COMPONENTS */
import { Radio, Spin, Empty } from "antd";
import { FullscreenOutlined } from "@ant-design/icons";

/* CHARTS */
import { Box } from "@ant-design/plots";

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
  const transformedData = usageDataQuery.data?.map((entry) => ({
    interval: entry.interval,
    min: parse(entry.min,durationType),
    first_quartile: parse(entry.first_quartile,durationType),
    second_quartile: parse(entry.second_quartile,durationType),
    third_quartile: parse(entry.third_quartile,durationType),
    max: parse(entry.max,durationType),
  }));

  /* -----~~~~~>>>USER CONTROLS<<<~~~~~----- */
  const onRadioChange = (e) => setDurationType(e.target.value);

  /* -----~~~~~>>>CHART CONFIGURATION<<<~~~~~----- */

  const config = {
    data: transformedData,
    width: size == "small" ? 300 : size == "medium" ? 600 : 800,
    height: size == "small" ? 100 : size == "medium" ? 300 : 500,
    xField: 'interval',
    yField: ['min', 'first_quartile', 'second_quartile', 'third_quartile', 'max'],
    boxStyle: {
      stroke: '#545454',
      fill: '#6294F9',
      fillOpacity: 0.8,
    },
    tooltip: size == "small" ? false : true,
    meta: {
      min: {
        alias: 'Minimum',
      },
      first_quartile: {
        alias: '1Q',
      },
      second_quartile: {
        alias: 'Median',
      },
      third_quartile: {
        alias: '3Q',
      },
      max: {
        alias: 'Maximum',
      },
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
          Usage Box Plots
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
      <Box {...config} />
    </>
  );
}
