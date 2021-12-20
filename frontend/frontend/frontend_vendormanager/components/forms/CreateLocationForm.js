// Routing
import Link from "next/link";
import { useRouter } from "next/router";

// Components
import { Form, Input, Button, Space } from "antd";

// Data mutation
import { useQueryClient, useMutation } from "react-query";
import postLocation from "../../api_utils/api_mutators/postLocation";

export default function CreateEntityForm({ initialValues }) {
  // initialize routing
  const router = useRouter();

  //setting up mutations with react query
  const queryClient = useQueryClient();
  const mutation = useMutation(postLocation, {
    onSuccess: () => queryClient.invalidateQueries("locations"),
  });

  // Initialize Formyx<<<
  const [form] = Form.useForm();

  // Submiting logic
  const onFinish = (values) => {
    mutation.mutate(values);
    router.push("/master-data-manager/geographies/")
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
        <Form.Item label="Country" name="country">
          <Input placeholder="Add Country" />
        </Form.Item>
        <Form.Item label="State" name="state">
          <Input placeholder="Add State" />
        </Form.Item>{" "}
        <Form.Item label="City" name="city">
          <Input placeholder="Add City" />
        </Form.Item>
        <Form.Item label="ZIP Code" name="zip_code">
          <Input placeholder="Add zip_code" />
        </Form.Item>
        <Form.Item label="Street" name="street">
          <Input placeholder="Add Street" />
        </Form.Item>
        <Form.Item label="Street Number" name="street_nr">
          <Input placeholder="Add Street Number" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Location
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
