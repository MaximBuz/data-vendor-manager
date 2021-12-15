import React, { useState } from "react";
import { Form, Input, Button, Select} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

export default function EntityForm({ initialValues, entityTypes }) {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const { Option } = Select;

  const transformedLocation = initialValues.location && `${initialValues.location.street} ${initialValues.location.street_nr}, ${initialValues.location.city}, ${initialValues.location.country}`

  return (
    <Form
      form={form}
      layout="vertical"
      /* Here map the input data to form names */
      initialValues={{
        name: initialValues.name,
        type: initialValues.type.name,
        description: initialValues.description,
        internal_id: initialValues.internal_id,
        parent: initialValues.parent?.name,
        location: transformedLocation
      }}
    >
      <Form.Item
        label="Name"
        name="name"
        required
        tooltip={{
          title: "What is the name of this organizational entity?",
          icon: <InfoCircleOutlined />,
        }}
      >
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item
        name="type"
        label="Type"
        required
        tooltip={{
          title: "What type of organizational entity is this? (e.g. division, business unit, legal entity, etc.)",
          icon: <InfoCircleOutlined />,
        }}
      >
        <Select style={{ width: "50%" }}>
          {entityTypes && entityTypes.map(type => {
            return (
              <Option value={type.id}>{type.name}</Option>
            )
          })}
        </Select>
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
      >
        <TextArea placeholder="Add a description of this organizational entity" />
      </Form.Item>

      <Form.Item
        label="Internal ID"
        name="internal_id"
        tooltip={{
          title: "Does this entity have an ID in your company specifiy ERP system?",
          icon: <InfoCircleOutlined />,
        }}
      >
        <Input placeholder="Add the company specific ID of this entity" />
      </Form.Item>

      <Form.Item
        name="parent"
        label="Parent Entity"
        tooltip={{
          title: "Is this entity controlled by another parent organization? (i.e. A department is controlled by a business unit",
          icon: <InfoCircleOutlined />,
        }}
      >
        <Select style={{ width: "50%" }}>
            {/* Dynamically fetch options and create new ones */}
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="location"
        label="Location"
        tooltip={{
          title: "Please only submit a location, if this organizational entity can be described by one location only.",
          icon: <InfoCircleOutlined />,
        }}
      >
        <Select style={{ width: "50%" }}>
            {/* Dynamically fetch options and create new ones */}
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary">Save changes</Button>
      </Form.Item>
    </Form>
  );
}
