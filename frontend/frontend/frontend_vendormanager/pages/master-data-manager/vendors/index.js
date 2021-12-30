/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import Link from "next/link";

/* COMPONENTS */
import { Button, Divider, Radio } from "antd";
import BBGLicenseTreeDataTable from "../../../components/tables/BBGLicenseTreeDataTable";
import BBGFirmDataTable from "../../../components/tables/BBGFirmDataTable";
import BBGAccountDataTable from "../../../components/tables/BBGAccountDataTable";

/* HOOKS */
import { useState } from "react";

/* ------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */
export default function Vendors() {
  /* -----~~~~~>>>SWITCHING TABLES<<<~~~~~----- */
  const [activeTable, setActiveTable] = useState("treeView");
  const onRadioChange = (e) => setActiveTable(e.target.value);

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
        <Link href="vendors/bloomberg/firm-numbers/create/">
          <Button type="primary" style={{ marginBottom: "10px" }}>
            Add Firm Nr
          </Button>
        </Link>
        <Link href="vendors/bloomberg/account-numbers/create/">
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
      <div style={{display: "flex"}}>
      <div style={{position: "relative", bottom: "1px", marginRight: "10px"}}>Show:</div>
      <Radio.Group onChange={onRadioChange} value={activeTable} defaultValue="treeView" style={{ marginBottom: "5px" }}>
        <Radio value="treeView">Tree View</Radio>
        <Radio value="firmNumber">Firm Numbers</Radio>
        <Radio value="accountNumber">Account Numbers</Radio>
        <Radio value="sid">Subscription IDs</Radio>
        <Radio value="uuid">Unique User IDs</Radio>
      </Radio.Group>
      </div>
      
      {
      activeTable === "treeView"
      ? <BBGLicenseTreeDataTable scrollView={{ x: 1500 }} />
      : activeTable === "firmNumber"
      ? <BBGFirmDataTable />
      : activeTable === "accountNumber"
      ? <BBGAccountDataTable /> 
      : "test"
      }
      
    </>
  );
}
