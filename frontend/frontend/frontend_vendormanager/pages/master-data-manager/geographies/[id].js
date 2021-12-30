/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import { useRouter } from "next/router";
import Link from "next/link";

/* API FETCHING */
import {
  dehydrate,
  QueryClient,
  useQuery,
  useMutation,
  useQueryClient,
} from "react-query";
import getLocationWithBuildings from "../../../api_utils/api_fetchers/getLocationWithBuildings";
import getDataConsumers from "../../../api_utils/api_fetchers/getDataConsumers";

/* API MUTATION */
import postBuilding from "../../../api_utils/api_mutators/post/postBuilding";
import deleteLocation from "../../../api_utils/api_mutators/delete/deleteLocation";

/* COMPONENTS */
import LocationForm from "../../../components/forms/LocationForm";
import BuildingCard from "../../../components/cards/BuildingCard";
import { Row, Col, Divider, Button, Table } from "antd";

/* STYLING */
import { UilMapMarkerPlus } from "@iconscout/react-unicons";

/* HOOKS */
import useDeleteConfirmation from "../../../custom_hooks/useDeleteConfirmation";
import useAddItemModal from "../../../custom_hooks/useAddItemModal";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function Organization() {
  /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
  const router = useRouter();
  const { id: locationId } = router.query;

  const queryClient = useQueryClient();

  /* -----~~~~~>>>DELETION<<<~~~~~----- */
  const [DeleteModal, showDeleteModal] = useDeleteConfirmation(
    deleteLocation, // Api call
    "Deleted location successfully", // Success Notification Text
    "locations", // Query to invalidate on success
    locationId, // Id to delete
    "Are you sure you want to delete this location?", // Confirmation Text
    "/master-data-manager/geographies" // Next Link
  );

  /* -----~~~~~>>>ADDING BUILDINGS<<<~~~~~----- */
  const [_, AddBuildingModal, showAddBuildingModal] = useAddItemModal(
    postBuilding,
    "building_name",
    "Successfully added new building!",
    "locationWithBuildings",
    "Add new building",
    { building_location: locationId } // Additional values
  );

  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const locationQuery = useQuery(
    ["locationWithBuildings", locationId],
    getLocationWithBuildings
  );
  const location = locationQuery?.data;
  const buildings = location?.buildings;

  const dataConsumersQuery = useQuery(
    ["dataConsumers", 0 /* JSON depth */, locationId],
    getDataConsumers
  );
  /* -----~~~~~>>>COLUMN DEFINITION<<<~~~~~----- */
  const dataConsumersColumns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      render: (text, record) => {
        return (
          <Link href={`/master-data-manager/employees/${record?.id}`}>
              {`${record?.first_name} ${record?.last_name}`}
          </Link>
        );
      },
    },
  ];

  /* --------------------------------------------------------------------------- */
  /* ~~~~~~RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* --------------------------------------------------------------------------- */
  if (locationQuery.isLoading) {
    return <>Loading...</>;
  }

  if (locationQuery.error) {
    return <>Error...</>;
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col flex={1}>
          <h2>
            Location in {location.city}, {location.country}
          </h2>
          <LocationForm initialValues={location} locationId={locationId} />
        </Col>
        <Divider type="vertical" style={{ minHeight: "45em" }} />
        <Col flex={1}>
          <div
            style={{
              height: "70vh",
              /* overflowY: "scroll",
            scrollbarWidth: "none", */
            }}
          >
            <h2>Buildings associated with this location</h2>
            {buildings.map((building) => {
              return <BuildingCard building={building} />;
            })}
            {/* Create new Building button */}
            {/* ------------------------------------------ */}
            <div
              onClick={showAddBuildingModal}
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
              <UilMapMarkerPlus />
              Add new Building
            </div>
            {/* ------------------------------------------ */}
          </div>
        </Col>
        <Divider type="vertical" style={{ minHeight: "45em" }} />
        <Col flex={1}>
          <h2>Employees associated with this location</h2>
          {/* Displaying Entities at that location */}
          {/* ------------------------------------------ */}
          <Table
            dataSource={dataConsumersQuery?.data}
            columns={dataConsumersColumns}
          />
          {/* ------------------------------------------ */}
        </Col>
      </Row>
      <Divider></Divider>
      <Row justify="center">
        <Button onClick={showDeleteModal} type="primary" danger>
          Delete Location
        </Button>
      </Row>

      {AddBuildingModal}
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
  const locationId = context.params.id;

  /* -----~~~~~>>>DATA FETCHING<<<~~~~~----- */
  await queryClient.prefetchQuery(
    ["locationWithBuildings", locationId],
    getLocationWithBuildings
  );

  await queryClient.prefetchQuery(
    ["dataConsumers", 0 /* JSON depth */, locationId],
    getDataConsumers
  );
  /* -----~~~~~>>>PASSING PROPS<<<~~~~~----- */
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
