/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* COMPONENTS */
import { Form, Input, Button, TreeSelect } from "antd";

/* API MUTATION */
import { useQueryClient, useMutation } from "react-query";
import patchBBGFirmNr from "../../api_utils/api_mutators/patch/patchBBGFirmNr";
import postLocation from "../../api_utils/api_mutators/post/postLocation";

/* NOTIFICATIONS */
import { toast } from "react-toastify";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function BBGFirmNumberForm({ initialValues, firmNrId, organizationalTree }) {
  /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  /* -----~~~~~>>>DATA MUTATION<<<~~~~~----- */
  const patchMutation = useMutation(patchBBGFirmNr, {
    onSuccess: () => {
      toast.success("Updated Bloomberg Firm Number successfully");
      queryClient.invalidateQueries([["bbgFirmNr", firmNrId, 2 /* depth param */], ["bbgFirmNrs", 1 /* depth param */]]);
    },
    onError: error => {
      toast.error(String(error))
    },
  });

  /* const postMutation = useMutation(postLocation, {
    onSuccess: () => {
      toast.success("Added location successfully");
      queryClient.invalidateQueries("locations");
    },
    onError: error => {
      toast.error(String(error))
    },
  }); */

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
        <Form.Item label="Bloomberg Firm Number" name="firm_number">
          <Input placeholder="Add Firm Number" />
        </Form.Item>

        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >
          <Form.Item
            style={{ flexGrow: "1" }}
            initialValue={firmNrId && initialValues.organizational_entity.id}
            label="Organizational Entity"
            name="organizational_entity"
            rules={[{ required: true, message: 'Every employee must be assigned to one organizational entity!' }]}
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
