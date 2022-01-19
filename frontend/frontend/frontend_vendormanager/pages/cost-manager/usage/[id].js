/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import { useRouter } from "next/router";

/* API FETCHING */
import { dehydrate, QueryClient, useQuery, useQueryClient } from "react-query";
import getDataConsumer from "../../../api_utils/api_fetchers/getDataConsumer";
import getOrganizationalEntityRootChildren from "../../../api_utils/api_fetchers/getOrganizationalEntityRootChildren";
import getActivityTags from "../../../api_utils/api_fetchers/getActivityTags";
import getLocations from "../../../api_utils/api_fetchers/getLocations";
import getJobs from "../../../api_utils/api_fetchers/getJobs";

/* API MUTATION */
import deleteEmployee from "../../../api_utils/api_mutators/delete/deleteEmployee";

/* COMPONENTS */
import EmployeeForm from "../../../components/forms/EmployeeForm";
import { Row, Col, Divider, Popover, Tree } from "antd";

/* HOOKS */
import useDeleteConfirmation from "../../../custom_hooks/useDeleteConfirmation";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function Employee() {
  /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
  const router = useRouter();
  const { id: employeeId } = router.query;

  const queryClient = useQueryClient();

  /* -----~~~~~>>>DELETION<<<~~~~~----- */
  const [DeleteModal, showDeleteModal] = useDeleteConfirmation(
    deleteEmployee, // Api call
    "Deleted employee successfully", // Success Notification Text
    "dataConsumers", // Query to invalidate on success
    employeeId, // Id to delete
    "Are you sure you want to delete this employee?", // Confirmation Text
    "/master-data-manager/employees" // Next Link
  );

  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const dataConsumerQuery = useQuery(
    ["dataConsumer", employeeId, 2 /* Depth */],
    getDataConsumer
  );
  const dataConsumer = dataConsumerQuery?.data;

  const treeQuery = useQuery(
    ["organizationalEntityRootChildren", 10],
    getOrganizationalEntityRootChildren
  );


  /* --------------------------------------------------------------------------- */
  /* ~~~~~~RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* --------------------------------------------------------------------------- */
  if (dataConsumerQuery.isLoading) {
    return <>Loading...</>;
  }

  if (dataConsumerQuery.error) {
    return <>Error...</>;
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Row justify="center">
            <img src="http://127.0.0.1:8000/api/random-default-avatar/" width={180}></img>
          </Row>
          <Row justify="center" style={{marginBottom: "30px"}}>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
              <p style={{margin: "0", fontSize: "2em"}}>{dataConsumer?.first_name + " " + dataConsumer?.last_name}</p> 
              <p style={{margin: "0"}}>{dataConsumer?.email}</p>
            </div>
          </Row>

          <Divider orientation="middle" plain style={{color: "grey",  fontWeight: "lighter", marginBottom: "0px"}}>Job Title</Divider>
          <Row justify="center" style={{marginBottom: "30px"}}>
            {dataConsumer?.job_title?.title}
          </Row>

          <Divider orientation="middle" plain style={{color: "grey",  fontWeight: "lighter", marginBottom: "0px"}}>Activities</Divider>
          <Row justify="center" style={{marginBottom: "30px"}}>
            <Popover
              title="Activities of this Employee"
              trigger="hover"
              content={
                dataConsumer?.activity?.map((tag) => {
                  return (
                    <Row justify="center">
                      {tag.name}
                    </Row>
                  )
                })
              }
            >
              {dataConsumer?.activity?.map((tag) => tag.name).join(", ")}
            </Popover>
          </Row>

          <Divider orientation="middle" plain style={{color: "grey",  fontWeight: "lighter", marginBottom: "0px"}}>Business Affiliation</Divider>
          <Row justify="center" style={{marginBottom: "30px"}}>
            <Popover
                title="Position in Organizational Hierarchy"
                trigger="hover"
                content={
                  <Tree 
                    showLine={{ showLeafIcon: false }}
                    defaultSelectedKeys={[dataConsumer?.organizational_entity?.id]}
                    treeData={treeQuery?.data}
                    defaultExpandAll = {true}
                  />
                }
              >
              {dataConsumer?.organizational_entity?.name}
            </Popover>
          </Row>

          <Divider orientation="middle" plain style={{color: "grey",  fontWeight: "lighter", marginBottom: "0px"}}>Location</Divider>
          <Row justify="center" style={{marginBottom: "30px"}}>
            <Popover
              title="Location of Employee"
              trigger="hover"
              content={
                <>
                  <Row justify="center">
                    {dataConsumer.building.building_name}
                  </Row>
                  <Row justify="center">
                    {"Floor: " + dataConsumer.floor + ", Seat: " + dataConsumer.seat}
                  </Row>
                  <Divider style={{margin: "10px"}}></Divider>
                  <Row justify="center">
                    {dataConsumer.location.street + " " + dataConsumer.location.street_nr}
                  </Row>
                  <Row justify="center">
                    {dataConsumer.location.zip_code + " " + dataConsumer.location.city}
                  </Row>
                  <Divider style={{margin: "10px"}}></Divider>
                  <Row justify="center">
                    {dataConsumer.location.state}
                  </Row>
                  <Row justify="center">
                    {dataConsumer.location.country}
                  </Row>
                </>
              }
            >
              {`${dataConsumer.location.city + ", " + dataConsumer.location.country}`}
            </Popover>
          </Row>
          
        </Col>
        <Divider type="vertical" style={{ height: "auto", minHeight: "70vh" }}></Divider>
        <Col >Test</Col>
      </Row>
    </>
  );
}

/* --------------------------------------------------------------------------- */
/* ~~~~~~SERVERSIDE RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */

export async function getServerSideProps(context) {
  /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
  const queryClient = new QueryClient();
  const employeeId = context.params.id;

  /* -----~~~~~>>>DATA FETCHING<<<~~~~~----- */
  await queryClient.prefetchQuery(
    ["organizationalEntityRootChildren", 10 /* Depth */],
    getOrganizationalEntityRootChildren
  );
  await queryClient.prefetchQuery(
    ["dataConsumer", employeeId, 2 /* Depth */],
    getDataConsumer
  );
  await queryClient.prefetchQuery(
    ["activityTags", 0 /* Depth */],
    getActivityTags
  );
  await queryClient.prefetchQuery(["locations"], getLocations);
  await queryClient.prefetchQuery(["jobs"], getJobs);

  /* -----~~~~~>>>PASSING PROPS<<<~~~~~----- */
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
