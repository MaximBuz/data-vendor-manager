// Components
import {
  Form,
  Input,
  Button,
  Tooltip,
  Divider,
  TreeSelect,
  Select,
} from "antd";
import { InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";

// Data mutation
import { useQueryClient, useMutation, useQueries } from "react-query";
import patchLocation from "../../api_utils/api_mutators/patch/patchLocation";
import postJob from "../../api_utils/api_mutators/post/postJob";

// Notifications
import { toast } from "react-toastify";

// Custom Hooks
import useAddItemModal from "../../custom_hooks/useAddItemModal";

export default function EntityForm({
  initialValues,
  activityTags,
  organizationalTree,
  locations,
  jobs,
}) {
  // Adding Job Titles Functionality
  const [AddJobButton, AddJobModal] = useAddItemModal(
    postJob,
    "title",
    "Successfully added new job title!",
    "jobs",
    "Add new job title"
  );

  //setting up mutations with react query
  const queryClient = useQueryClient();
  const mutation = useMutation(patchLocation, {
    onSuccess: () => {
      toast.success("Updated location successfully");
      queryClient.invalidateQueries(["dataConsumers", "dataConsumer"]);
    },
  });

  console.log(organizationalTree);
  // Initialize Form
  const [form] = Form.useForm();

  // Submiting logic
  const onFinish = (values) => {
    console.log(values);
    //mutation.mutate({ values: values, id: initialValues.id });
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
          job_title: initialValues.job_title?.id,
          /* organizational_entity: [initialValues.organizational_entity.name], */
          building: initialValues.building.building_name,
          location: initialValues.location?.id,
        }}
      >
        <Form.Item label="Email" name="email" required>
          <Input placeholder="Add email" />
        </Form.Item>
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
            alignItems: "center",
          }}
        >
          <Form.Item
            style={{ flexGrow: "2" }}
            initialValue={initialValues.organizational_entity.id}
            label="Organizational Entity"
            name="organizational_entity"
          >
            <TreeSelect
              treeLine={{ showLeafIcon: false }}
              treeData={organizationalTree}
              treeDefaultExpandAll
              placeholder="Please select entity"
            />
          </Form.Item>

          <Form.Item style={{ flexGrow: "1" }} name="location" label="Location">
            <Select style={{ minWidth: "300px" }}>
              {locations &&
                locations.map((location) => {
                  return (
                    <Select.Option value={location.id}>
                      {location.street +
                        " " +
                        location.street_nr +
                        ", " +
                        location.city +
                        ", " +
                        location.country}
                    </Select.Option>
                  );
                })}
            </Select>
          </Form.Item>

          <a href="/master-data-manager/geographies/create" target="_blank">
            <Tooltip title="Add new Location" placement="right">
              <Button
                style={{ position: "relative", top: "3px" }}
                shape="circle"
                icon={<PlusOutlined />}
              />
            </Tooltip>
          </a>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <Form.Item style={{ flexGrow: "1" }} label="Building" name="building">
            <Select></Select>
          </Form.Item>

          <Form.Item style={{ flexGrow: "1" }} label="Floor" name="floor">
            <Input placeholder="Add floor" />
          </Form.Item>

          <Form.Item style={{ flexGrow: "1" }} label="Seat" name="seat">
            <Input placeholder="Add seat" />
          </Form.Item>
        </div>
        <Divider />
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Form.Item
            name="job_title"
            label="Job Title"
            style={{ flexGrow: "1" }}
          >
            <Select style={{ minWidth: "300px" }}>
              {jobs &&
                jobs.map((job) => {
                  return (
                    <Select.Option value={job.id}>{job.title}</Select.Option>
                  );
                })}
            </Select>
          </Form.Item>

          {AddJobButton}
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Form.Item
            style={{ flexGrow: "1" }}
            label="Activity Tags"
            name="activity"
            initialValue={initialValues.activity?.map((tag) => tag.id)}
          >
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Please select activity tags"
              filterOption={(input, option) =>
                option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {activityTags?.map((tag) => (
                <Select.Option key={tag.name} value={tag.id}>
                  {tag.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Tooltip title="Add new activity tag" placement="right">
            <Button
              onClick={"showModal"}
              style={{ position: "relative", top: "3px" }}
              shape="circle"
              icon={<PlusOutlined />}
            />
          </Tooltip>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save changes
          </Button>
        </Form.Item>
      </Form>
      {AddJobModal}
    </>
  );
}
