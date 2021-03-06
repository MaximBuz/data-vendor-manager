/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import { useRouter } from "next/router";

/* API FETCHING */
import { dehydrate, QueryClient, useQuery } from "react-query";
import getBbgSubscription from "../../../../../utils/fetchers/getBbgSubscription";
import getBbgAccountNrs from "../../../../../utils/fetchers/getBbgAccountNrs";

/* API MUTATION */
import deleteBbgSubscription from "../../../../../utils/mutators/delete/deleteBbgSubscription";

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
    getBbgSubscription
  );

  const BBGAccountQuery = useQuery(
    ["bbgAccountNrs", 1 /* Depth */],
    getBbgAccountNrs
  );

  /* -----~~~~~>>>DELETION<<<~~~~~----- */
  const [DeleteModal, showDeleteModal] = useDeleteConfirmation(
    deleteBbgSubscription, // Api call
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
          <BBGSubscriptionForm
            subscriptionId={subscriptionId}
            initialValues={BBGSubscriptionQuery.isSuccess && BBGSubscriptionQuery.data}
            accounts={BBGAccountQuery.isSuccess && BBGAccountQuery.data}
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

// export async function getServerSideProps(context) {
//   /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
//   const queryClient = new QueryClient();

//   /* -----~~~~~>>>DATA FETCHING<<<~~~~~----- */
//   const subscriptionId = context.params.id;

//   /* -----~~~~~>>>PASSING PROPS<<<~~~~~----- */
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }
