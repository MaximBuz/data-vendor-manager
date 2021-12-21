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

// Data Mutation
import postBuilding from "../../../api_utils/api_mutators/post/postBuilding";
import deleteLocation from "../../../api_utils/api_mutators/delete/deleteLocation";

// Components
import EmployeeForm from "../../../components/forms/EmployeeForm";
import BuildingCard from "../../../components/cards/BuildingCard";
import { Row, Col, Tree, Divider, Modal, Form, Input, Button } from "antd";

// Styling
import { UilMapMarkerPlus } from "@iconscout/react-unicons";

// Notifications
import { toast } from "react-toastify";

// Custom Hooks
import useDeleteConfirmation from "../../../custom_hooks/useDeleteConfirmation";


export default function Employee() {
  // get id of the location
  const router = useRouter();
  const { id: employeeId } = router.query;

  //setting up mutations with react query
  const queryClient = useQueryClient();

  // Data fetching for employee data
  const dataConsumerQuery = useQuery(
    ["dataConsumer", employeeId, 2 /* Depth parameter */ ],
    getDataConsumer
  )
  const dataConsumer = dataConsumerQuery?.data;

  // Data fetching organizations tree structure
  const treeQuery = useQuery(
    ["organizationalEntityRootChildren", 10],
    getOrganizationalEntityRootChildren
  );

  const treeData =
    treeQuery.data &&
    JSON.parse(
      JSON.stringify(treeQuery.data)
        .split('"id":')
        .join('"key":')
        .split('"name":')
        .join('"title":')
    );

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
            Employee XXX
          </h2>
          <EmployeeForm initialValues={dataConsumer} />
        </Col>
        <Divider type="vertical" style={{ minHeight: "70vh" }} />
        <Col flex={1}>
          <h2>Organizational Affiliation</h2>
          {/* ------------------------------------------ */}
          <div
            style={{
              height: "40em",
              overflow: "scroll",
              backgroundColor: "white",
              border: "1px solid #d9d9d9",
            }}
          >
            <Tree
              showLine={{ showLeafIcon: false }}
              defaultExpandAll
              multiple={true}
              defaultSelectedKeys={[]}
              /* selectable= {false} */
              /* onSelect={"onSelect"} */
              treeData={treeData}
              style={{ padding: "10px 0 0 10px", minHeigth: "100%" }}
            />
          </div>
          {/* ------------------------------------------ */}
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

  // Prefetching organizational entities
  await queryClient.prefetchQuery(
    ["organizationalEntities", 1 /* Depth parameter */],
    getOrganizationalEntities
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
