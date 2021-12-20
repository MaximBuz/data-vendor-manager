// React
import { useState } from "react";
import Link from "next/link";

// Components
import { Form, Input, Button, Tooltip, Space } from "antd";
import { InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";

// Data mutation
import { useQueryClient, useMutation, useQueries } from "react-query";
import patchLocation from "../../api_utils/api_mutators/patchLocation";

export default function EntityForm({ initialValues }) {
  //setting up mutations with react query
  const queryClient = useQueryClient();
  const mutation = useMutation(patchLocation, {onSuccess: () => queryClient.invalidateQueries("locationWithBuildings")})

  // Initialize Form
  const [form] = Form.useForm();

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
          country: initialValues.country,
          state: initialValues.state,
          city: initialValues.city,
          zip_code: initialValues.zip_code,
          street: initialValues.street,
          street_nr: initialValues.street_nr,
        }}
      >
        <Space>
          <Form.Item label="Country" name="country">
            <Input placeholder="Add Country" />
          </Form.Item>

          <Form.Item label="State" name="state">
            <Input placeholder="Add State" />
          </Form.Item>
        </Space>{" "}
        <br />
        <Space>
          <Form.Item label="City" name="city">
            <Input placeholder="Add City" />
          </Form.Item>

          <Form.Item label="ZIP Code" name="zip_code">
            <Input placeholder="Add zip_code" />
          </Form.Item>
        </Space>
        <br />
        <Space>
          <Form.Item label="Street" name="street">
            <Input placeholder="Add Street" />
          </Form.Item>

          <Form.Item label="Street Number" name="street_nr">
            <Input placeholder="Add Street Number" />
          </Form.Item>
        </Space>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save changes
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
