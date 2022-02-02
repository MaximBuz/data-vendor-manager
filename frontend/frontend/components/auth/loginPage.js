import { Form, Input, Button, Checkbox } from 'antd';

/* STYLING */
import {
  UserOutlined,
  LockOutlined,
  Loading3QuartersOutlined,
} from '@ant-design/icons';

/*  ROUTING  */
import { useRouter } from 'next/router';

/* API MUTATIONS */
import { useMutation, useQueryClient } from 'react-query';
import login from '../../api_utils/auth/login';

/* NOTIFICATIONS */
import { toast } from 'react-toastify';

export default function LoginPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  /* -----~~~~~>>>DATA MUTATION<<<~~~~~----- */
  const loginMutation = useMutation(login, {
    onSuccess: () => {
      toast.success('Successfully logged in');
      queryClient.invalidateQueries('currentUser');
    },
    onError: (error) => {
      toast.error(String(error));
    },
  });

  const onFinish = async (values) => {
    await loginMutation.mutate(values);
    router.push('/cost-manager/usage');
  };

  return (
    <>
      <div style={{
        backgroundColor: "#001628",
        width: "250px",
        height: "fit-content",
        }}>
        <div style={{
          height: "fit-content",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "2.4rem",
          fontWeight: "bold",
          paddingBottom: "0px"
        }}>
          3B
          {/* <Logo className={classes.logo} fill="white" size={60}/> */}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          padding: '20px 20px 0 20px',
          borderRadius: '2px',
          borderStyle: 'solid',
          borderWidth: '1px',
          borderColor: '#d9d9d9',
          backgroundColor: 'white',
          width: "250px"
        }}
      >
        <Form
          name='normal_login'
          className='login-form'
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name='username'
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Username'
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
            >
              Log in
            </Button>
            {/* Or <a href="">register now!</a> */}
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
