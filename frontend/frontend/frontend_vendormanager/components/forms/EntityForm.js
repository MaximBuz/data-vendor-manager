import React, { useState } from "react";
import { Form, Input, Button, Select, Option } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

export default function EntityForm({ initialValues }) {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        name: initialValues.name,
        type: initialValues.type.name,
        description: initialValues.description,
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
        <Select style={{ width: 200 }}>
            {/* Dynamically fetch options and create new ones */}
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
      >
        <TextArea placeholder="Add a description of this organizational entity" />
      </Form.Item>

      <Form.Item>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>
  );
}
