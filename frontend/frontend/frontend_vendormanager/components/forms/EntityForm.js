// React
import { useState } from "react";
import Link from "next/link";

// Components
import { Form, Input, Button, Select, Tooltip, Space, Modal } from "antd";
import { InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";

// Data mutation
import { useQueryClient, useMutation, useQueries } from "react-query";
import postEntityType from "../../api_utils/api_mutators/post/postEntityType";
import patchEntity from "../../api_utils/api_mutators/patch/patchEntity";

// Notifications
import { toast } from "react-toastify";

// Custom Hooks
import useAddItemModal from "../../custom_hooks/useAddItemModal";

export default function EntityForm({
  initialValues,
  entityTypes,
  parentEntities,
}) {

// Adding Entity Types Functionality
const [AddEntityTypeButton, AddEntityTypeModal] = useAddItemModal(
  postEntityType,
  "name",
  "Successfully added entity type!",
  "entityTypes",
  "Add new entity type"
);


  //setting up mutations with react query
  const queryClient = useQueryClient()
  const mutation = useMutation(patchEntity, {onSuccess: () => {
    toast.success("Updated entity successfully")
    queryClient.invalidateQueries("organizationalEntityRootChildren")}})

  
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
    mutation.mutate({values: values, id: initialValues.id})
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
        /* Here map the input data to form names */
        initialValues={{
          name: initialValues.name,
          type: initialValues.type.id,
          description: initialValues.description,
          internal_id: initialValues.internal_id,
          parent: initialValues.parent?.id,
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          required
          tooltip={{
            title: "What is the name of this organizational entity?",
            icon: <InfoCircleOutlined />,
            placement: "right"
          }}
        >
          <Input placeholder="input placeholder" />
        </Form.Item>

        <Space size="small" align="center">
          <Form.Item
            name="type"
            label="Type"
            required
            tooltip={{
              title:
                "What type of organizational entity is this? (e.g. division, business unit, legal entity, etc.)",
              icon: <InfoCircleOutlined />,
              placement: "right"
            }}
          >
            <Select style={{ minWidth: "300px" }}>
              {entityTypes &&
                entityTypes.map((type) => {
                  return <Option value={type.id}>{type.name}</Option>;
                })}
            </Select>
          </Form.Item>
          {AddEntityTypeButton}
        </Space>

        <Form.Item label="Description" name="description">
          <TextArea placeholder="Add a description of this organizational entity" />
        </Form.Item>

        <Form.Item
          label="Internal ID"
          name="internal_id"
          tooltip={{
            title:
              "Does this entity have an ID in your company specifiy ERP system?",
            icon: <InfoCircleOutlined />,
            placement: "right"
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
            placement: "right"
          }}
        >
          <Select style={{ minWidth: "300px" }}>
            {parentEntities &&
              parentEntities.map((entity) => {
                if (entity.id === initialValues.id) return <Option disabled value={entity.id}>{entity.name}</Option>;
                return <Option value={entity.id}>{entity.name}</Option>;
              })}
          </Select>
        </Form.Item>
          <a href="/master-data-manager/organizations/create" target="_blank">
          <Tooltip title="Add new Entity" placement="right">
              <Button
                style={{ position: "relative", top: "3px" }}
                shape="circle"
                icon={<PlusOutlined />}
              />
            </Tooltip>
          </a>
        </Space>
        <br/>
        
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save changes
          </Button>
        </Form.Item>
      </Form>
              {AddEntityTypeModal}
    </>
  );
}
