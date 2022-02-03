/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* COMPONENTS */
import EntityForm from "../../../components/forms/EntityForm";

/* API FETCHING */
import { dehydrate, QueryClient, useQuery } from "react-query";
import getEntityTypes from "../../../utils/fetchers/getEntityTypes";
import getOrganizationalEntities from "../../../utils/fetchers/getOrganizationalEntities";
import getLocations from "../../../utils/fetchers/getLocations";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function Create() {
  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const entityTypesQuery = useQuery(
    ["entityTypes", 2 /* depth */],
    getEntityTypes
  );

  const parentEntitiesQuery = useQuery(
    ["organizationalEntities", 1 /* depth */],
    getOrganizationalEntities
  );

  const locationsQuery = useQuery(["locations"], getLocations);

  const entityTypes = entityTypesQuery.isSuccess && entityTypesQuery.data;
  const parentEntities = parentEntitiesQuery.isSuccess && parentEntitiesQuery.data;
  const locations = locationsQuery.isSuccess && locationsQuery.data;

  /* --------------------------------------------------------------------------- */
  /* ~~~~~~RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* --------------------------------------------------------------------------- */
  return (
    <>
      <h2>Create a new organizational entity</h2>
      <EntityForm
        entityTypes={entityTypes}
        parentEntities={parentEntities}
        locations={locations}
      />
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
//   await queryClient.prefetchQuery(
//     ["entityTypes", 2 /* depth */],
//     getEntityTypes
//   );

//   await queryClient.prefetchQuery(["locations"], getLocations);

//   /* -----~~~~~>>>PASSING PROPS<<<~~~~~----- */
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }
