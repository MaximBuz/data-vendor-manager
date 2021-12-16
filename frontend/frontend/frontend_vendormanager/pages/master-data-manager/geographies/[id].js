// Routing
import { useRouter } from "next/router";

// Data Fetching
import { dehydrate, QueryClient, useQuery } from "react-query";
import getLocationWithBuildings from "../../../api_utils/api_fetchers/getLocationWithBuildings";

// Components
import LocationForm from "../../../components/forms/LocationForm";
import BuildingCard from "../../../components/cards/BuildingCard";
import { Row, Col, Tree, Divider } from "antd";

// Styling
import { UilMapMarkerPlus } from '@iconscout/react-unicons'

export default function Organization() {
  // get id of the location
  const router = useRouter();
  const { id: locationId } = router.query;

  // Data fetching for locations dropdown
  const locationQuery = useQuery(
    ["locationWithBuildings", locationId],
    getLocationWithBuildings
  );
  const location = locationQuery?.data;
  const buildings = location.buildings;

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
        <Col flex={1}>
          <h2>
            Location in {location.city}, {location.country}
          </h2>
          <LocationForm initialValues={location} />
        </Col>
        <Divider type="vertical" style={{ minHeight: "70vh" }} />
        <Col flex={1}>
          <h2>Buildings associated with this location</h2>
          {buildings.map((building) => {
            return <BuildingCard building={building} />;
          })}
          <div
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
              cursor: "pointer"
            }}
          >
            <UilMapMarkerPlus />
            Add new Building
          </div>
        </Col>
        <Divider type="vertical" style={{ minHeight: "70vh" }} />
        <Col flex={1}>
          <h2>Entities associated with this location</h2>
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
