/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import { useRouter } from "next/router";

/* API FETCHING */
import { dehydrate, QueryClient, useQuery } from "react-query";
import getBBGFirmNr from "../../../../../api_utils/api_fetchers/getBBGFirmNr";
import getOrganizationalEntityRootChildren from "../../../../../api_utils/api_fetchers/getOrganizationalEntityRootChildren";


/* API MUTATION */
import deleteBBGFirmNr from "../../../../../api_utils/api_mutators/delete/deleteBBGFirmNr";

/* COMPONENTS */
import BBGFirmNrForm from "../../../../../components/forms/BBGFirmNrForm";
import { Row, Col, Tree, Divider, Button } from "antd";

/* HOOKS */
import useDeleteConfirmation from "../../../../../custom_hooks/useDeleteConfirmation";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function BBGFirmNr() {
  /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
  const router = useRouter();
  const { id: firmNrId } = router.query;

  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const BBGFirmNrQuery = useQuery(
    ["bbgFirmNr", firmNrId, 2 /* depth param */],
    getBBGFirmNr
  );
  const treeQuery = useQuery(
    ["organizationalEntityRootChildren", 10],
    getOrganizationalEntityRootChildren
  );

  /* -----~~~~~>>>DELETION<<<~~~~~----- */
  const [DeleteModal, showDeleteModal] = useDeleteConfirmation(
    deleteBBGFirmNr , // Api call
    "Deleted Bloomberg Firm Nr successfully", // Success Notification Text
    ["bbgFirms", 1 /* Depth */], // Query to invalidate on success
    firmNrId, // Id to delete
    "Are you sure you want to delete this Bloomberg Firm Number (and all its children)?", // Confirmation Text
    "/master-data-manager/vendors" // Next Link
  );

  /* --------------------------------------------------------------------------- */
  /* ~~~~~~RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* --------------------------------------------------------------------------- */
  if (BBGFirmNrQuery.isLoading || treeQuery.isLoading) {
    return <>Loading...</>;
  }

  if (BBGFirmNrQuery.error || treeQuery.error) {
    return <>Error...</>;
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col flex={2}>
          <h2>
            {BBGFirmNrQuery.data?.firm_number} ({BBGFirmNrQuery.data?.organizational_entity?.name})
          </h2>
          <BBGFirmNrForm
            firmNrId={firmNrId}
            initialValues={BBGFirmNrQuery.data}
            organizationalTree = {treeQuery.data}
          />
        </Col>
        <Divider type="vertical" style={{ minHeight: "45em" }} />
        <Col flex={1}>
          <h2>Entity associated with this Firm Number</h2>
          {/* Displaying Entities at that location */}
          {/* ------------------------------------------ */}
          <div
            style={{
              height: "40em",
              overflow: "scroll",
              backgroundColor: "white",
              border: "1px solid #d9d9d9",
            }}
          >
            <Tree
              showLine={{ showLeafIcon: false }}
              defaultExpandAll
              multiple={true}
              // defaultSelectedKeys={relatedEntities.map((entity) => entity.key)}
              /* selectable= {false} */
              /* onSelect={"onSelect"} */
              treeData={treeQuery.data}
              style={{ padding: "10px 0 0 10px", minHeigth: "100%" }}
            />
          </div>
          {/* ------------------------------------------ */}
        </Col>
        </Row>
      <Divider></Divider>
      <Row justify="center">
        <Button onClick={showDeleteModal} type="primary" danger>
          Delete Location
        </Button>
      </Row>
      {DeleteModal}
    </>
  );
}

/* --------------------------------------------------------------------------- */
/* ~~~~~~SERVERSIDE RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */

export async function getServerSideProps(context) {
  /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
  const queryClient = new QueryClient();

  /* -----~~~~~>>>DATA FETCHING<<<~~~~~----- */
  const firmNrId = context.params.id;

  /* -----~~~~~>>>PASSING PROPS<<<~~~~~----- */
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}