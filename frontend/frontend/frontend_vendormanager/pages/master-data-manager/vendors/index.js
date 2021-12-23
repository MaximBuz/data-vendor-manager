/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import Link from "next/link";

/* COMPONENTS */
import { Button, Tooltip, Divider } from "antd";
import BBGLicenseTreeDataTable from "../../../components/tables/BBGLicenseTreeDataTable";

/* ------------------------------------------------------------------------- */
/* ~~~~~~PREPARING COLUMNS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

const columns = [
  {
    title: <Tooltip title="Address">Bloomberg Identifier</Tooltip>,
    dataIndex: "firm_number",
    key: "firm_number",
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
export default function Vendors() {
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
          <Link href="vendors/bloomberg/create/">
            <Button type="primary" style={{ marginBottom: "10px" }}>
              Add new Bloomberg License
            </Button>
          </Link>
        </Divider>
      <BBGLicenseTreeDataTable columns={columns}/>
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
