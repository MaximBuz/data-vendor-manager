// React
import { useState } from "react";
import Link from "next/link";

// Components
import {
  Form,
  Input,
  Button,
  Select,
  Tooltip,
  Space,
  Modal,
  Col,
  Row,
  Divider,
} from "antd";
import { InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";

// Data mutation
import { useQueryClient, useMutation, useQueries } from "react-query";
import postEntityType from "../../api_utils/api_mutators/postEntityType";
import postEntity from "../../api_utils/api_mutators/postEntity";

export default function CreateEntityForm({
  entityTypes,
  parentEntities,
  locations,
}) {
  //setting up mutations with react query
  const queryClient = useQueryClient();
  const typeMutation = useMutation(postEntityType);
  const mutation = useMutation(postEntity, {
    onSuccess: () =>
      queryClient.invalidateQueries("organizationalEntityRootChildren"),
  });

  /* 
  --------------------------------------
  Handle Modal for adding entity Types
  --------------------------------------
  */

  // modal functionality
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Add new Entity Type");
  const showModal = () => setVisible(true);

  // handling form inside modal
  const [modalForm] = Form.useForm();

  // handle submit
  const handleOk = () => {
    modalForm
      .validateFields()
      .then((values) => {
        modalForm.resetFields();
        typeMutation.mutate({ values });
        setVisible(false);
      })
      .catch((info) => console.log(info));
  };
  const handleCancel = () => {
    setVisible(false);
  };

  /* 
  --------------------------------------
  Handle main form
  --------------------------------------
  */

  // Initialize Form
  const [form] = Form.useForm();

  // Initialize Text Area
  const { TextArea } = Input;

  // Initialize DropDown Options
  const { Option } = Select;

  // Submiting logic
  const onFinish = (values) => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        mutation.mutate({ values: values });
      })
      .catch((info) => console.log(info));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Row gutter={[100]}>
          <Col flex={1}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input an entity name!",
                },
              ]}
              tooltip={{
                title: "What is the name of this organizational entity?",
                icon: <InfoCircleOutlined />,
                placement: "right",
              }}
            >
              <Input placeholder="Add entity name" />
            </Form.Item>

            <Space size="small" align="center">
              <Form.Item
                name="type"
                label="Type"
                rules={[
                  {
                    required: true,
                    message: "Please choose an entity type!",
                  },
                ]}
                tooltip={{
                  title:
                    "What type of organizational entity is this? (e.g. division, business unit, legal entity, etc.)",
                  icon: <InfoCircleOutlined />,
                  placement: "right",
                }}
              >
                <Select style={{ minWidth: "300px" }}>
                  {entityTypes &&
                    entityTypes.map((type) => {
                      return <Option value={type.id}>{type.name}</Option>;
                    })}
                </Select>
              </Form.Item>
              <Tooltip title="Add new entity type" placement="right">
                <Button
                  onClick={showModal}
                  style={{ position: "relative", top: "3px" }}
                  shape="circle"
                  icon={<PlusOutlined />}
                />
              </Tooltip>
            </Space>

            <Form.Item label="Description" name="description">
              <TextArea placeholder="Add a description of this organizational entity" />
            </Form.Item>
          </Col>
          <Divider type="vertical" style={{ minHeight: "70vh" }} />
          <Col flex={1}>
            <Form.Item
              label="Internal ID"
              name="internal_id"
              tooltip={{
                title:
                  "Does this entity have an ID in your company specifiy ERP system?",
                icon: <InfoCircleOutlined />,
                placement: "right",
              }}
            >
              <Input placeholder="Add the company specific ID of this entity" />
            </Form.Item>

            <Space size="small" align="center">
              <Form.Item
                name="parent"
                label="Parent Entity"
                tooltip={{
                  title:
                    "Is this entity controlled by another parent organization? (i.e. A department is controlled by a business unit",
                  icon: <InfoCircleOutlined />,
                  placement: "right",
                }}
              >
                <Select style={{ minWidth: "300px" }}>
                  {parentEntities &&
                    parentEntities.map((entity) => {
                      return <Option value={entity.id}>{entity.name}</Option>;
                    })}
                </Select>
              </Form.Item>
              <Link href="/master-data-manager/organizations/create">
                <Tooltip title="Add new Entity" placement="right">
                  <Button
                    style={{ position: "relative", top: "3px" }}
                    shape="circle"
                    icon={<PlusOutlined />}
                  />
                </Tooltip>
              </Link>
            </Space>
            <br />
            <Space size="small" align="center">
              <Form.Item
                name="location"
                label="Location"
                tooltip={{
                  title:
                    "Please only submit a location, if this organizational entity can be described by one location only.",
                  icon: <InfoCircleOutlined />,
                  placement: "right",
                }}
              >
                <Select style={{ minWidth: "300px" }}>
                  {locations &&
                    locations.map((location) => {
                      return (
                        <Option value={location.id}>
                          {location.street +
                            " " +
                            location.street_nr +
                            ", " +
                            location.city +
                            ", " +
                            location.country}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
              <Link href="/master-data-manager/geographies/create">
                <Tooltip title="Add new Location" placement="right">
                  <Button
                    style={{ position: "relative", top: "3px" }}
                    shape="circle"
                    icon={<PlusOutlined />}
                  />
                </Tooltip>
              </Link>
            </Space>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add entity
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Add new Entity Type"
        visible={visible}
        okText="Add"
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form form={modalForm} preserve={false} layout="vertical">
          <Form.Item name="name">
            <Input placeholder="Add a new Entity Type" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
