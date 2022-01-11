/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* API FETCHING */
import { dehydrate, useQuery, useQueryClient } from "react-query";
import getAggregatedUsage from "../../../api_utils/api_fetchers/getAggregatedUsage";

/* COMPONENTS */
import UsageOverTimeChart from "../../../components/charts/UsageOverTime";
import { Modal, Button } from "antd";

/* HOOKS */
import { useState } from "react";

/* ------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */
export default function Home() {
  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const usageDataQuery = useQuery(
    [
      "aggregatedUsage",
      "time" /* ...group by */,
      {
        /* Filters */
        freq: "d",
      },
    ],
    getAggregatedUsage
  );

  /* -----~~~~~>>>MODALS<<<~~~~~----- */
  const openusageOverTimeModal = {};
  const [usageOverTimeModalVisibility, setUsageOverTimeModalVisibility] =
    useState(false);
  const handleCancel = () => {
    setUsageOverTimeModalVisibility(false);
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
      <h2>Usage Analysis</h2>
      <p style={{ maxWidth: "550px" }}>
        Here you can see a variety of statistics on the usage of Market Data
        Services across your organization. You can easily filter, group and
        export data and see where potential savings might be possible.
      </p>
      <div style={{ display: "flex", width: "100%" }}>
        <div
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: "20px",
            borderRadius: "2px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "rgb(217, 217, 217)",
            margin: "20px",
            backgroundColor: "white",
          }}
        >
          {/* USAGE OVER TIME CHART SMALL TILE */}
          <UsageOverTimeChart
            usageDataQuery={usageDataQuery}
            size="small"
            openModal={setUsageOverTimeModalVisibility}
          />
        </div>
      </div>

      {/* USAGE OVER TIME LARGE MODAL */}
      <Modal
        visible={usageOverTimeModalVisibility}
        okText="Close"
        closable={false}
        footer={[
          <Button type="secondary" onClick={handleCancel}>
            Close
          </Button>,
        ]}
        onOk={handleCancel}
        width={850}
      >
        <UsageOverTimeChart usageDataQuery={usageDataQuery} size="large" />
      </Modal>
    </>
  );
}
