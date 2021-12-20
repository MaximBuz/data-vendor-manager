// React
import { useState } from "react";

// Routing
import { useRouter } from "next/router";

// Data Mutation
import {
  useMutation,
  useQueryClient,
} from "react-query";
import deleteBuilding from "../../api_utils/api_mutators/deleteBuilding";
import DeleteModal from "../modals/DeleteModal";

// Styling
import { UilBuilding } from "@iconscout/react-unicons";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

// Notifications
import { toast } from 'react-toastify';

export default function BuildingCard({ building }) {

  //setting up mutations with react query
  const queryClient = useQueryClient();

  /* 
  --------------------------------------
  Handle Deletion Confirmation Modal
  --------------------------------------
  */

  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const showDeleteModal = () => setDeleteConfirmationVisible(true);

  // creating mutator
  const buildingDeletionMutation = useMutation(deleteBuilding, {
    onSuccess: () => {
      toast.success("Deleted building successfully")
      queryClient.invalidateQueries("locationWithBuildings");
    },
  });

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
      <DeleteModal
        modalVisibility={deleteConfirmationVisible}
        setModalVisible={setDeleteConfirmationVisible}
        mutator={buildingDeletionMutation}
        idToDelete={building.id}
        text="Are you sure you want to delete this building?"
      ></DeleteModal>
    </div>
  );
}
