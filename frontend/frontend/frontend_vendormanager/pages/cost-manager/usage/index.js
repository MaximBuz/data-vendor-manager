/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* API FETCHING */
import { dehydrate, useQuery, useQueryClient } from "react-query";
import getAggregatedUsage from "../../../api_utils/api_fetchers/getAggregatedUsage";
import getUsageStatisticsByDataConsumer from "../../../api_utils/api_fetchers/getUsageStatisticsByDataConsumer";

/* COMPONENTS */
import UsageOverTimeChart from "../../../components/charts/UsageOverTime";
import UsageByEntityChart from "../../../components/charts/UsageByEntity";
import UsageByActivityTagChart from "../../../components/charts/UsageByActivityTag";
import { Modal, Button, Statistic, Divider } from "antd";

/* HOOKS */
import { useState } from "react";

/* ------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */
export default function Home() {
  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const usageByTime = useQuery(
    [
      "aggregatedUsage",
      "time" /* ...group by */,
      {
        /* Filters */ freq: "d",
      },
    ],
    getAggregatedUsage
  );
  const usageByEntity = useQuery(
    [
      "aggregatedUsage",
      "entity" /* ...group by */,
      {
        /* Filters */
      },
    ],
    getAggregatedUsage
  );
  const usageByActivityTag = useQuery(
    [
      "aggregatedUsage",
      "activity-tag" /* ...group by */,
      {
        /* Filters */
      },
    ],
    getAggregatedUsage
  );
  const usageStatistics = useQuery(
    [
      "usageStatistics",
      {
        /* Filters */
      },
    ],
    getUsageStatisticsByDataConsumer
  );

  /* -----~~~~~>>>STYLING PARAMETERS<<<~~~~~----- */
  const smallChartContainerStyle = {
    width: "fit-content",
    maxWidth: "400px",
    height: "fit-content",
    padding: "20px",
    borderRadius: "2px",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "rgb(217, 217, 217)",
    backgroundColor: "white",
  };

  /* -----~~~~~>>>HANDLE USAGE OVER TIME MODAL<<<~~~~~----- */
  const [usageOverTimeModalVisibility, setUsageOverTimeModalVisibility] =
    useState(false);
  const closeUsageOverTimeModal = () => setUsageOverTimeModalVisibility(false);

  /* -----~~~~~>>>HANDLE USAGE BY ENTITY MODAL<<<~~~~~----- */
  const [usageByEntityModalVisibility, setUsageByEntityModalVisibility] =
    useState(false);
  const closeUsageByEntityModal = () => setUsageByEntityModalVisibility(false);

  /* -----~~~~~>>>HANDLE USAGE BY ACTIVITY TAG MODAL<<<~~~~~----- */
  const [usageByActivityTagModalVisibility, setUsageByActivityTagModalVisibility] =
    useState(false);
  const closeUsageByActivityTagModal = () => setUsageByActivityTagModalVisibility(false);

  /* --------------------------------------------------------------------------- */
  /* ~~~~~~RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* --------------------------------------------------------------------------- */
  if (usageByTime.isLoading) {
    return <>Loading...</>;
  }

  if (usageByTime.error) {
    return <>Error...</>;
  }

  return (
    <>
      <h2>Usage Analysis</h2>
      <p style={{ maxWidth: "550px" }}>
        Here you can see a variety of statistics on the usage of Market Data
        Services across your organization. You can easily filter, group and
        export data and see where potential savings might be possible.
      </p>
      <div style={{ display: "flex", flexDirection: "row", gap: "10px", overflowX: "scroll", padding: "0 0 10px 0"}}>
        {/* USAGE OVER TIME CHART SMALL TILE */}
        <div style={smallChartContainerStyle}>
          <UsageOverTimeChart
            usageDataQuery={usageByTime}
            size="small"
            openModal={setUsageOverTimeModalVisibility}
          />
        </div>

        {/* USAGE BY ENTITY CHART SMALL TILE */}
        <div style={smallChartContainerStyle}>
          <UsageByEntityChart
            usageDataQuery={usageByEntity}
            size="small"
            openModal={setUsageByEntityModalVisibility}
          />
        </div>
        
        {/* USAGE STATISTICS SMALL TILE */}
        <div style={{...smallChartContainerStyle, minWidth: "300px", minHeight: "100px"}}>
          <Statistic 
            title="Mean Usage Time (per Employee)" 
            value={usageStatistics.data[0].first_quartile}
            suffix="hours"
          />
          <Divider style={{margin: 6}}/>
          <Statistic
            title="Standart Deviation"
            value={usageStatistics.data[0].std.split(".")[0]}
            suffix="hours"
          />
        </div>

        {/* USAGE BY ACTIVITY TAG CHART SMALL TILE */}
        <div style={smallChartContainerStyle}>
          <UsageByActivityTagChart
            usageDataQuery={usageByActivityTag}
            size="small"
            openModal={setUsageByActivityTagModalVisibility}
          />
        </div>
      </div>

      {/* USAGE OVER TIME LARGE MODAL */}
      <Modal
        visible={usageOverTimeModalVisibility}
        okText="Close"
        closable={false}
        footer={[
          <Button type="secondary" onClick={closeUsageOverTimeModal}>
            Close
          </Button>,
        ]}
        onOk={closeUsageOverTimeModal}
        width={850}
      >
        <UsageOverTimeChart usageDataQuery={usageByTime} size="large" />
      </Modal>

      {/* USAGE BY ENTITY LARGE MODAL */}
      <Modal
        visible={usageByEntityModalVisibility}
        okText="Close"
        closable={false}
        footer={[
          <Button type="secondary" onClick={closeUsageByEntityModal}>
            Close
          </Button>,
        ]}
        onOk={closeUsageByEntityModal}
        width={850}
      >
        <UsageByEntityChart usageDataQuery={usageByEntity} size="large" />
      </Modal>
      
      {/* USAGE BY ACTIVITY TAG LARGE MODAL */}
      <Modal
        visible={usageByActivityTagModalVisibility}
        okText="Close"
        closable={false}
        footer={[
          <Button type="secondary" onClick={closeUsageByActivityTagModal}>
            Close
          </Button>,
        ]}
        onOk={closeUsageByActivityTagModal}
        width={850}
      >
        <UsageByActivityTagChart usageDataQuery={usageByActivityTag} size="large" />
      </Modal>
    </>
  );
}
