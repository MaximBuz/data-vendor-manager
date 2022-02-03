/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import { useRouter } from "next/router";

/* COMPONENTS */
import { Form, Input, Button, Select, Tooltip, Space, Modal } from "antd";
import { InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";

/* API MUTATION */
import { useQueryClient, useMutation, useQueries } from "react-query";
import postEntityType from "../../api_utils/api_mutators/post/postEntityType";
import postEntity from "../../api_utils/api_mutators/post/postEntity";
import patchEntity from "../../api_utils/api_mutators/patch/patchEntity";

/* NOTIFICATIONS */
import { toast } from "react-toastify";

/* HOOKS */
import useAddItemModal from "../../custom_hooks/useAddItemModal";
import Link from "next/link";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function EntityForm({
  initialValues,
  entityTypes,
  parentEntities,
  entityId,
}) {
  /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
  const router = useRouter();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { Option } = Select;

  /* -----~~~~~>>>ADDING ENTITY TYPES<<<~~~~~----- */
  const [AddEntityTypeButton, AddEntityTypeModal] = useAddItemModal(
    postEntityType,
    "name",
    "Successfully added entity type!",
    "entityTypes",
    "Add new entity type"
  );

  /* -----~~~~~>>>DATA MUTATION<<<~~~~~----- */
  const patchMutation = useMutation(patchEntity, {
    onSuccess: () => {
      toast.success("Updated entity successfully");
      queryClient.invalidateQueries("organizationalEntityRootChildren");
    },
    onError: error => {
      toast.error(String(error))
    },
  });
  const postMutation = useMutation(postEntity, {
    onSuccess: () => {
      toast.success("Added entity successfully");
      queryClient.invalidateQueries("organizationalEntityRootChildren");
      router.push("/master-data-manager/organizations/");
    },
    onError: error => {
      toast.error(String(error))
    },
  });

  /* -----~~~~~>>>SUBMITTING<<<~~~~~----- */
  const onFinish = (values) => {
    entityId
      ? patchMutation.mutate({ values: values, id: initialValues.id })
      : postMutation.mutate({ values: values });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  /* --------------------------------------------------------------------------- */
  /* ~~~~~~RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* --------------------------------------------------------------------------- */
  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        /* Here map the input data to form names */
        initialValues={
          entityId && {
            name: initialValues.name,
            type: initialValues.type.id,
            description: initialValues.description,
            internal_id: initialValues.internal_id,
            parent: initialValues.parent?.id,
          }
        }
      >
        <Form.Item
          label="Name"
          name="name"
          required
          tooltip={{
            title: "What is the name of this organizational entity?",
            icon: <InfoCircleOutlined />,
            placement: "right",
          }}
        >
          <Input placeholder="Add a name" />
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
              placement: "right",
            }}
          >
            <Select
              placeholder="Choose an entity type"
              style={{ minWidth: "300px" }}
            >
              {entityTypes &&
                entityTypes.map((type) => {
                  return <Option value={type.id} key={type.id}>{type.name}</Option>;
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
            <Select
              placeholder="Choose a parent entity"
              style={{ minWidth: "300px" }}
            >
              {parentEntities &&
                parentEntities.map((entity) => {
                  if (entityId && entity.id === initialValues.id)
                    return (
                      <Option disabled value={entity.id} key={entity.id}>
                        {entity.name}
                      </Option>
                    );
                  return <Option value={entity.id} key={entity.id}>{entity.name}</Option>;
                })}
            </Select>
          </Form.Item>
          <Link href="/master-data-manager/organizations/create" target="_blank" passHref>
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {entityId ? "Save changes" : "Add entity"}
          </Button>
        </Form.Item>
      </Form>
      {AddEntityTypeModal}
    </>
  );
}
