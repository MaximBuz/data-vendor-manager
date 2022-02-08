/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import { useRouter } from "next/router";

/* HOOKS */
import { useState } from "react";

/* COMPONENTS */
import { Modal } from "antd";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function DeleteModal({
  modalVisibility,
  setModalVisible,
  mutator,
  idToDelete,
  text,
  nextLink,
}) {
  /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
  const router = useRouter();
  const [confirmLoading, setConfirmLoading] = useState(false);

  /* -----~~~~~>>>SUBMITTING<<<~~~~~----- */
  const handleSubmit = () => {
    mutator.mutate(idToDelete);
    setModalVisible(false);
    nextLink && router.push(nextLink);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  /* --------------------------------------------------------------------------- */
  /* ~~~~~~RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* --------------------------------------------------------------------------- */
  return (
    <>
      <Modal
        title="Confirm deletion"
        visible={modalVisibility}
        okText="Delete"
        onOk={handleSubmit}
        okButtonProps={{ danger: true }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {text}
      </Modal>
    </>
  );
}
