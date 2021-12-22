/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* API MUTATION */
import { useQueryClient, useMutation } from "react-query";

/* COMPONENTS */
import { Form, Modal, Input, Tooltip, Button } from "antd";

/* STYLING */
import { PlusOutlined } from "@ant-design/icons";

/* NOTIFICATIONS */
import { toast } from "react-toastify";

/* HOOKS */
import { useState } from "react";

/* --------------------------------------------------------------------------- */
/* ~~~~~~HOOK~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function useAddItemModal(
  apiCall,
  apiField,
  toastText,
  queryToInvalidate,
  modalText,
  additionalValues
) {
  /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const mutation = useMutation(apiCall, {
    onSuccess: () => {
      toast.success(toastText);
      queryClient.invalidateQueries(queryToInvalidate);
    },
  });

  /* -----~~~~~>>>OPEN/CLOSE<<<~~~~~----- */
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => setVisible(true);

  /* -----~~~~~>>>SUBMITTING<<<~~~~~----- */
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        additionalValues
          ? mutation.mutate({ ...additionalValues, values })
          : mutation.mutate({ values });
        setVisible(false);
      })
      .catch((info) => console.log(info));
  };

  /* -----~~~~~>>>CANCELLING<<<~~~~~----- */
  const handleCancel = () => {
    setVisible(false);
  };

  /* --------------------------------------------------------------------------- */
  /* ~~~~~~RETURN ITEMS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* --------------------------------------------------------------------------- */
  return [
    <Tooltip title={modalText} placement="right">
      <Button
        onClick={showModal}
        style={{ position: "relative", top: "3px" }}
        shape="circle"
        icon={<PlusOutlined />}
      />
    </Tooltip>,
    <Modal
      title={modalText}
      visible={visible}
      okText="Add"
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form form={form} preserve={false} layout="vertical">
        <Form.Item name={apiField}>
          <Input placeholder={modalText} />
        </Form.Item>
      </Form>
    </Modal>,
    showModal,
  ];
}
