/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* API FETCHING */
import {  useQuery } from "react-query";
import getOrganizationalEntityRootChildren from "../../../../../api_utils/api_fetchers/getOrganizationalEntityRootChildren";


/* COMPONENTS */
import BBGFirmNrForm from "../../../../../components/forms/BBGFirmNrForm";
import { Row, Col } from "antd";


/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function BBGFirmNr() {
  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const treeQuery = useQuery(
    ["organizationalEntityRootChildren", 10],
    getOrganizationalEntityRootChildren
  );

  /* --------------------------------------------------------------------------- */
  /* ~~~~~~RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* --------------------------------------------------------------------------- */

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col flex={2}>
          <h2>
            Add new Bloomberg Firm Number
          </h2>
          <BBGFirmNrForm
            organizationalTree = {treeQuery.data}
          />
        </Col>
        </Row>
    </>
  );
}