// Components
import { Button } from "antd";
import DataConsumersDataTable from "../../../components/tables/DataConsumersDataTable";

// Data Fetching
import { dehydrate, QueryClient, useQuery } from "react-query";
import getDataConsumers from "../../../api_utils/api_fetchers/getDataConsumers";

// Routing
import Link from "next/link";

export default function Geographies() {
  // Data fetching
  const dataConsumersQuery = useQuery(["dataConsumers", 2 /* JSON depth */], getDataConsumers);
  return (
    <>
      <h2>Managing Employees (Market Data Consumers)</h2>
      <p style={{ maxWidth: "550px" }}>
        Here you can add and modify employees at your company that consumer market data.
        There are the employees where market data usage will be tracked and analyzed.
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
      >
      </DataConsumersDataTable>
    </>
  );
}

export async function getServerSideProps(context) {
  // Initializing cache from React Query
  const queryClient = new QueryClient();

  // Prefetching data consumers from Backend
  // await queryClient.prefetchQuery(["dataConsumers"], getDataConsumers);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
