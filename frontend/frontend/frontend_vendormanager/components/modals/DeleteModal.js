// React
import { useState } from "react";

// Routing
import { useRouter } from "next/router";

// Components
import { Modal } from "antd";

export default function DeleteModal({
  modalVisibility,
  setModalVisible,
  mutator,
  idToDelete,
  text,
  nextLink,
}) {
  // initialize routing
  const router = useRouter();

  const [confirmLoading, setConfirmLoading] = useState(false);

  // Handle submit
  const handleSubmit = () => {
    mutator.mutate(idToDelete);
    setModalVisible(false);
    // redirection
    nextLink && router.push(nextLink);
  };

  // Handle cancel
  const handleCancel = () => {
    setModalVisible(false);
  };
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
