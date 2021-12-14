// Components
import TreeDataTable from "../../components/tables/TreeDataTable";

// Routing
import Link from "next/link";

// Data Fetching
import { dehydrate, QueryClient, useQuery } from "react-query";
import getOrganizationalEntityRootChildren from "../../api_fetchers/getOrganizationalEntityRootChildren";

const fakeColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    fixed: "left",
    width: "25%",
    render: (text, record) => {
      return <Link href={`/master-data-manager/organizations/${record.key}`}>{text}</Link>
    },
  },
  {
    title: "Entity Type",
    dataIndex: ["type", "name"],
    key: "type",
    width: "10%",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    ellipsis: true,
    width: "15%",
  },
  {
    title: "Location",
    dataIndex: ["location", "country"],
    render: (text, record) => {
      if (record.location) return <p>{text + ", " + record.location?.city}</p>;
    },
    key: "location",
    width: "15%",
  },
  {
    title: "Internal Id",
    dataIndex: "internal_id",
    key: "internal_id",
    width: "20%",
  },
];

export default function Organizations() {
  // Data fetching
  // the second parameter I'm giving inside the array is the depth I need
  const { isLoading, error, data } = useQuery(
    ["organizationalEntityRootChildren", 10],
    getOrganizationalEntityRootChildren
  );
  // change "id" field to "key" for table to work properly
  const translatedData =
    data && JSON.parse(JSON.stringify(data).split('"id":').join('"key":'));
  return (
    <>
      <h2>Organizational structure modelling</h2>
      <p style={{ maxWidth: "550px" }}>
        Here you can model the organizational structure of your company by
        creating entities (i.e. Legal Entitites, Divisions, etc.) with child and
        parent relationships.
      </p>
      <TreeDataTable
        columns={fakeColumns}
        data={translatedData}
        rowSelection={false}
        isLoading={isLoading}
        scrollView={{ x: 1500, y: 500 }}
      />
    </>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  // the second parameter I'm giving inside the array is the depth I need
  await queryClient.prefetchQuery(
    ["organizationalEntityRootChildren", 10],
    getOrganizationalEntityRootChildren
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
