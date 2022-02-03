/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import { useRouter } from "next/router";

/* API FETCHING */
import { useQueryClient, useMutation, useQuery } from "react-query";
import getBbguuid from "../../../../../utils/fetchers/getBbguuid";
import getBbgSubscriptions from "../../../../../utils/fetchers/getBbgSubscriptions";
import getDataConsumers from "../../../../../utils/fetchers/getDataConsumers";
import getInstalledTrackers from "../../../../../utils/fetchers/getInstalledTrackers";

/* API MUTATION */
import deleteBbguuid from "../../../../../utils/mutators/delete/deleteBbguuid";

/* SENDING MAIL */
import sendTrackerInstallationRequest from "../../../../../utils/misc/sendTrackerInstallationRequest";


/* COMPONENTS */
import BBGuuidForm from "../../../../../components/forms/BBGuuidForm";
import TrackerCard from "../../../../../components/cards/TrackerCard";
import { Row, Col, Divider, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";

/* NOTIFICATIONS */
import { toast } from "react-toastify";

/* HOOKS */
import useDeleteConfirmation from "../../../../../custom_hooks/useDeleteConfirmation";
import useAddItemModal from "../../../../../custom_hooks/useAddItemModal";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function BBGUuid() {
  /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
  const router = useRouter();
  const { id: uuidId } = router.query;
  const queryClient = useQueryClient();

  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const BBGuuidQuery = useQuery(
    ["bbgUuid", uuidId, 1 /* depth param */],
    getBbguuid
  );

  const BBGSubscriptionsQuery = useQuery(
    ["bbgSubscriptions", 1 /* Depth */],
    getBbgSubscriptions
  );

  const DataConsumersQuery = useQuery(
    ["dataConsumers",0 /* Depth */],
    getDataConsumers
  )

  const InstalledTrackersQuery = useQuery(
    ["installedTrackers", uuidId, 1 /* depth param */],
    getInstalledTrackers
  )



  /* -----~~~~~>>>INSTALLING TRACKERS<<<~~~~~----- */
  const sendRequestMutation = useMutation(sendTrackerInstallationRequest, {
    onSuccess: () => {
      toast.success(`Send Installation Request to ${BBGuuidQuery.data?.data_consumer.email}`);
      queryClient.refetchQueries(
        ["installedTrackers", uuidId, 1 /* depth param */],
      );
    },
    onError: (error) => {
      toast.error(String(error));
    },
  }
    )

  /* -----~~~~~>>>DELETION<<<~~~~~----- */
  const [DeleteModal, showDeleteModal] = useDeleteConfirmation(
    deleteBbguuid, // Api call
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
            <h2>Tracker installation requests</h2>
            {InstalledTrackersQuery.data?.map((tracker) => {
              return <TrackerCard tracker={tracker} key={tracker.id}/>;
            })}
            {/* Install new tracker button */}
            {/* ------------------------------------------ */}
            <div
              onClick={() => sendRequestMutation.mutate({uuidId: uuidId})}
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
              Send installation request
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
