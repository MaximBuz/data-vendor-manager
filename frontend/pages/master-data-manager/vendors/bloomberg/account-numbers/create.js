/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* API FETCHING */
import { useQuery } from "react-query";
import getLocations from "../../../../../utils/fetchers/getLocations";
import getBbgFirmNrs from "../../../../../utils/fetchers/getBbgFirmNrs";

/* COMPONENTS */
import BBGAccountNrForm from "../../../../../components/forms/BBGAccountNrForm";
import { Row, Col } from "antd";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function BBGFirmNr() {
  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const locations = useQuery(["locations", 2], getLocations);
  const firmNrsQuery = useQuery(["bbgFirmNrs", 1], getBbgFirmNrs);

  /* --------------------------------------------------------------------------- */
  /* ~~~~~~RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* --------------------------------------------------------------------------- */

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col flex={0.3}>
          <h2>Add new Bloomberg Account Number</h2>
          <BBGAccountNrForm
            locations={locations.isSuccess && locations.data}
            firmNrs={firmNrsQuery.isSuccess && firmNrsQuery.data}
          />
        </Col>
      </Row>
    </>
  );
}
