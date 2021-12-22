/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import Link from "next/link";

/* COMPONENTS */
import { Button } from "antd";
import LocationDataTable from "../../../components/tables/LocationDataTable";

/* API FETCHING */
import { dehydrate, QueryClient, useQuery } from "react-query";
import getLocations from "../../../api_utils/api_fetchers/getLocations";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function Geographies() {
  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const locationsQuery = useQuery(["locations"], getLocations);

  /* --------------------------------------------------------------------------- */
  /* ~~~~~~RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* --------------------------------------------------------------------------- */
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
      ></LocationDataTable>
    </>
  );
}

/* --------------------------------------------------------------------------- */
/* ~~~~~~SERVERSIDE RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */

export async function getServerSideProps(context) {
  /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
  const queryClient = new QueryClient();

  /* -----~~~~~>>>DATA FETCHING<<<~~~~~----- */
  await queryClient.prefetchQuery(["locations"], getLocations);

  /* -----~~~~~>>>PASSING PROPS<<<~~~~~----- */
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
