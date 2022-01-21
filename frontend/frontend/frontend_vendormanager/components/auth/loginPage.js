import { Form, Input, Button, Checkbox } from "antd";
import {
  UserOutlined,
  LockOutlined,
  Loading3QuartersOutlined,
} from "@ant-design/icons";

/*  ROUTING  */
import { useRouter } from "next/router";

/* API MUTATIONS */
import { useMutation, useQueryClient } from "react-query";
import login from "../../api_utils/auth/login";

/* NOTIFICATIONS */
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  /* -----~~~~~>>>DATA MUTATION<<<~~~~~----- */
  const loginMutation = useMutation(login, {
    onSuccess: () => {
      toast.success("Successfully logged in");
      queryClient.invalidateQueries("currentUser");
    },
    onError: (error) => {
      toast.error(String(error));
    },
  });

  const onFinish = async (values) => {
    await loginMutation.mutate(values);
    router.push("/cost-manager/usage");
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      {/* <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item> */}

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        {/* Or <a href="">register now!</a> */}
      </Form.Item>
    </Form>
  );
}
