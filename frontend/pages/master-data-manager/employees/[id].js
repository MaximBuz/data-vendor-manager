/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import { useRouter } from "next/router";

/* API FETCHING */
import { dehydrate, QueryClient, useQuery, useQueryClient } from "react-query";
import getDataConsumer from "../../../utils/fetchers/getDataConsumer";
import getOrganizationalEntityRootChildren from "../../../utils/fetchers/getOrganizationalEntityRootChildren";
import getActivityTags from "../../../utils/fetchers/getActivityTags";
import getLocations from "../../../utils/fetchers/getLocations";
import getJobs from "../../../utils/fetchers/getJobs";

/* API MUTATION */
import deleteEmployee from "../../../utils/mutators/delete/deleteEmployee";

/* COMPONENTS */
import EmployeeForm from "../../../components/forms/EmployeeForm";
import { Row, Col, Divider, Button } from "antd";

/* HOOKS */
import useDeleteConfirmation from "../../../custom_hooks/useDeleteConfirmation";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function Employee() {
  /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
  const router = useRouter();
  const { id: employeeId } = router.query;

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
  const dataConsumer = dataConsumerQuery.isSuccess && dataConsumerQuery.data;

  const activityTagsQuery = useQuery(
    ["activityTags", 0 /* Depth */],
    getActivityTags
  );
  const activityTags = activityTagsQuery.isSuccess && activityTagsQuery.data;

  const treeQuery = useQuery(
    ["organizationalEntityRootChildren", 10],
    getOrganizationalEntityRootChildren
  );

  const locationsQuery = useQuery(["locations"], getLocations);

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

  if (locationsQuery.isLoading) {
    return <>Loading...</>;
  }

  if (locationsQuery.error) {
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
            organizationalTree={treeQuery.isSuccess && treeQuery.data}
            locations={locationsQuery.isSuccess && locationsQuery.data}
            jobs={jobsQuery.isSuccess && jobsQuery.data}
            employeeId={employeeId}
          />
        </Col>
        <Divider type="vertical" style={{ minHeight: "50em" }} />
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
