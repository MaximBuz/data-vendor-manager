/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* API MUTATION */
import deleteBuilding from "../../utils/mutators/delete/deleteBuilding";

/* STYLING */
import { UilBuilding } from "@iconscout/react-unicons";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

/* HOOKS */
import useDeleteConfirmation from "../../custom_hooks/useDeleteConfirmation";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function BuildingCard({ building }) {
  /* -----~~~~~>>>DELETION<<<~~~~~----- */
  const [DeleteModal, showDeleteModal] = useDeleteConfirmation(
    deleteBuilding,
    "Deleted building successfully",
    "locationWithBuildings",
    building.id,
    "Are you sure you want to delete this building?"
  );

  /* --------------------------------------------------------------------------- */
  /* ~~~~~~RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* --------------------------------------------------------------------------- */
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "20px",
        padding: "20px",
        borderRadius: "2px",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "#d9d9d9",
        margin: "20px",
        backgroundColor: "white",
      }}
    >
      <UilBuilding />
      <h1
        style={{
          lineHeight: "1em",
          position: "relative",
          top: "4px",
        }}
      >
        {building.building_name}
      </h1>
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          gap: "10px",
        }}
      >
        <EditOutlined
          style={{
            color: "grey",
            fontSize: "17px",
          }}
        />
        <DeleteOutlined
          style={{
            color: "grey",
            fontSize: "17px",
          }}
          onClick={showDeleteModal}
        />
      </div>
      {DeleteModal}
    </div>
  );
}
