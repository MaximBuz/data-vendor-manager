// Components
import TreeDataTable from "../../../components/tables/TreeDataTable";
import { Button, Tooltip } from "antd";

// Routing
import Link from "next/link";

// Data Fetching
import { dehydrate, QueryClient, useQuery } from "react-query";
import getOrganizationalEntityRootChildren from "../../../api_utils/api_fetchers/getOrganizationalEntityRootChildren";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    fixed: "left",
    width: "25%",
    render: (text, record) => {
      return (
        <Link href={`/master-data-manager/organizations/${record.key}`}>
          {text}
        </Link>
      );
    },
  },
  {
    title: "Entity Type",
    dataIndex: ["type", "name"],
    key: "type",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    ellipsis: true,
    render: (text, record) => {
      return (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      );
    },
  },
  {
    title: "Internal Id",
    dataIndex: "internal_id",
    key: "internal_id",
  },
];

export default function Organizations() {
  // Data fetching
  // the second parameter I'm giving inside the array is the depth I need
  const { isLoading, error, data } = useQuery(
    ["organizationalEntityRootChildren", 10],
    getOrganizationalEntityRootChildren
  );

  return (
    <>
      <h2>Organizational structure modelling</h2>
      <p style={{ maxWidth: "550px" }}>
        Here you can model the organizational structure of your company by
        creating entities (i.e. Legal Entitites, Divisions, etc.) with child and
        parent relationships.
      </p>
      <Link href="organizations/create/">
        <Button type="primary" style={{ marginBottom: "10px" }}>
          Add new Entity
        </Button>
      </Link>
      <TreeDataTable
        columns={columns}
        data={data}
        rowSelection={false}
        isLoading={isLoading}
        /* scrollView={{ x: 1500, y: 500 }} */
        pagination={{ defaultPageSize: 10, hideOnSinglePage: true }}
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
