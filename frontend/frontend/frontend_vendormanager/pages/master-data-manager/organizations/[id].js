// Routing
import { useRouter } from "next/router";

// Data Fetching
import { dehydrate, QueryClient, useQuery } from "react-query";
import getOrganizationalEntity from "../../../api_utils/api_fetchers/getOrganizationalEntity";
import getEntityTypes from "../../../api_utils/api_fetchers/getEntityTypes";
import getOrganizationalEntities from "../../../api_utils/api_fetchers/getOrganizationalEntities";
import getLocations from "../../../api_utils/api_fetchers/getLocations";

// Components
import EntityForm from "../../../components/forms/EntityForm";
import { Row, Col } from "antd";

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

  // Data fetching or entity types dropdown
  const entityTypesQuery = useQuery(
    ["entityTypes", 2 /* depth param */],
    getEntityTypes
  );
  const entityTypes = entityTypesQuery?.data;

  // Data fetching or parents dropdown
  const parentEntitiesQuery = useQuery(
    ["organizationalEntities", 1 /* depth param */],
    getOrganizationalEntities
  );
  const parentEntities = parentEntitiesQuery?.data;

  // Data fetching or locations dropdown
  const locationsQuery = useQuery(
    ["locations"],
    getLocations
  );
  const locations = locationsQuery?.data;

  if (entityQuery.isLoading) {
    return <>Loading...</>;
  }

  if (entityQuery.error) {
    return <>Error...</>;
  }

  return (
    <>
      <h2>
        {entity.name} ({entity.type.name})
      </h2>
      <Row>
        <Col flex={2}>
          <EntityForm initialValues={entity} entityTypes={entityTypes} parentEntities={parentEntities} locations={locations}/>
        </Col>
        <Col
          flex={1}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          Hier kommen Später Eltern und Kinder hin
        </Col>
      </Row>
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
