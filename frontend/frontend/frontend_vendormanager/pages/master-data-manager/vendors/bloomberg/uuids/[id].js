/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import { useRouter } from "next/router";

/* API FETCHING */
import { dehydrate, QueryClient, useQuery } from "react-query";
import getBBGuuid from "../../../../../api_utils/api_fetchers/getBBGuuid";
import getBBGSubscriptions from "../../../../../api_utils/api_fetchers/getBBGSubscriptions";
import getDataConsumers from "../../../../../api_utils/api_fetchers/getDataConsumers";

/* API MUTATION */
import deleteBBGuuid from "../../../../../api_utils/api_mutators/delete/deleteBBGuuid";

/* COMPONENTS */
import BBGuuidForm from "../../../../../components/forms/BBGuuidForm";
import TrackerCard from "../../../../../components/cards/TrackerCard";
import { Row, Col, Divider, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";

/* HOOKS */
import useDeleteConfirmation from "../../../../../custom_hooks/useDeleteConfirmation";
import useAddItemModal from "../../../../../custom_hooks/useAddItemModal";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function BBGSubscription() {
  /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
  const router = useRouter();
  const { id: uuidId } = router.query;

  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const BBGuuidQuery = useQuery(
    ["bbgUuid", uuidId, 1 /* depth param */],
    getBBGuuid
  );

  const BBGSubscriptionsQuery = useQuery(
    ["bbgSubscriptions", 1 /* Depth */],
    getBBGSubscriptions
  );

  const DataConsumersQuery = useQuery(
    ["dataConsumers",0 /* Depth */],
    getDataConsumers
  )

  /* -----~~~~~>>>INSTALLING TRACKERS<<<~~~~~----- */
  const [_, installTrackerModal, showInstallTrackerModal] = useAddItemModal(
    "sendTrackerInstallEmail", //replace
    "building_name",
    "Successfully added new building!",
    "locationWithBuildings",
    "Add new building",
    { uuid: uuidId } // Additional values
  );

  /* -----~~~~~>>>DELETION<<<~~~~~----- */
  const [DeleteModal, showDeleteModal] = useDeleteConfirmation(
    deleteBBGuuid, // Api call
    "Deleted Bloomberg UUID successfully", // Success Notification Text
    ["bbgUuids", 1 /* Depth */], // Query to invalidate on success
    uuidId, // Id to delete
    "Are you sure you want to delete this Bloomberg UUID?", // Confirmation Text
    "/master-data-manager/vendors" // Next Link
  );

  /* --------------------------------------------------------------------------- */
  /* ~~~~~~RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* --------------------------------------------------------------------------- */
  if (BBGuuidQuery.isLoading) {
    return <>Loading...</>;
  }

  if (BBGuuidQuery.error) {
    return <>Error...</>;
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col flex={2}>
          <h2>Bloomberg Unique User ID: {BBGuuidQuery.data?.uuid}</h2>
          <BBGuuidForm
            uuidId={uuidId}
            initialValues={BBGuuidQuery?.data}
            subscriptions={BBGSubscriptionsQuery?.data}
            employees={DataConsumersQuery?.data}
          />
        </Col>
        <Col flex={1}>
          <div
            style={{
              height: "70vh",
              /* overflowY: "scroll",
            scrollbarWidth: "none", */
            }}
          >
            <h2>Installed Trackers</h2>
            {/* {buildings.map((building) => {
              return <TrackerCard building={building} />;
            })} */}
            <TrackerCard tracker={{name: "Bloomberg Anywhere Tracker", id: "test"}} />
            {/* Install new tracker button */}
            {/* ------------------------------------------ */}
            <div
              onClick={showInstallTrackerModal}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0px",
                padding: "10px",
                borderRadius: "2px",
                borderStyle: "dashed",
                borderWidth: "1px",
                borderColor: "#d9d9d9",
                margin: "20px",
                color: "grey",
                cursor: "pointer",
              }}
            >
              <MailOutlined style={{ fontSize: '18px' }}/>
              Install new Tracker
            </div>
            {/* ------------------------------------------ */}
          </div>
        </Col>
      </Row>
      <Divider></Divider>
      <Row justify="center">
        <Button onClick={showDeleteModal} type="primary" danger>
          Delete UUID
        </Button>
      </Row>
      {DeleteModal}
    </>
  );
}

/* --------------------------------------------------------------------------- */
/* ~~~~~~SERVERSIDE RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */

// export async function getServerSideProps(context) {
//   /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
//   const queryClient = new QueryClient();

//   /* -----~~~~~>>>DATA FETCHING<<<~~~~~----- */
//   const uuidId = context.params.id;

//   /* -----~~~~~>>>PASSING PROPS<<<~~~~~----- */
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }
