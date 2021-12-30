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
import patchBBGSubscription from "../../api_utils/api_mutators/patch/patchBBGSubscription";
import postBBGSubscription from "../../api_utils/api_mutators/post/postBBGSubscription";

/* NOTIFICATIONS */
import { toast } from "react-toastify";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function BBGSubscriptionForm({
  initialValues,
  subscriptionId,
  accounts
}) {
  /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const router = useRouter();

  /* -----~~~~~>>>DATA MUTATION<<<~~~~~----- */
  const patchMutation = useMutation(patchBBGSubscription, {
    onSuccess: () => {
      toast.success("Updated Bloomberg Subscription successfully");
      queryClient.invalidateQueries([
        ["bbgSubscription", subscriptionId, 1 /* depth param */],
        ["bbgSubscriptions", 1 /* depth param */],
      ]);
    },
    onError: (error) => {
      toast.error(String(error));
    },
  });

  const postMutation = useMutation(postBBGSubscription, {
    onSuccess: () => {
      toast.success("Added Bloomberg Subscription successfully");
      queryClient.invalidateQueries(["bbgSubscriptions", 1 /* depth param */]);
      router.push("/master-data-manager/vendors/");
    },
    onError: (error) => {
      toast.error(String(error));
    },
  });

  /* -----~~~~~>>>SUBMITTING<<<~~~~~----- */
  const onFinish = (values) => {
    subscriptionId
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
          subscriptionId && {
            subscription_id: initialValues.subscription_id,
            bloomberg_account: initialValues.bloomberg_account?.id,
          }
        }
      >
        <Form.Item
          tooltip={{
            title:
              initialValues?.description ||
              "An SID is a unique number which Bloomberg uses to track the progression of a license. SIDs are also linked to any entitlements or exchanges, allowing them to be carried across various actions. SID attached to a service are considered billable and represent one paid license.",
            icon: <InfoCircleOutlined />,
            placement: "right",
          }}
          rules={[{ required: true, message: "This number is required!" }]}
          label="Bloomberg Subscription ID (SID)"
          name="subscription_id"
        >
          <Input placeholder="Add Subscription ID" />
        </Form.Item>
        <Form.Item
          style={{ flexGrow: "1" }}
          name="bloomberg_account"
          label="Parent Bloomberg Account Number"
          tooltip={{
            title:
              initialValues?.bloomberg_account?.description ||
              "An account number, or a customer number, is created for every location where billable SIDs (licenses), circuits or services are installed. Multiple account numbers can be created in one location if required for billing / administrative purposes.",
            icon: <InfoCircleOutlined />,
            placement: "right",
          }}
          rules={[
            {
              required: true,
              message:
                "Every bloomberg account number must be assigned to one business location!",
            },
          ]}
        >
          <Select>
            {accounts &&
              accounts.map((account) => {
                return (
                  <Select.Option value={account.id}>
                    {account.account_number} ({account.location?.street} {account.location?.city} {account.location?.country})
                  </Select.Option>
                );
              })}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {subscriptionId ? "Save changes" : "Add Subscription"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
