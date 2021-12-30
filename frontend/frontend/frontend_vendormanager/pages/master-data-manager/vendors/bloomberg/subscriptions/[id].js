/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import { useRouter } from "next/router";

/* API FETCHING */
import { dehydrate, QueryClient, useQuery } from "react-query";
import getBBGSubscription from "../../../../../api_utils/api_fetchers/getBBGSubscription";
import getBBGFirmNrs from "../../../../../api_utils/api_fetchers/getBBGFirmNrs";

/* API MUTATION */
import deleteBBGSubscription from "../../../../../api_utils/api_mutators/delete/deleteBBGSubscription";

/* COMPONENTS */
import BBGSubscriptionForm from "../../../../../components/forms/BBGSubscriptionForm";
import { Row, Col, Divider, Button } from "antd";

/* HOOKS */
import useDeleteConfirmation from "../../../../../custom_hooks/useDeleteConfirmation";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function BBGSubscription() {
  /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
  const router = useRouter();
  const { id: subscriptionId } = router.query;

  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const BBGSubscriptionQuery = useQuery(
    ["bbgSubscription", subscriptionId, 1 /* depth param */],
    getBBGSubscription
  );

  /* -----~~~~~>>>DELETION<<<~~~~~----- */
  const [DeleteModal, showDeleteModal] = useDeleteConfirmation(
    deleteBBGSubscription, // Api call
    "Deleted Bloomberg Subscription successfully", // Success Notification Text
    ["bbgSubscriptions", 1 /* Depth */], // Query to invalidate on success
    subscriptionId, // Id to delete
    "Are you sure you want to delete this Bloomberg Subscription (and all its children)?", // Confirmation Text
    "/master-data-manager/vendors" // Next Link
  );

  /* --------------------------------------------------------------------------- */
  /* ~~~~~~RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* --------------------------------------------------------------------------- */
  if (BBGSubscriptionQuery.isLoading) {
    return <>Loading...</>;
  }

  if (BBGSubscriptionQuery.error) {
    return <>Error...</>;
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col flex={2}>
          <h2>
            {BBGSubscriptionQuery.data?.subscription_id}
          </h2>
          <BBGSubscriptionIdForm
            subscriptionId={subscriptionId}
            initialValues={BBGSubscriptionQuery?.data}
          />
        </Col>
      </Row>
      <Divider></Divider>
      <Row justify="center">
        <Button onClick={showDeleteModal} type="primary" danger>
          Delete Subscription
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
  const subscriptionId = context.params.id;

  /* -----~~~~~>>>PASSING PROPS<<<~~~~~----- */
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
