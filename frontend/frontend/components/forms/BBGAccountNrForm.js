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
import patchBBGAccountNr from "../../api_utils/api_mutators/patch/patchBBGAccountNr";
import postBBGAccountNr from "../../api_utils/api_mutators/post/postBBGAccountNr";

/* NOTIFICATIONS */
import { toast } from "react-toastify";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function BBGAccountNumberForm({
  initialValues,
  accountNrId,
  locations,
  firmNrs,
}) {
  /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const router = useRouter();

  /* -----~~~~~>>>DATA MUTATION<<<~~~~~----- */
  const patchMutation = useMutation(patchBBGAccountNr, {
    onSuccess: () => {
      toast.success("Updated Bloomberg Account Number successfully");
      queryClient.invalidateQueries([
        ["bbgAccountNr", accountNrId, 2 /* depth param */],
        ["bbgAccountNrs", 1 /* depth param */],
      ]);
    },
    onError: (error) => {
      toast.error(String(error));
    },
  });

  const postMutation = useMutation(postBBGAccountNr, {
    onSuccess: () => {
      toast.success("Added Bloomberg Account Number successfully");
      queryClient.invalidateQueries(["bbgAccountNrs", 1 /* depth param */]);
      router.push("/master-data-manager/vendors/");
    },
    onError: (error) => {
      toast.error(String(error));
    },
  });

  /* -----~~~~~>>>SUBMITTING<<<~~~~~----- */
  const onFinish = (values) => {
    accountNrId
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
          accountNrId && {
            account_number: initialValues.account_number,
            firm_number: initialValues.firm_number?.id,
            location: initialValues.location?.id,
          }
        }
      >
        <Form.Item
          tooltip={{
            title:
              initialValues?.description ||
              "An account number, or a customer number, is created for every location where billable SIDs (licenses), circuits or services are installed. Multiple account numbers can be created in one location if required for billing / administrative purposes.",
            icon: <InfoCircleOutlined />,
            placement: "right",
          }}
          rules={[{ required: true, message: "This number is required!" }]}
          label="Bloomberg Account Number"
          name="account_number"
        >
          <Input placeholder="Add Account Number" />
        </Form.Item>
        <Form.Item
          style={{ flexGrow: "1" }}
          name="firm_number"
          label="Parent Bloomberg Firm Number"
          tooltip={{
            title:
              initialValues?.firm_number.description ||
              "An account must be under a firm number. Firm number can be regarded as the 'umbrella' number under which all related accounts are grouped. These accounts/entities under the same umbrella have to be in a control relationship with one another or under a common control.",
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
            {firmNrs &&
              firmNrs.map((number) => {
                return (
                  <Select.Option value={number.id} key={number.id}>
                    {number.firm_number} ({number.organizational_entity?.name})
                  </Select.Option>
                );
              })}
          </Select>
        </Form.Item>
        <Form.Item
          style={{ flexGrow: "1" }}
          name="location"
          label="Location"
          rules={[
            {
              required: true,
              message:
                "Every bloomberg account number must be assigned to one business location!",
            },
          ]}
        >
          <Select>
            {locations &&
              locations.map((location) => {
                return (
                  <Select.Option value={location.id} key={location.id}>
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {accountNrId ? "Save changes" : "Add Account Number"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
