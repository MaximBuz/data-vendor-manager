/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import { useRouter } from "next/router";

/* API FETCHING */
import { useQuery } from "react-query";

import getOrganizationalEntityRootChildren from "../../../api_utils/api_fetchers/getOrganizationalEntityRootChildren";
import getActivityTags from "../../../api_utils/api_fetchers/getActivityTags";
import getLocations from "../../../api_utils/api_fetchers/getLocations";
import getJobs from "../../../api_utils/api_fetchers/getJobs";

/* COMPONENTS */
import EmployeeForm from "../../../components/forms/EmployeeForm";
import { Row, Col } from "antd";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function Employee() {
  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const activityTagsQuery = useQuery(
    ["activityTags", 0 /* Depth */],
    getActivityTags
  );
  const activityTags = activityTagsQuery.isSuccess && activityTagsQuery.data;

  const treeQuery = useQuery(
    ["organizationalEntityRootChildren", 10],
    getOrganizationalEntityRootChildren
  );

  const locationQuery = useQuery(["locations"], getLocations);

  const jobsQuery = useQuery(["jobs"], getJobs);

  /* --------------------------------------------------------------------------- */
  /* ~~~~~~RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* --------------------------------------------------------------------------- */
  return (
    <>
      <Row>
        <Col span={16}>
          <h2>Add Employee (Data Consumer)</h2>
          <EmployeeForm
            activityTags={activityTags}
            organizationalTree={treeQuery?.data}
            locations={locationQuery?.data}
            jobs={jobsQuery?.data}
          />
        </Col>
      </Row>
    </>
  );
}
