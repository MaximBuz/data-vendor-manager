/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import Link from "next/link";

/* COMPONENTS */
import { Button } from "antd";
import DataConsumersDataTable from "../../../components/tables/DataConsumersDataTable";

/* API FETCHING */
import { dehydrate, QueryClient, useQuery } from "react-query";
import getDataConsumers from "../../../api_utils/api_fetchers/getDataConsumers";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function Geographies() {
  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const dataConsumersQuery = useQuery(
    ["dataConsumers", 2 /* JSON depth */],
    getDataConsumers
  );

  /* --------------------------------------------------------------------------- */
  /* ~~~~~~RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* --------------------------------------------------------------------------- */
  return (
    <>
      <h2>Managing Employees (Market Data Consumers)</h2>
      <p style={{ maxWidth: "550px" }}>
        Here you can add and modify employees at your company that consumer
        market data. There are the employees where market data usage will be
        tracked and analyzed.
      </p>
      <Link href="employees/create/">
        <Button type="primary" style={{ marginBottom: "10px" }}>
          Add new Data Consumer
        </Button>
      </Link>
      <DataConsumersDataTable
        data={dataConsumersQuery.data}
        isLoading={dataConsumersQuery.isLoading}
        scrollView={{ x: 1500 }}
      ></DataConsumersDataTable>
    </>
  );
}

/* --------------------------------------------------------------------------- */
/* ~~~~~~SERVERSIDE RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */

// export async function getServerSideProps(context) {
//   // Initializing cache from React Query
//   /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
//   const queryClient = new QueryClient();

//   /* -----~~~~~>>>DATA FETCHING<<<~~~~~----- */
//   // await queryClient.prefetchQuery(["dataConsumers"], getDataConsumers);

//   /* -----~~~~~>>>PASSING PROPS<<<~~~~~----- */
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }
