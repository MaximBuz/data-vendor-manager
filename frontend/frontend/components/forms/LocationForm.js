/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* COMPONENTS */
import { Form, Input, Button } from "antd";

/* API MUTATION */
import { useQueryClient, useMutation } from "react-query";
import patchLocation from "../../api_utils/api_mutators/patch/patchLocation";
import postLocation from "../../api_utils/api_mutators/post/postLocation";

/* NOTIFICATIONS */
import { toast } from "react-toastify";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function EntityForm({ initialValues, locationId }) {
  /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  /* -----~~~~~>>>DATA MUTATION<<<~~~~~----- */
  const patchMutation = useMutation(patchLocation, {
    onSuccess: () => {
      toast.success("Updated location successfully");
      queryClient.invalidateQueries(["locations", "locationWithBuildings"]);
    },
    onError: error => {
      toast.error(String(error))
    },
  });

  const postMutation = useMutation(postLocation, {
    onSuccess: () => {
      toast.success("Added location successfully");
      queryClient.invalidateQueries("locations");
    },
    onError: error => {
      toast.error(String(error))
    },
  });

  /* -----~~~~~>>>SUBMITTING<<<~~~~~----- */
  const onFinish = (values) => {
    locationId
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
          locationId && {
            country: initialValues.country,
            state: initialValues.state,
            city: initialValues.city,
            zip_code: initialValues.zip_code,
            street: initialValues.street,
            street_nr: initialValues.street_nr,
          }
        }
      >
        <Form.Item label="Country" name="country">
          <Input placeholder="Add Country" />
        </Form.Item>

        <Form.Item label="State" name="state">
          <Input placeholder="Add State" />
        </Form.Item>

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
            {locationId ? "Save changes" : "Add location"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
