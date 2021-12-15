// Components
import CreateEntityForm from "../../../components/forms/CreateEntityForm";

// Data Fetching
import { dehydrate, QueryClient, useQuery } from "react-query";
import getEntityTypes from "../../../api_utils/api_fetchers/getEntityTypes";
import getOrganizationalEntities from "../../../api_utils/api_fetchers/getOrganizationalEntities";
import getLocations from "../../../api_utils/api_fetchers/getLocations";

export default function create() {

     // Data fetching for entity types dropdown
  const entityTypesQuery = useQuery(
    ["entityTypes", 2 /* depth param */],
    getEntityTypes
  );
  const entityTypes = entityTypesQuery?.data;

  // Data fetching for parents dropdown
  const parentEntitiesQuery = useQuery(
    ["organizationalEntities", 1 /* depth param */],
    getOrganizationalEntities
  );
  const parentEntities = parentEntitiesQuery?.data;

  // Data fetching for locations dropdown
  const locationsQuery = useQuery(
    ["locations"],
    getLocations
  );
  const locations = locationsQuery?.data;

    return (
        <>
        <h2>Create a new organizational entity</h2>
            <CreateEntityForm entityTypes={entityTypes} parentEntities={parentEntities} locations={locations}/>
        </>
    )
}


export async function getServerSideProps(context) {
    // Initializing cache from React Query
    const queryClient = new QueryClient();
  
    /* 
    --------------------------------------
    Get options for "Type" dropdown in the form
    --------------------------------------
    */
  
    await queryClient.prefetchQuery(
      ["entityTypes", 2 /* depth param */],
      getEntityTypes
    );
  
    /* 
    --------------------------------------
    Get options for "Locations" dropdown in the formÌ
    --------------------------------------
    */
  
    await queryClient.prefetchQuery(
      ["locations"],
      getLocations
    );
  
  
  
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
  