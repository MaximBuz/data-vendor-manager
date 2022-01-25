/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import { useRouter } from "next/router";

/* API FETCHING */
import { dehydrate, QueryClient, useQuery, useQueryClient } from "react-query";
import getDataConsumer from "../../../api_utils/api_fetchers/getDataConsumer";
import getOrganizationalEntityRootChildren from "../../../api_utils/api_fetchers/getOrganizationalEntityRootChildren";
import getActivityTags from "../../../api_utils/api_fetchers/getActivityTags";
import getLocations from "../../../api_utils/api_fetchers/getLocations";
import getJobs from "../../../api_utils/api_fetchers/getJobs";

/* API MUTATION */
import deleteEmployee from "../../../api_utils/api_mutators/delete/deleteEmployee";

/* COMPONENTS */
import EmployeeForm from "../../../components/forms/EmployeeForm";
import TrackerCard from "../../../components/cards/TrackerCard";
import { Row, Col, Divider, Button } from "antd";
import { MailOutlined } from "@ant-design/icons"

/* HOOKS */
import useDeleteConfirmation from "../../../custom_hooks/useDeleteConfirmation";
import useAddItemModal from "../../../custom_hooks/useAddItemModal";

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

  /* -----~~~~~>>>INSTALLING TRACKERS<<<~~~~~----- */
  const [_, installTrackerModal, showInstallTrackerModal] = useAddItemModal(
    "sendTrackerInstallEmail", //replace
    "building_name",
    "Successfully added new building!",
    "locationWithBuildings",
    "Add new building",
    { employee: employeeId } // Additional values
  );

  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const dataConsumerQuery = useQuery(
    ["dataConsumer", employeeId, 2 /* Depth */],
    getDataConsumer
  );
  const dataConsumer = dataConsumerQuery?.data;

  const activityTagsQuery = useQuery(
    ["activityTags", 0 /* Depth */],
    getActivityTags
  );
  const activityTags = activityTagsQuery?.data;

  const treeQuery = useQuery(
    ["organizationalEntityRootChildren", 10],
    getOrganizationalEntityRootChildren
  );

  const locationQuery = useQuery(["locations"], getLocations);

  const jobsQuery = useQuery(["jobs"], getJobs);

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
      <Row gutter={[16, 16]}>
        <Col flex={1}>
          <h2>
            Employee:{" "}
            {dataConsumer?.first_name +
              " " +
              dataConsumer?.last_name +
              " (" +
              dataConsumer?.email +
              ")"}
          </h2>
          <EmployeeForm
            initialValues={dataConsumer}
            activityTags={activityTags}
            organizationalTree={treeQuery?.data}
            locations={locationQuery?.data}
            jobs={jobsQuery?.data}
            employeeId={employeeId}
          />
        </Col>
        <Divider type="vertical" style={{ minHeight: "50em" }} />
        <Col flex={1}>
          <div
            style={{
              height: "70vh",
              /* overflowY: "scroll",
            scrollbarWidth: "none", */
            }}
          >
            <h2>Installed Trackers</h2>
            {/* {buildings.map((building) => {
              return <TrackerCard building={building} />;
            })} */}
            <TrackerCard tracker={{name: "Bloomberg Anywhere Tracker", id: "test"}} />
            {/* Install new tracker button */}
            {/* ------------------------------------------ */}
            <div
              onClick={showInstallTrackerModal}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0px",
                padding: "10px",
                borderRadius: "2px",
                borderStyle: "dashed",
                borderWidth: "1px",
                borderColor: "#d9d9d9",
                margin: "20px",
                color: "grey",
                cursor: "pointer",
              }}
            >
              <MailOutlined style={{ fontSize: '18px' }}/>
              Install new Tracker
            </div>
            {/* ------------------------------------------ */}
          </div>
        </Col>
      </Row>
      <Divider></Divider>
      <Row justify="center">
        <Button onClick={showDeleteModal} type="primary" danger>
          Delete Employee
        </Button>
      </Row>
      {DeleteModal}
    </>
  );
}

/* --------------------------------------------------------------------------- */
/* ~~~~~~SERVERSIDE RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */

// export async function getServerSideProps(context) {
//   /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
//   const queryClient = new QueryClient();
//   const employeeId = context.params.id;

//   /* -----~~~~~>>>DATA FETCHING<<<~~~~~----- */
//   await queryClient.prefetchQuery(
//     ["organizationalEntityRootChildren", 10 /* Depth */],
//     getOrganizationalEntityRootChildren
//   );
//   await queryClient.prefetchQuery(
//     ["dataConsumer", employeeId, 2 /* Depth */],
//     getDataConsumer
//   );
//   await queryClient.prefetchQuery(
//     ["activityTags", 0 /* Depth */],
//     getActivityTags
//   );
//   await queryClient.prefetchQuery(["locations"], getLocations);
//   await queryClient.prefetchQuery(["jobs"], getJobs);

//   /* -----~~~~~>>>PASSING PROPS<<<~~~~~----- */
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }
