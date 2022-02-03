/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import { useRouter } from "next/router";

/* COMPONENTS */
import { Form, Input, Button, Select } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

/* API MUTATION */
import { useQueryClient, useMutation } from "react-query";
import patchBBGuuid from "../../api_utils/api_mutators/patch/patchBBGuuid";
import postBBGuuid from "../../api_utils/api_mutators/post/postBBGuuid";

/* NOTIFICATIONS */
import { toast } from "react-toastify";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function BBGuuidForm({
  initialValues,
  uuidId,
  subscriptions,
  employees
}) {
  /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const router = useRouter();

  /* -----~~~~~>>>DATA MUTATION<<<~~~~~----- */
  const patchMutation = useMutation(patchBBGuuid, {
    onSuccess: () => {
      toast.success("Updated Bloomberg UUID successfully");
      queryClient.invalidateQueries([
        ["bbgUuid", uuidId, 1 /* depth param */],
        ["bbgUuids", 1 /* depth param */],
      ]);
    },
    onError: (error) => {
      toast.error(String(error));
    },
  });

  const postMutation = useMutation(postBBGuuid, {
    onSuccess: () => {
      toast.success("Added Bloomberg UUID successfully");
      queryClient.invalidateQueries(["bbgUuids", 1 /* depth param */]);
      router.push("/master-data-manager/vendors/");
    },
    onError: (error) => {
      toast.error(String(error));
    },
  });

  /* -----~~~~~>>>SUBMITTING<<<~~~~~----- */
  const onFinish = (values) => {
    uuidId
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
          uuidId && {
            uuid: initialValues.uuid,
            data_consumer: initialValues.data_consumer?.id,
            bloomberg_subscription: initialValues.bloomberg_subscription?.id,
          }
        }
      >
        <Form.Item
          tooltip={{
            title:
              initialValues?.description ||
              "A UUID is a unique number assigned to every Bloomberg login (username).",
            icon: <InfoCircleOutlined />,
            placement: "right",
          }}
          rules={[{ required: true, message: "This number is required!" }]}
          label="Unique User Identifier (UUID)"
          name="uuid"
        >
          <Input placeholder="Add Subscription ID" />
        </Form.Item>
        <Form.Item
          style={{ flexGrow: "1" }}
          name="data_consumer"
          label="Employee (Data Consumer)"
          tooltip={{
            title:
              "Every Bloomberg UUID must be assigned to one unique user login (employee)!",
            icon: <InfoCircleOutlined />,
            placement: "right",
          }}
          rules={[
            {
              required: true,
              message:
                "Please select an employee (Data Consumer)!",
            },
          ]}
        >
          <Select>
            {employees &&
              employees.map((employee) => {
                return (
                  <Select.Option value={employee.id} key={employee.id}>
                    {`${employee.email} (${employee.first_name} ${employee.last_name})`}
                  </Select.Option>
                );
              })}
          </Select>
        </Form.Item>
        <Form.Item
          style={{ flexGrow: "1" }}
          name="bloomberg_subscription"
          label="Parent Bloomberg Subscription Identifier (SID)"
          tooltip={{
            title:
              initialValues?.bloomberg_account?.description ||
              "An SID is a unique number which Bloomberg uses to track the progression of a license. SIDs are also linked to any entitlements or exchanges, allowing them to be carried across various actions. SID attached to a service are considered billable and represent one paid license.",
            icon: <InfoCircleOutlined />,
            placement: "right",
          }}
          rules={[
            {
              required: true,
              message:
                "Every Bloomberg UUID must be assigned to one Bloomberg Subscription Identifier (SID)!",
            },
          ]}
        >
          <Select>
            {subscriptions &&
              subscriptions.map((subscription) => {
                return (
                  <Select.Option value={subscription.id} key={subscription.id}>
                    {subscription.subscription_id}
                  </Select.Option>
                );
              })}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {uuidId ? "Save changes" : "Add UUID"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
