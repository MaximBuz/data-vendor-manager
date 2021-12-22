// Routing
import { useRouter } from "next/router";

// Components
import {
  Form,
  Input,
  Button,
  Select,
  Tooltip,
  Space,
  Col,
  Row,
  Divider,
} from "antd";
import { InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";

// Data mutation
import { useQueryClient, useMutation } from "react-query";
import postEntityType from "../../api_utils/api_mutators/post/postEntityType";
import postEntity from "../../api_utils/api_mutators/post/postEntity";

// Notifications
import { toast } from "react-toastify";

// Custom Hooks
import useAddItemModal from "../../custom_hooks/useAddItemModal";

export default function CreateEntityForm({
  entityTypes,
  parentEntities,
  locations,
}) {
  // Initializing router
  const router = useRouter();

  // Adding Entity Types Functionality
  const [AddTypeButton, AddTypeModal] = useAddItemModal(
    postEntityType,
    "name",
    "Successfully added entity type!",
    "entityTypes",
    "Add new entity type"
  );

  //setting up mutations with react query
  const queryClient = useQueryClient();
  const mutation = useMutation(postEntity, {
    onSuccess: () => {
      toast.success("Added entity successfully");
      queryClient.invalidateQueries("organizationalEntityRootChildren");
    },
  });

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
      .then(() => {
        router.push("/master-data-manager/organizations/");
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
              {AddTypeButton}
            </Space>

            <Form.Item label="Description" name="description">
              <TextArea placeholder="Add a description of this organizational entity" />
            </Form.Item>
          </Col>
          {<Divider type="vertical" style={{ minHeight: "45em" }} />}
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
              <a
                href="/master-data-manager/organizations/create"
                target="_blank"
              >
                <Tooltip title="Add new Entity" placement="right">
                  <Button
                    style={{ position: "relative", top: "3px" }}
                    shape="circle"
                    icon={<PlusOutlined />}
                  />
                </Tooltip>
              </a>
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
              <a href="/master-data-manager/geographies/create" target="_blank">
                <Tooltip title="Add new Location" placement="right">
                  <Button
                    style={{ position: "relative", top: "3px" }}
                    shape="circle"
                    icon={<PlusOutlined />}
                  />
                </Tooltip>
              </a>
            </Space>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add entity
          </Button>
        </Form.Item>
      </Form>

      {AddTypeModal}
    </>
  );
}
