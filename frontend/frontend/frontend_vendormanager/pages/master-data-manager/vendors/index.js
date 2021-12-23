/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import Link from "next/link";

/* API FETCHING */
import { dehydrate, QueryClient, useQuery, useQueryClient } from "react-query";
import getBBGLicenseTree from "../../../api_utils/api_fetchers/getBBGLicenseTree";

/* COMPONENTS */
import { Button, Divider, Radio } from "antd";
import BBGLicenseTreeDataTable from "../../../components/tables/BBGLicenseTreeDataTable";

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
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <Link href="vendors/bloomberg/create/">
          <Button type="primary" style={{ marginBottom: "10px" }}>
            Add Firm ID
          </Button>
        </Link>
        <Link href="vendors/bloomberg/create/">
          <Button type="primary" style={{ marginBottom: "10px" }}>
            Add Account Nr
          </Button>
        </Link>
        <Link href="vendors/bloomberg/create/">
          <Button type="primary" style={{ marginBottom: "10px" }}>
            Add Subscription ID
          </Button>
        </Link>
        <Link href="vendors/bloomberg/create/">
          <Button type="primary" style={{ marginBottom: "10px" }}>
            Add User ID
          </Button>
        </Link>
      </div>
      <Radio.Group defaultValue="treeView" style={{marginBottom: "5px"}}>
        <Radio value="treeView">Tree View</Radio>
        <Radio value="firmId">Firm ID</Radio>
        <Radio value="accountNr">Account Nr</Radio>
        <Radio value="sid">SID</Radio>
        <Radio value="uuid">UUID</Radio>
      </Radio.Group>
      <BBGLicenseTreeDataTable
        data={data}
        scrollView={{ x: 1500 }}
      />
    </>
  );
}
