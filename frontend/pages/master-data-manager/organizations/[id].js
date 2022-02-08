/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import { useRouter } from "next/router";

/* API FETCHING */
import { dehydrate, QueryClient, useQuery } from "react-query";
import getOrganizationalEntity from "../../../utils/fetchers/getOrganizationalEntity";
import getEntityTypes from "../../../utils/fetchers/getEntityTypes";
import getOrganizationalEntities from "../../../utils/fetchers/getOrganizationalEntities";
import getOrganizationalEntityRootChildren from "../../../utils/fetchers/getOrganizationalEntityRootChildren";

/* API MUTATION */
import deleteEntity from "../../../utils/mutators/delete/deleteEntity";

/* COMPONENTS */
import EntityForm from "../../../components/forms/EntityForm";
import { Row, Col, Tree, Divider, Button } from "antd";

/* HOOKS */
import useDeleteConfirmation from "../../../custom_hooks/useDeleteConfirmation";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function Organization() {
  /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
  const router = useRouter();
  const { id: entityId } = router.query;

  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const entityQuery = useQuery(
    ["organizationalEntity", entityId, 10 /* depth param */],
    getOrganizationalEntity
  );

  const entityTypesQuery = useQuery(
    ["entityTypes", 2 /* depth param */],
    getEntityTypes
  );

  const parentEntitiesQuery = useQuery(
    ["organizationalEntities", 1 /* depth param */],
    getOrganizationalEntities
  );

  const treeQuery = useQuery(
    ["organizationalEntityRootChildren", 10],
    getOrganizationalEntityRootChildren
  );
  
  const entity = entityQuery.isSuccess && entityQuery.data[0];
  const entityTypes = entityTypesQuery.isSuccess && entityTypesQuery.data;
  const parentEntities = parentEntitiesQuery.isSuccess && parentEntitiesQuery.data;

  /* -----~~~~~>>>DELETION<<<~~~~~----- */
  const [DeleteModal, showDeleteModal] = useDeleteConfirmation(
    deleteEntity, // Api call
    "Deleted entity successfully", // Success Notification Text
    "organizationalEntityRootChildren", // Query to invalidate on success
    entityId, // Id to delete
    "Are you sure you want to delete this entity (and all its children)?", // Confirmation Text
    "/master-data-manager/organizations" // Next Link
  );

  /* --------------------------------------------------------------------------- */
  /* ~~~~~~RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* --------------------------------------------------------------------------- */
  if (entityQuery.isLoading) {
    return <>Loading...</>;
  }

  if (entityQuery.error) {
    return <>Error...</>;
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col flex={2}>
          <h2>
            {entity.name} ({entity.type.name})
          </h2>
          <EntityForm
            entityId={entityId}
            initialValues={entity}
            entityTypes={entityTypes}
            parentEntities={parentEntities}
          />
        </Col>
        <Divider type="vertical" style={{ minHeight: "45em" }} />
        <Col flex={1}>
          <h2>Position in Organizational Tree</h2>
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
              defaultSelectedKeys={[entity.id]}
              treeData={treeQuery.isSuccess && treeQuery.data}
              style={{ padding: "10px 0 0 10px", minHeigth: "100%" }}
              defaultExpandAll = {true}
            />
          </div>
        </Col>
      </Row>
      <Divider></Divider>
      <Row justify="center">
        <Button onClick={showDeleteModal} type="primary" danger>
          Delete Location
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

//   /* -----~~~~~>>>DATA FETCHING<<<~~~~~----- */
//   const entityId = context.params.id;

//   await queryClient.prefetchQuery(
//     ["organizationalEntity", entityId, 10 /* depth */],
//     getOrganizationalEntity
//   );

//   await queryClient.prefetchQuery(
//     ["entityTypes", 2 /* depth */],
//     getEntityTypes
//   );

//   await queryClient.prefetchQuery(
//     ["organizationalEntities", 1 /* depth */],
//     getOrganizationalEntities
//   );
//   await queryClient.prefetchQuery(["locations"], getLocations);

//   /* -----~~~~~>>>PASSING PROPS<<<~~~~~----- */
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }
