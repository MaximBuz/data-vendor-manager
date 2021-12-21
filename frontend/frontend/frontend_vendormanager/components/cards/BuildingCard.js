// Data Mutation
import deleteBuilding from "../../api_utils/api_mutators/delete/deleteBuilding";

// Styling
import { UilBuilding } from "@iconscout/react-unicons";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

// Custom Hooks
import useDeleteConfirmation from "../../custom_hooks/useDeleteConfirmation";

export default function BuildingCard({ building }) {

  // Handle deletion
  const [DeleteModal, showDeleteModal] = useDeleteConfirmation(
    deleteBuilding /* Api Call */,
    "Deleted building successfully" /* Success Notification Text */,
    "locationWithBuildings" /* Query to invalidate on success */,
    building.id /* Id to delete */,
    "Are you sure you want to delete this building?" /* Confirmation Text */
  );

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
