/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import { useRouter } from "next/router";

/* API FETCHING */
import { useQuery } from "react-query";

import getOrganizationalEntityRootChildren from "../../../utils/fetchers/getOrganizationalEntityRootChildren";
import getActivityTags from "../../../utils/fetchers/getActivityTags";
import getLocations from "../../../utils/fetchers/getLocations";
import getJobs from "../../../utils/fetchers/getJobs";

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

  const locationsQuery = useQuery(["locations"], getLocations);

  const jobsQuery = useQuery(["jobs"], getJobs);

  /* --------------------------------------------------------------------------- */
  /* ~~~~~~RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* --------------------------------------------------------------------------- */

  if (locationsQuery.isLoading) {
    return <>Loading...</>;
  }

  if (locationsQuery.error) {
    return <>Error...</>;
  }

  return (
    <>
      <Row>
        <Col span={16}>
          <h2>Add Employee (Data Consumer)</h2>
          <EmployeeForm
            activityTags={activityTags}
            organizationalTree={treeQuery.isSuccess && treeQuery.data}
            locations={locationsQuery.isSuccess && locationQuery.data}
            jobs={jobsQuery.isSuccess && jobsQuery.data}
          />
        </Col>
      </Row>
    </>
  );
}
