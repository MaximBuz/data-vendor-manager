// Components
import { Form, Input, Button, Tooltip, Divider, Cascader } from "antd";
import { InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";

// Data mutation
import { useQueryClient, useMutation, useQueries } from "react-query";
import patchLocation from "../../api_utils/api_mutators/patch/patchLocation";

// Notifications
import { toast } from "react-toastify";

export default function EntityForm({ initialValues }) {
  //setting up mutations with react query
  const queryClient = useQueryClient();
  const mutation = useMutation(patchLocation, {
    onSuccess: () => {
      toast.success("Updated location successfully");
      queryClient.invalidateQueries(["dataConsumers", "dataConsumer"]);
    },
  });

  // Initialize Form
  const [form] = Form.useForm();

  // Submiting logic
  const onFinish = (values) => {
    mutation.mutate({ values: values, id: initialValues.id });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function displayRender(label) {
    return label[label.length - 1];
  }

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        /* Here map the input data to form names */
        initialValues={{
          internal_id: initialValues.internal_id,
          email: initialValues.email,
          first_name: initialValues.first_name,
          last_name: initialValues.last_name,
          floor: initialValues.floor,
          seat: initialValues.seat,
          job_title: initialValues.job_title.title,
          organizational_entity: initialValues.organizational_entity.name,
          building: initialValues.building.building_name,
          activity: "initialValues.activity", // handle arrays
        }}
      >
        <Form.Item label="Email" name="email" required>
          <Input placeholder="Add email" />
        </Form.Item>
        <Divider />
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <Form.Item
            style={{ flexGrow: "1" }}
            label="First Name"
            name="first_name"
          >
            <Input placeholder="Add first name" />
          </Form.Item>

          <Form.Item
            style={{ flexGrow: "1" }}
            label="Last Name"
            name="last_name"
          >
            <Input placeholder="Add last name" />
          </Form.Item>
          <Form.Item
            style={{ flexGrow: "1" }}
            label="Internal Id"
            name="internal_id"
          >
            <Input placeholder="Add internal id" />
          </Form.Item>
        </div>
        <Divider />
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <Form.Item label="Organizational Entity" name="organizational_entity">
            {/* <Cascader
              options={[]}
              expandTrigger="hover"
              displayRender={displayRender}
            /> */}
          </Form.Item>
          <Form.Item label="Location" name="location">
            <Input placeholder="Location" disabled />
          </Form.Item>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <Form.Item label="Building" name="building">
            {/* Select with all buildings at location options*/}
          </Form.Item>

          <Form.Item style={{ flexGrow: "1" }} label="Floor" name="floor">
            <Input placeholder="Add floor" />
          </Form.Item>

          <Form.Item style={{ flexGrow: "1" }} label="Seat" name="seat">
            <Input placeholder="Add seat" />
          </Form.Item>
        </div>
        <Divider />
        <Form.Item label="Job Title" name="job_title">
          <Input placeholder="Add job title" />
        </Form.Item>

        <Form.Item label="Activity Tags" name="activity">
          {/* Tag Selection */}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save changes
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
