// Routing
import { useRouter } from "next/router";

// Data Fetching
import { dehydrate, QueryClient, useQuery } from "react-query";
import getLocations from "../../../api_utils/api_fetchers/getLocations";

// Components
import EntityForm from "../../../components/forms/EntityForm";
import { Row, Col, Tree, Divider } from "antd";

export default function Organization() {

  // get id of the organizational entity
  const router = useRouter();
  const { id: entityId } = router.query;


  // Change this to getting locations with buildings
  // Data fetching for locations dropdown
  const locationsQuery = useQuery(
    ["locationWithBuildings"],
    getLocations
  );
  const locations = locationsQuery?.data;

/*   const treeData = treeQuery.data && JSON.parse(JSON.stringify(treeQuery.data).split('"id":').join('"key":')); */

  if (locationsQuery.isLoading) {
    return <>Loading...</>;
  }

  if (locationsQuery.error) {
    return <>Error...</>;
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col flex={2}>
      <h2>
        {entity.name} ({entity.type.name})
      </h2>
          <EntityForm initialValues={entity} entityTypes={entityTypes} parentEntities={parentEntities} locations={locations}/>
        </Col>
        <Divider type="vertical" style={{minHeight: "70vh"}}/>
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
            treeData={treeData}
            style={{ padding: "10px 0 0 10px", minHeigth: "100%"}}
          />
          </div>
        </Col>
      </Row>
    </>
  );
}

export async function getServerSideProps(context) {
  // Initializing cache from React Query
  const queryClient = new QueryClient();
 
  // PRefetching the locations
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
