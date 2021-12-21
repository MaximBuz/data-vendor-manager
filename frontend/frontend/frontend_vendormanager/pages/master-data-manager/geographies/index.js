// Components
import { Button } from "antd";
import LocationDataTable from "../../../components/tables/LocationDataTable";

// Data Fetching
import { dehydrate, QueryClient, useQuery } from "react-query";
import getLocations from "../../../api_utils/api_fetchers/getLocations";

// Routing
import Link from "next/link";

export default function Geographies() {
  // Data fetching
  const locationsQuery = useQuery(["locations"], getLocations);
  return (
    <>
      <h2>Business Location Modelling</h2>
      <p style={{ maxWidth: "550px" }}>
        Here you can add and modify locations where organizational entities are
        located. This data will later be used to analyse, where potential cost
        savings and optimizations in market data spend are possible.
      </p>
      <Link href="geographies/create/">
        <Button type="primary" style={{ marginBottom: "10px" }}>
          Add new Business Location
        </Button>
      </Link>
      <LocationDataTable
        data={locationsQuery.data}
        isLoading={locationsQuery.isLoading}
        /* scrollView={{ x: 1100, y: 500 }} */
      >

      </LocationDataTable>
    </>
  );
}

export async function getServerSideProps(context) {
  // Initializing cache from React Query
  const queryClient = new QueryClient();

  // Prefetching Locations from Backend
  await queryClient.prefetchQuery(["locations"], getLocations);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
