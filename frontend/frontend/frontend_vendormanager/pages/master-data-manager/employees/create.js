// React
import { useState } from "react";

// Routing
import { useRouter } from "next/router";

// Data Fetching
import {
  useQuery,
} from "react-query";

import getOrganizationalEntityRootChildren from "../../../api_utils/api_fetchers/getOrganizationalEntityRootChildren";
import getActivityTags from "../../../api_utils/api_fetchers/getActivityTags";
import getLocations from "../../../api_utils/api_fetchers/getLocations";
import getJobs from "../../../api_utils/api_fetchers/getJobs";


// Components
import EmployeeForm from "../../../components/forms/EmployeeForm";
import { Row, Col } from "antd";

export default function Employee() {
  const activityTagsQuery = useQuery(
    ["activityTags", 0 /* Depth */],
    getActivityTags
  );
  const activityTags = activityTagsQuery?.data;

  const treeQuery = useQuery(
    ["organizationalEntityRootChildren", 10],
    getOrganizationalEntityRootChildren
  );

  const locationQuery = useQuery(["locations"], getLocations);

  const jobsQuery = useQuery(["jobs"], getJobs);

  return (
    <>
      <Col flex={0.3}>
        <h2>Add Employee (Data Consumer)</h2>
        <Row>
          <EmployeeForm
            activityTags={activityTags}
            organizationalTree={treeQuery?.data}
            locations={locationQuery?.data}
            jobs={jobsQuery?.data}
          />
        </Row>
      </Col>
    </>
  );
}
