/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import Link from "next/link";

/* COMPONENTS */
import EntityTreeDataTable from "../../../components/tables/EntityTreeDataTable";
import { Button, Tooltip } from "antd";

/* API FETCHING */
import { dehydrate, QueryClient, useQuery } from "react-query";
import getOrganizationalEntityRootChildren from "../../../utils/fetchers/getOrganizationalEntityRootChildren";

/* ------------------------------------------------------------------------- */
/* ~~~~~~PREPARING COLUMNS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    fixed: "left",
    width: "35%",
    render: (text, record) => {
      return (
        <Link href={`/master-data-manager/organizations/${record.key}`} passHref>
          {text}
        </Link>
      );
    },
  },
  {
    title: "Entity Type",
    dataIndex: ["type", "name"],
    key: "type",
    width: "15%"
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
    width: "20%"
  },
];

/* ------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */
export default function Organizations() {
  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const { isLoading, error, data } = useQuery(
    ["organizationalEntityRootChildren", 10 /* depth */],
    getOrganizationalEntityRootChildren
  );

  /* --------------------------------------------------------------------------- */
  /* ~~~~~~RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* --------------------------------------------------------------------------- */
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
      <EntityTreeDataTable
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

/* --------------------------------------------------------------------------- */
/* ~~~~~~SERVERSIDE RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */

// export async function getServerSideProps() {
//   /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
//   const queryClient = new QueryClient();

//   /* -----~~~~~>>>DATA FETCHING<<<~~~~~----- */
//   await queryClient.prefetchQuery(
//     ["organizationalEntityRootChildren", 10],
//     getOrganizationalEntityRootChildren
//   );

//   /* -----~~~~~>>>PASSING PROPS<<<~~~~~----- */
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }
