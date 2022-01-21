/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import { useRouter } from "next/router";

/* CHARTS */
import UsageOverTimeChart from "../../../components/charts/UsageOverTime";

/* API FETCHING */
import { dehydrate, QueryClient, useQuery, useQueryClient } from "react-query";
import getDataConsumer from "../../../api_utils/api_fetchers/getDataConsumer";
import getOrganizationalEntityRootChildren from "../../../api_utils/api_fetchers/getOrganizationalEntityRootChildren";
import getActivityTags from "../../../api_utils/api_fetchers/getActivityTags";
import getLocations from "../../../api_utils/api_fetchers/getLocations";
import getJobs from "../../../api_utils/api_fetchers/getJobs";
import getAggregatedUsage from "../../../api_utils/api_fetchers/getAggregatedUsage";
import getUsageRawDataconsumer from "../../../api_utils/api_fetchers/getUsageRawDataConsumer"

/* API MUTATION */
import deleteEmployee from "../../../api_utils/api_mutators/delete/deleteEmployee";

/* COMPONENTS */
import EmployeeForm from "../../../components/forms/EmployeeForm";
import {
  Row,
  Col,
  Divider,
  Popover,
  Tree,
  Modal,
  Button,
  Spin,
  Empty,
} from "antd";

/* HOOKS */
import useDeleteConfirmation from "../../../custom_hooks/useDeleteConfirmation";
import { useState } from "react";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function Employee() {
  /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
  const router = useRouter();
  const { id: employeeId } = router.query;

  const queryClient = useQueryClient();

  /* -----~~~~~>>>DELETION<<<~~~~~----- */
  const [DeleteModal, showDeleteModal] = useDeleteConfirmation(
    deleteEmployee, // Api call
    "Deleted employee successfully", // Success Notification Text
    "dataConsumers", // Query to invalidate on success
    employeeId, // Id to delete
    "Are you sure you want to delete this employee?", // Confirmation Text
    "/master-data-manager/employees" // Next Link
  );

  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const dataConsumerQuery = useQuery(
    ["dataConsumer", employeeId, 2 /* Depth */],
    getDataConsumer
  );
  const dataConsumer = dataConsumerQuery?.data;

  const treeQuery = useQuery(
    ["organizationalEntityRootChildren", 10],
    getOrganizationalEntityRootChildren
  );

  const usageByTime = useQuery(
    [
      "aggregatedUsage",
      "time" /* ...group by */,
      {
        data_consumer: [employeeId],
        freq: "d",
      },
    ],
    getAggregatedUsage
  );

  const rawUsage = useQuery(["rawUsage", employeeId], getUsageRawDataconsumer);

  /* -----~~~~~>>>HANDLE USAGE OVER TIME MODAL<<<~~~~~----- */
  const [usageOverTimeModalVisibility, setUsageOverTimeModalVisibility] =
    useState(false);
  const closeUsageOverTimeModal = () => setUsageOverTimeModalVisibility(false);

  /* -----~~~~~>>>STYLING PARAMETERS<<<~~~~~----- */
  const smallChartContainerStyle = {
    width: "fit-content",
    maxWidth: "400px",
    height: "fit-content",
    minHeight: "150px",
    minWidth: "350px",
    padding: "20px",
    borderRadius: "2px",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "rgb(217, 217, 217)",
    backgroundColor: "white",
  };

  /* --------------------------------------------------------------------------- */
  /* ~~~~~~RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* --------------------------------------------------------------------------- */
  if (dataConsumerQuery.isLoading) {
    return <>Loading...</>;
  }

  if (dataConsumerQuery.error) {
    return <>Error...</>;
  }

  return (
    <>
      <Row>
        <Col span={6}>
          <Row justify="center">
            <img
              src="http://127.0.0.1:8000/api/random-default-avatar/"
              width={180}
            ></img>
          </Row>
          <Row justify="center" style={{ marginBottom: "30px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p style={{ margin: "0", fontSize: "2em" }}>
                {dataConsumer?.first_name + " " + dataConsumer?.last_name}
              </p>
              <p style={{ margin: "0" }}>{dataConsumer?.email}</p>
            </div>
          </Row>

          <Divider
            orientation="middle"
            plain
            style={{
              color: "grey",
              fontWeight: "lighter",
              marginBottom: "0px",
            }}
          >
            Job Title
          </Divider>
          <Row justify="center" style={{ marginBottom: "30px" }}>
            {dataConsumer?.job_title?.title}
          </Row>

          <Divider
            orientation="middle"
            plain
            style={{
              color: "grey",
              fontWeight: "lighter",
              marginBottom: "0px",
            }}
          >
            Activities
          </Divider>
          <Row justify="center" style={{ marginBottom: "30px" }}>
            <Popover
              title="Activities of this Employee"
              trigger="hover"
              content={dataConsumer?.activity?.map((tag) => {
                return <Row justify="center">{tag.name}</Row>;
              })}
            >
              {dataConsumer?.activity?.map((tag) => tag.name).join(", ")}
            </Popover>
          </Row>

          <Divider
            orientation="middle"
            plain
            style={{
              color: "grey",
              fontWeight: "lighter",
              marginBottom: "0px",
            }}
          >
            Business Affiliation
          </Divider>
          <Row justify="center" style={{ marginBottom: "30px" }}>
            <Popover
              title="Position in Organizational Hierarchy"
              trigger="hover"
              content={
                <Tree
                  showLine={{ showLeafIcon: false }}
                  defaultSelectedKeys={[
                    dataConsumer?.organizational_entity?.id,
                  ]}
                  treeData={treeQuery?.data}
                  defaultExpandAll={true}
                />
              }
            >
              {dataConsumer?.organizational_entity?.name}
            </Popover>
          </Row>

          <Divider
            orientation="middle"
            plain
            style={{
              color: "grey",
              fontWeight: "lighter",
              marginBottom: "0px",
            }}
          >
            Location
          </Divider>
          <Row justify="center" style={{ marginBottom: "30px" }}>
            <Popover
              title="Location of Employee"
              trigger="hover"
              content={
                <>
                  <Row justify="center">
                    {dataConsumer.building.building_name}
                  </Row>
                  <Row justify="center">
                    {"Floor: " +
                      dataConsumer.floor +
                      ", Seat: " +
                      dataConsumer.seat}
                  </Row>
                  <Divider style={{ margin: "10px" }}></Divider>
                  <Row justify="center">
                    {dataConsumer.location.street +
                      " " +
                      dataConsumer.location.street_nr}
                  </Row>
                  <Row justify="center">
                    {dataConsumer.location.zip_code +
                      " " +
                      dataConsumer.location.city}
                  </Row>
                  <Divider style={{ margin: "10px" }}></Divider>
                  <Row justify="center">{dataConsumer.location.state}</Row>
                  <Row justify="center">{dataConsumer.location.country}</Row>
                </>
              }
            >
              {`${
                dataConsumer.location.city +
                ", " +
                dataConsumer.location.country
              }`}
            </Popover>
          </Row>
        </Col>
        <Divider
          type="vertical"
          style={{ height: "auto", minHeight: "70vh" }}
        ></Divider>
        <Col span={17}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              overflowX: "scroll",
              padding: "0 0 5px 0",
              margin: "0 0 20px 0",
            }}
          >
            {/* USAGE OVER TIME CHART SMALL TILE */}
            <div style={smallChartContainerStyle}>
              <UsageOverTimeChart
                usageDataQuery={usageByTime}
                size="small"
                openModal={setUsageOverTimeModalVisibility}
              />
            </div>

            {/* USAGE STATISTICS SMALL TILE */}
            <div
              style={{
                ...smallChartContainerStyle,
                minWidth: "350px",
                minHeight: "150px",
              }}
            >
              {true ? (
                <Spin />
              ) : true ? (
                <Empty />
              ) : (
                <>
                  <Statistic
                    title="Total Usage Time"
                    /* value={usageStatistics.data && parse(usageStatistics.data[0].mean, "h").toFixed(2)} */
                    suffix="hours"
                  />
                </>
              )}
            </div>
          </div>
        </Col>
      </Row>

      {/* -----~~~~~>>>OPENING LARGE MODALS OF CHARTS<<<~~~~~----- */}

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
    </>
  );
}

/* --------------------------------------------------------------------------- */
/* ~~~~~~SERVERSIDE RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */

export async function getServerSideProps(context) {
  /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
  const queryClient = new QueryClient();
  const employeeId = context.params.id;

  /* -----~~~~~>>>DATA FETCHING<<<~~~~~----- */
  await queryClient.prefetchQuery(
    ["organizationalEntityRootChildren", 10 /* Depth */],
    getOrganizationalEntityRootChildren
  );
  await queryClient.prefetchQuery(
    ["dataConsumer", employeeId, 2 /* Depth */],
    getDataConsumer
  );
  await queryClient.prefetchQuery(
    ["activityTags", 0 /* Depth */],
    getActivityTags
  );
  await queryClient.prefetchQuery(["locations"], getLocations);
  await queryClient.prefetchQuery(["jobs"], getJobs);

  /* -----~~~~~>>>PASSING PROPS<<<~~~~~----- */
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
