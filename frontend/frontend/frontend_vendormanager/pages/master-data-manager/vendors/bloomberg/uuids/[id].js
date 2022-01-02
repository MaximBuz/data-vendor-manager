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
import { Row, Col, Divider, Button } from "antd";

/* HOOKS */
import useDeleteConfirmation from "../../../../../custom_hooks/useDeleteConfirmation";

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

export async function getServerSideProps(context) {
  /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
  const queryClient = new QueryClient();

  /* -----~~~~~>>>DATA FETCHING<<<~~~~~----- */
  const uuidId = context.params.id;

  /* -----~~~~~>>>PASSING PROPS<<<~~~~~----- */
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
