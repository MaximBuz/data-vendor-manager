// React
import { useState } from "react";

// Routing
import { useRouter } from "next/router";

// Data Fetching
import {
  dehydrate,
  QueryClient,
  useQuery,
  useMutation,
  useQueryClient,
} from "react-query";
import getDataConsumer from "../../../api_utils/api_fetchers/getDataConsumer";
import getOrganizationalEntities from "../../../api_utils/api_fetchers/getOrganizationalEntities";
import getOrganizationalEntityRootChildren from "../../../api_utils/api_fetchers/getOrganizationalEntityRootChildren";
import getActivityTags from "../../../api_utils/api_fetchers/getActivityTags";
import getLocations from "../../../api_utils/api_fetchers/getLocations";
import getJobs from "../../../api_utils/api_fetchers/getJobs";


// Data Mutation
import deleteLocation from "../../../api_utils/api_mutators/delete/deleteLocation";

// Components
import EmployeeForm from "../../../components/forms/EmployeeForm";
import { Row, Col, Tree, Divider, Button } from "antd";

// Notifications
import { toast } from "react-toastify";

// Custom Hooks
import useDeleteConfirmation from "../../../custom_hooks/useDeleteConfirmation";

export default function Employee() {
  /* get id of the location */
  const router = useRouter();
  const { id: employeeId } = router.query;

  /* setting up mutations with react query */
  const queryClient = useQueryClient();

  /* Data fetching */
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
          />
        </Col>
        <Divider type="vertical" style={{ minHeight: "50em" }} />
        <Col flex={1}>
          <h2>Vendor Connections</h2>
        </Col>
      </Row>
      <Divider></Divider>
      <Row justify="center">
        <Button onClick={"showDeleteModal"} type="primary" danger>
          Delete Location
        </Button>
      </Row>
      {/* {DeleteModal} */}
    </>
  );
}

export async function getServerSideProps(context) {
  // Initializing cache from React Query
  const queryClient = new QueryClient();

  const employeeId = context.params.id;

  // Prefetching data
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
  await queryClient.prefetchQuery(
    ["locations"],
    getLocations
  );
  await queryClient.prefetchQuery(
    ["jobs"],
    getJobs
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
