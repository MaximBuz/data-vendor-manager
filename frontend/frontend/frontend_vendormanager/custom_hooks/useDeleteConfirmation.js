import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import DeleteModal from "../components/modals/DeleteModal";

export default function useDeleteConfirmation(
  apiCall,
  toastText,
  queryToInvalidate,
  idToDelete,
  confirmationText,
  nextLink
) {
  const queryClient = useQueryClient();
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const showDeleteModal = () => setDeleteConfirmationVisible(true);
  const deletionMutation = useMutation(apiCall, {
    onSuccess: () => {
      toastText && toast.success(toastText);
      queryToInvalidate && queryClient.invalidateQueries(queryToInvalidate);
    },
  });

  return [
    <DeleteModal
      modalVisibility={deleteConfirmationVisible}
      setModalVisible={setDeleteConfirmationVisible}
      mutator={deletionMutation}
      idToDelete={idToDelete}
      text={confirmationText}
      nextLink={nextLink}
    ></DeleteModal>,
    showDeleteModal,
  ];
}
