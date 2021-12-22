// React
import { useState } from "react";

// Components
import { Form, Modal, Input, Tooltip, Button } from "antd";

// Style
import { PlusOutlined } from "@ant-design/icons";

// Data Mutation
import { useQueryClient, useMutation } from "react-query";

// Notifications
import { toast } from "react-toastify";

export default function useAddItemModal(
  apiCall,
  apiField,
  toastText,
  queryToInvalidate,
  modalText,
  additionalValues
) {
  //setting up mutations with react query
  const queryClient = useQueryClient();
  const mutation = useMutation(apiCall, {
    onSuccess: () => {
      toast.success(toastText);
      queryClient.invalidateQueries(queryToInvalidate);
    },
  });

  // Opening and closing form
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => setVisible(true);

  // handling form inside modal
  const [form] = Form.useForm();

  // handle submit
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        additionalValues
        ? mutation.mutate({ ...additionalValues, values})
        : mutation.mutate({ values })
        setVisible(false);
      })
      .catch((info) => console.log(info));
  };

  // handle cancel
  const handleCancel = () => {
    setVisible(false);
  };

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
