/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import { useRouter } from "next/router";

/* COMPONENTS */
import { Form, Input, Button, TreeSelect } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

/* API MUTATION */
import { useQueryClient, useMutation } from "react-query";
import patchBBGFirmNr from "../../api_utils/api_mutators/patch/patchBBGFirmNr";
import postBBGFirmNr from "../../api_utils/api_mutators/post/postBBGFirmNr";

/* NOTIFICATIONS */
import { toast } from "react-toastify";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function BBGFirmNumberForm({
  initialValues,
  firmNrId,
  organizationalTree,
}) {
  /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const router = useRouter();

  /* -----~~~~~>>>DATA MUTATION<<<~~~~~----- */
  const patchMutation = useMutation(patchBBGFirmNr, {
    onSuccess: () => {
      toast.success("Updated Bloomberg Firm Number successfully");
      queryClient.invalidateQueries([
        ["bbgFirmNr", firmNrId, 2 /* depth param */],
        ["bbgFirmNrs", 1 /* depth param */],
      ]);
    },
    onError: (error) => {
      toast.error(String(error));
    },
  });

  const postMutation = useMutation(postBBGFirmNr, {
    onSuccess: () => {
      toast.success("Added Bloomberg Firm Number successfully");
      queryClient.invalidateQueries(["bbgFirmNrs", 1 /* depth param */]);
      router.push("/master-data-manager/vendors/");
    },
    onError: (error) => {
      toast.error(String(error));
    },
  });

  /* -----~~~~~>>>SUBMITTING<<<~~~~~----- */
  const onFinish = (values) => {
    firmNrId
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
          firmNrId && {
            firm_number: initialValues.firm_number,
          }
        }
      >
        <Form.Item
          tooltip={{
            title:
              initialValues?.description ||
              "An account must be under a firm number. Firm number can be regarded as the 'umbrella' number under which all related accounts are grouped. These accounts/entities under the same umbrella have to be in a control relationship with one another or under a common control.",
            icon: <InfoCircleOutlined />,
            placement: "right",
          }}
          rules={[{ required: true, message: "This number is required!" }]}
          label="Bloomberg Firm Number"
          name="firm_number"
        >
          <Input placeholder="Add Firm Number" />
        </Form.Item>

        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Form.Item
            style={{ flexGrow: "1" }}
            initialValue={firmNrId && initialValues.organizational_entity.id}
            label="Organizational Entity"
            name="organizational_entity"
            rules={[
              {
                required: true,
                message:
                  "Every bloomberg firm number must be assigned to one organizational entity!",
              },
            ]}
          >
            <TreeSelect
              treeLine={{ showLeafIcon: false }}
              treeData={organizationalTree}
              treeDefaultExpandAll
              placeholder="Please select entity"
            />
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {firmNrId ? "Save changes" : "Add Firm Number"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
