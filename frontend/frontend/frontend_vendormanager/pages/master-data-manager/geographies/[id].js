// Routing
import { useRouter } from "next/router";

// Data Fetching
import { dehydrate, QueryClient, useQuery } from "react-query";
import getLocationWithBuildings from "../../../api_utils/api_fetchers/getLocationWithBuildings";

// Components
import EntityForm from "../../../components/forms/EntityForm";
import { Row, Col, Tree, Divider } from "antd";

export default function Organization() {

  // get id of the organizational entity
  const router = useRouter();
  const { id: locationId } = router.query;


  // Change this to getting locations with buildings
  // Data fetching for locations dropdown
  const locationQuery = useQuery(
    ["locationWithBuildings", locationId],
    getLocationWithBuildings
  );
  const location = locationQuery?.data;

/*   const treeData = treeQuery.data && JSON.parse(JSON.stringify(treeQuery.data).split('"id":').join('"key":')); */

  if (locationQuery.isLoading) {
    return <>Loading...</>;
  }

  if (locationQuery.error) {
    return <>Error...</>;
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col flex={2}>
      <h2>
        {location.street} {location.street_nr}, {location.zip_code} {location.city}, {location.country} 
      </h2>
          {/* <EntityForm initialValues={entity} entityTypes={entityTypes} parentEntities={parentEntities} locations={locations}/> */}
        </Col>
        <Divider type="vertical" style={{minHeight: "70vh"}}/>
        <Col
          flex={1}
        >
          <h2>Position in Organizational Tree</h2>
        </Col>
      </Row>
    </>
  );
}

export async function getServerSideProps(context) {
  // Initializing cache from React Query
  const queryClient = new QueryClient();
  
  const locationId = context.params.id;
 
  // PRefetching the locations
  await queryClient.prefetchQuery(
    ["locationWithBuildings", locationId],
    getLocationWithBuildings
  );



  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
