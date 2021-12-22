// Routing
import { useRouter } from "next/router";

// Data Fetching
import { dehydrate, QueryClient, useQuery } from "react-query";
import getOrganizationalEntity from "../../../api_utils/api_fetchers/getOrganizationalEntity";
import getEntityTypes from "../../../api_utils/api_fetchers/getEntityTypes";
import getOrganizationalEntities from "../../../api_utils/api_fetchers/getOrganizationalEntities";
import getOrganizationalEntityRootChildren from "../../../api_utils/api_fetchers/getOrganizationalEntityRootChildren";
import getLocations from "../../../api_utils/api_fetchers/getLocations";

// Data mutation 
import deleteEntity from "../../../api_utils/api_mutators/delete/deleteEntity";

// Components
import EntityForm from "../../../components/forms/EntityForm";
import { Row, Col, Tree, Divider, Button } from "antd";

// Custom Hooks
import useDeleteConfirmation from "../../../custom_hooks/useDeleteConfirmation";

export default function Organization() {

  // get id of the organizational entity
  const router = useRouter();
  const { id: entityId } = router.query;

  // Data fetching for entity
  const entityQuery = useQuery(
    ["organizationalEntity", entityId, 10 /* depth param */],
    getOrganizationalEntity
  );
  const entity = entityQuery.data[0];

  // Data fetching for entity types dropdown
  const entityTypesQuery = useQuery(
    ["entityTypes", 2 /* depth param */],
    getEntityTypes
  );
  const entityTypes = entityTypesQuery?.data;

  // Data fetching for parents dropdown
  const parentEntitiesQuery = useQuery(
    ["organizationalEntities", 1 /* depth param */],
    getOrganizationalEntities
  );
  const parentEntities = parentEntitiesQuery?.data;

  // Data fetching tree structure
  const treeQuery = useQuery(
    ["organizationalEntityRootChildren", 10],
    getOrganizationalEntityRootChildren
  );
  // Handle deletion
  const [DeleteModal, showDeleteModal] = useDeleteConfirmation(
    deleteEntity, // Api call
    "Deleted entity successfully", // Success Notification Text
    "organizationalEntityRootChildren", // Query to invalidate on success
    entityId, // Id to delete
    "Are you sure you want to delete this entity (and all its children)?", // Confirmation Text 
    "/master-data-manager/organizations" // Next Link
  );

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
          <EntityForm initialValues={entity} entityTypes={entityTypes} parentEntities={parentEntities}/>
        </Col>
        <Divider type="vertical" style={{minHeight: "45em"}}/>
        <Col
          flex={1}
        >
          <h2>Position in Organizational Tree</h2>
          <div style={{height: "40em", overflow:"scroll", backgroundColor: "white", border: "1px solid #d9d9d9"}}>

          <Tree
            showLine = {{showLeafIcon: false}}
            defaultExpandAll
            defaultSelectedKeys={[entity.id]}
            /* selectable= {false} */
            /* onSelect={"onSelect"} */
            treeData={treeQuery?.data}
            style={{ padding: "10px 0 0 10px", minHeigth: "100%"}}
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

export async function getServerSideProps(context) {
  // Initializing cache from React Query
  const queryClient = new QueryClient();

  /* 
  --------------------------------------
  Get the data on the entity
  --------------------------------------
  */

  // get the id of the entity
  const entityId = context.params.id;

  // fetch entity data and put into cache
  await queryClient.prefetchQuery(
    ["organizationalEntity", entityId, 10 /* depth param */],
    getOrganizationalEntity
  );

  /* 
  --------------------------------------
  Get options for "Type" dropdown in the form
  --------------------------------------
  */

  await queryClient.prefetchQuery(
    ["entityTypes", 2 /* depth param */],
    getEntityTypes
  );


  /* 
  --------------------------------------
  Get options for "Parent" dropdown in the form
  --------------------------------------
  */

  await queryClient.prefetchQuery(
    ["organizationalEntities", 1 /* depth param */],
    getOrganizationalEntities
  );


  /* 
  --------------------------------------
  Get options for "Locations" dropdown in the form
  --------------------------------------
  */

  await queryClient.prefetchQuery(
    ["locations"],
    getLocations
  );



  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
