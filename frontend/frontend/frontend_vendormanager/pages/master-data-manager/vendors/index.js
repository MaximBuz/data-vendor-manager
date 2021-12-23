/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import Link from "next/link";

/* API FETCHING */
import { dehydrate, QueryClient, useQuery, useQueryClient } from "react-query";
import getBBGLicenseTree from "../../../api_utils/api_fetchers/getBBGLicenseTree";

/* COMPONENTS */
import { Button, Tooltip, Divider } from "antd";
import BBGLicenseTreeDataTable from "../../../components/tables/BBGLicenseTreeDataTable";

/* ------------------------------------------------------------------------- */
/* ~~~~~~PREPARING COLUMNS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

const columns = [
  {
    title: "Identifier Type",
    dataIndex: "name",
    key: "name",
    render: (text, record) => {
      return (
        <Tooltip title={record.description}>
        {record.name}
      </Tooltip>
      )
    }
  },
  {
    title: "Bloomberg Identifier",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Business Entity",
    dataIndex: ["organizational_entity", "name"],
    key: "organizational_entity",
  },
  {
    title: "Data Consumer",
    dataIndex: "data_consumer",
    key: "data_consumer",
    render: (text, record) => {
      return (record.data_consumer?.key &&
        <Link href={`/master-data-manager/employees/${record.data_consumer?.key}`}>
          {record.data_consumer?.email}
        </Link>
      );
    },
  },
];


/* ------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */
export default function Vendors() {
   /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
   const { isLoading, isError, data, error } = useQuery(
    ["BBGLicenseTree", 0 /* Depth */],
    getBBGLicenseTree
  );


  /* --------------------------------------------------------------------------- */
  /* ~~~~~~RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* --------------------------------------------------------------------------- */
  return (
    <>
      <h2>Managing Vendors and Licenses</h2>
      <p style={{ maxWidth: "550px" }}>
        Here you can add new vendors and manage your licenses at those vendors.
      </p>
        <Divider orientation="left" style={{ width: "70vw" }}>
          Bloomberg
        </Divider>
        <div style={{display: "flex", gap: "10px", alignItems: "center"}}>
            <Link href="vendors/bloomberg/create/">
              <Button type="primary" style={{marginBottom: "10px"}}>
                Add Firm ID
              </Button>
            </Link>
            <Link href="vendors/bloomberg/create/">
              <Button type="primary" style={{marginBottom: "10px"}}>
                Add Account Nr
              </Button>
            </Link>
            <Link href="vendors/bloomberg/create/">
              <Button type="primary" style={{marginBottom: "10px"}}>
                Add Subscription ID
              </Button>
            </Link>
            <Link href="vendors/bloomberg/create/">
              <Button type="primary" style={{marginBottom: "10px"}}>
                Add User ID
              </Button>
            </Link>
          </div>
      <BBGLicenseTreeDataTable columns={columns} data={data}/>
      <Divider orientation="left" style={{ width: "70vw" }}>
          <Link href="vendors/bloomberg/create/">
            <Button type="primary" style={{ marginBottom: "10px" }}>
              Add new Reuters License
            </Button>
          </Link>
        </Divider>
        <p>Etc pp</p>
    </>
  );
}
