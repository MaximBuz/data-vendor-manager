/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* API FETCHING */
import { useQuery } from "react-query";
import getBBGSubscriptions from "../../../../../api_utils/api_fetchers/getBBGSubscriptions";
import getDataConsumers from "../../../../../api_utils/api_fetchers/getDataConsumers";

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
    getBBGSubscriptions
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
