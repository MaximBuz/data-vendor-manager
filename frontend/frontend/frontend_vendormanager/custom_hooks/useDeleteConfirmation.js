/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* API MUTATION */
import { useMutation, useQueryClient } from "react-query";

/* COMPONENTS */
import DeleteModal from "../components/modals/DeleteModal";

/* NOTIFICATIONS */
import { toast } from "react-toastify";

/* HOOKS */
import { useState } from "react";

/* --------------------------------------------------------------------------- */
/* ~~~~~~HOOK~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function useDeleteConfirmation(
  apiCall,
  toastText,
  queryToInvalidate,
  idToDelete,
  confirmationText,
  nextLink
) {
  /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
  const queryClient = useQueryClient();

  /* -----~~~~~>>>OPEN/CLOSE<<<~~~~~----- */
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const showDeleteModal = () => setDeleteConfirmationVisible(true);

  /* -----~~~~~>>>DATA MUTATION<<<~~~~~----- */
  const deletionMutation = useMutation(apiCall, {
    onSuccess: () => {
      toastText && toast.success(toastText);
      queryToInvalidate && queryClient.invalidateQueries(queryToInvalidate);
    },
    onError: error => {
      toast.error(String(error))
    },
  });

  /* --------------------------------------------------------------------------- */
  /* ~~~~~~RETURN ITEMS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* --------------------------------------------------------------------------- */
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
