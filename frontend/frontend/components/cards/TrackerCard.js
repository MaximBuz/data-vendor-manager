/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* API MUTATION */
import deleteBuilding from "../../api_utils/api_mutators/delete/deleteBuilding";

/* STYLING */
import { FieldTimeOutlined } from "@ant-design/icons";

/* COMPONENTS */
import { Popover } from "antd";

/* HOOKS */
import useDeleteConfirmation from "../../custom_hooks/useDeleteConfirmation";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function TrackerCard({ tracker }) {
  /* -----~~~~~>>>DELETION<<<~~~~~----- */
  const [DeleteModal, showDeleteModal] = useDeleteConfirmation(
    deleteBuilding,
    "Deleted building successfully",
    "locationWithBuildings",
    tracker.id,
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
      <FieldTimeOutlined style={{ fontSize: '20px' }}/>
      <h1
        style={{
          lineHeight: "1em",
          position: "relative",
          top: "4px",
        }}
      >
        {tracker.name}
      </h1>
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          gap: "10px",
        }}
      >
        <Popover
          title='Email Request sent at'
          trigger='hover'
          content={tracker.created_at.split("T")[0] + " at " + tracker.created_at.split("T")[1].split(".")[0]}
        >
          {tracker.created_at.split("T")[0]}
        </Popover>
      </div>
      {/* <div
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
      </div> */}
      {DeleteModal}
    </div>
  );
}
