/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import { useRouter } from "next/router";

/* API FETCHING */
import { dehydrate, QueryClient, useQuery } from "react-query";
import getBbgAccountNr from "../../../../../utils/fetchers/getBbgAccountNr";
import getBbgFirmNrs from "../../../../../utils/fetchers/getBbgFirmNrs";
import getLocations from "../../../../../utils/fetchers/getLocations";

/* API MUTATION */
import deleteBbgAccountNr from "../../../../../utils/mutators/delete/deleteBbgAccountNr";

/* COMPONENTS */
import BBGAccountNrForm from "../../../../../components/forms/BBGAccountNrForm";
import { Row, Col, Tree, Divider, Button } from "antd";

/* HOOKS */
import useDeleteConfirmation from "../../../../../custom_hooks/useDeleteConfirmation";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function BBGAccountNr() {
  /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
  const router = useRouter();
  const { id: accountNrId } = router.query;

  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const BBGAccountNrQuery = useQuery(
    ["bbgAccountNr", accountNrId, 2 /* depth param */],
    getBbgAccountNr
  );
  const locations = useQuery(["locations", 2], getLocations);
  const BBGFirmsQuery = useQuery(["bbgFirmNrs", 1], getBbgFirmNrs);

  /* -----~~~~~>>>DELETION<<<~~~~~----- */
  const [DeleteModal, showDeleteModal] = useDeleteConfirmation(
    deleteBbgAccountNr, // Api call
    "Deleted Bloomberg Account Nr successfully", // Success Notification Text
    ["bbgAccountNrs", 1 /* Depth */], // Query to invalidate on success
    accountNrId, // Id to delete
    "Are you sure you want to delete this Bloomberg Account Number (and all its children)?", // Confirmation Text
    "/master-data-manager/vendors" // Next Link
  );

  /* --------------------------------------------------------------------------- */
  /* ~~~~~~RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* --------------------------------------------------------------------------- */
  if (BBGAccountNrQuery.isLoading || locations.isLoading) {
    return <>Loading...</>;
  }

  if (BBGAccountNrQuery.error || locations.error) {
    return <>Error...</>;
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col flex={2}>
          <h2>
            {BBGAccountNrQuery.data?.account_number} (
            {BBGAccountNrQuery.data?.location?.street},{" "}
            {BBGAccountNrQuery.data?.location?.city},{" "}
            {BBGAccountNrQuery.data?.location?.country})
          </h2>
          <BBGAccountNrForm
            accountNrId={accountNrId}
            initialValues={BBGAccountNrQuery.isSuccess && BBGAccountNrQuery.data}
            locations={locations.isSuccess && locations.data}
            firmNrs={BBGFirmsQuery.isSuccess && BBGFirmsQuery.data}
          />
        </Col>
      </Row>
      <Divider></Divider>
      <Row justify="center">
        <Button onClick={showDeleteModal} type="primary" danger>
          Delete Account
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
//   const accountNrId = context.params.id;

//   /* -----~~~~~>>>PASSING PROPS<<<~~~~~----- */
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }
