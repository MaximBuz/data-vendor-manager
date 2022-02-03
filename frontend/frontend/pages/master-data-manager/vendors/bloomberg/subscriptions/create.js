/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* API FETCHING */
import { useQuery } from "react-query";
import getBbgAccountNrs from "../../../../../utils/fetchers/getBbgAccountNrs";

/* COMPONENTS */
import BBGSubscriptionForm from "../../../../../components/forms/BBGSubscriptionForm";
import { Row, Col } from "antd";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function BBGFirmNr() {
  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const BBGAccountQuery = useQuery(
    ["bbgAccountNrs", 1 /* Depth */],
    getBbgAccountNrs
  );

  /* --------------------------------------------------------------------------- */
  /* ~~~~~~RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* --------------------------------------------------------------------------- */

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col flex={0.3}>
          <h2>Add new Bloomberg Account Number</h2>
          <BBGSubscriptionForm
            accounts={BBGAccountQuery?.data}
          />
        </Col>
      </Row>
    </>
  );
}
