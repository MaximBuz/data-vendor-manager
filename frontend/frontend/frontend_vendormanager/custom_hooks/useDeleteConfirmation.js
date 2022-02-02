/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* API MUTATION */
import { useMutation, useQueryClient } from "react-query";

/* ROUTING */
import { useRouter } from "next/router";

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
  const router = useRouter();

  /* -----~~~~~>>>OPEN/CLOSE<<<~~~~~----- */
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const showDeleteModal = () => setDeleteConfirmationVisible(true);

  /* -----~~~~~>>>DATA MUTATION<<<~~~~~----- */
  const deletionMutation = useMutation(apiCall, {
    onSuccess: () => {
      toastText && toast.success(toastText);
      queryToInvalidate && queryClient.invalidateQueries(queryToInvalidate);
      nextLink && router.push(nextLink);
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
    ></DeleteModal>,
    showDeleteModal,
  ];
}
