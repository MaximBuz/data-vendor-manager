/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* API FETCHING */
import { useQuery } from "react-query";
import getBbgSubscriptions from "../../../../../utils/fetchers/getBbgSubscriptions";
import getDataConsumers from "../../../../../utils/fetchers/getDataConsumers";

/* COMPONENTS */
import BBGuuidForm from "../../../../../components/forms/BBGuuidForm";
import { Row, Col } from "antd";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function BBGFirmNr() {
  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const BBGSubscriptionsQuery = useQuery(
    ["bbgSubscriptions", 1 /* Depth */],
    getBbgSubscriptions
  );

  const DataConsumersQuery = useQuery(
    ["dataConsumers",0 /* Depth */],
    getDataConsumers
  )

  /* --------------------------------------------------------------------------- */
  /* ~~~~~~RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* --------------------------------------------------------------------------- */

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col flex={0.3}>
          <h2>Add new Bloomberg Unique User Identifier (UUID)</h2>
          <BBGuuidForm
            subscriptions={BBGSubscriptionsQuery?.data}
            employees={DataConsumersQuery?.data}
          />
        </Col>
      </Row>
    </>
  );
}
