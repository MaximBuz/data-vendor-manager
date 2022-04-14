/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import { useRouter } from 'next/router';

/* COMPONENTS */
import Link from 'next/link';
import { Form, Input, Button, Tooltip, Divider, TreeSelect, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

/* API MUTATION */
import { useQueryClient, useMutation } from 'react-query';
import postDataConsumer from '../../utils/mutators/post/postDataConsumer';
import patchDataConsumer from '../../utils/mutators/patch/patchDataConsumer';
import postJob from '../../utils/mutators/post/postJob';
import postActivityTag from '../../utils/mutators/post/postActivityTag';

/* NOTIFICATIONS */
import { toast } from 'react-toastify';

/* HOOKS */
import useAddItemModal from '../../custom_hooks/useAddItemModal';
import { useState } from 'react';

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function EntityForm({
 initialValues,
 activityTags,
 organizationalTree,
 locations,
 jobs,
 employeeId,
}) {
 /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
 const queryClient = useQueryClient();
 const router = useRouter();
 const [form] = Form.useForm();

 /* -----~~~~~>>>ADDING JOBS<<<~~~~~----- */
 const [AddJobButton, AddJobModal] = useAddItemModal(
  postJob,
  'title',
  'Successfully added new job title!',
  'jobs',
  'Add new job title'
 );

 /* -----~~~~~>>>ADDING ACTIVITY TAGS<<<~~~~~----- */
 const [AddActivityTagButton, AddActivityTagModal] = useAddItemModal(
  postActivityTag,
  'name',
  'Successfully added new activity tag!',
  ['activityTags', 0],
  'Add new activity tag'
 );

 /* -----~~~~~>>>DYNAMIC BUILDINGS DROPDOWN<<<~~~~~----- */
 const [activeLocation, setActiveLocation] = useState(initialValues?.location?.id || undefined);

 function handleLocationChange(value) {
  setActiveLocation(value);
  form.setFieldsValue({
   building: undefined,
  });
 }

 /* -----~~~~~>>>DATA MUTATION<<<~~~~~----- */
 const patchMutation = useMutation(patchDataConsumer, {
  onSuccess: () => {
   toast.success('Updated employee successfully');
   queryClient.invalidateQueries(['dataConsumers', 'dataConsumer']);
  },
  onError: (error) => {
   toast.error(String(error));
  },
 });
 const postMutation = useMutation(postDataConsumer, {
  onSuccess: () => {
   toast.success('Added employee successfully');
   queryClient.invalidateQueries(['dataConsumers']);
   router.push('/master-data-manager/employees/');
  },
  onError: (error) => {
   toast.error(String(error));
  },
 });

 /* -----~~~~~>>>SUBMITTING<<<~~~~~----- */
 const onFinish = (values) => {
  employeeId
   ? patchMutation.mutate({ values: values, id: initialValues.id })
   : postMutation.mutate({ values: values });
 };

 const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
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
    layout='vertical'
    /* Here map the input data to form names */
    initialValues={
     employeeId && {
      internal_id: initialValues.internal_id,
      email: initialValues.email,
      first_name: initialValues.first_name,
      last_name: initialValues.last_name,
      floor: initialValues.floor,
      seat: initialValues.seat,
      job_title: initialValues.job_title?.id,
      /* organizational_entity: [initialValues.organizational_entity.name], */
      building: initialValues?.building?.id,
      location: initialValues.location?.id,
     }
    }
   >
    <Divider orientation='middle' plain style={{ color: 'grey', fontWeight: 'lighter' }}>
     General Information
    </Divider>
    <Form.Item
     label='Email'
     name='email'
     rules={[{ required: true, type: 'email', message: 'Please input an email!' }]}
    >
     <Input placeholder='Add email' />
    </Form.Item>
    <div
     style={{
      display: 'flex',
      gap: '10px',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
     }}
    >
     <Form.Item style={{ flexGrow: '1' }} label='First Name' name='first_name'>
      <Input placeholder='Add first name' />
     </Form.Item>

     <Form.Item style={{ flexGrow: '1' }} label='Last Name' name='last_name'>
      <Input placeholder='Add last name' />
     </Form.Item>
     <Form.Item style={{ flexGrow: '1' }} label='Internal Id' name='internal_id'>
      <Input placeholder='Add internal id' />
     </Form.Item>
    </div>
    <Divider orientation='middle' plain style={{ color: 'grey', fontWeight: 'lighter' }}>
     Business Affiliation
    </Divider>
    <div
     style={{
      display: 'flex',
      gap: '10px',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
     }}
    >
     <Form.Item
      style={{ flexGrow: '1' }}
      initialValue={employeeId && initialValues.organizational_entity.id}
      label='Organizational Entity'
      name='organizational_entity'
      rules={[{ required: true, message: 'Every employee must be assigned to one organizational entity!' }]}
     >
      <TreeSelect
       treeLine={{ showLeafIcon: false }}
       treeData={organizationalTree}
       treeDefaultExpandAll
       placeholder='Please select entity'
      />
     </Form.Item>

     <Form.Item style={{ flexGrow: '1' }} name='location' label='Location'>
      <Select onChange={handleLocationChange}>
       {locations &&
        locations.map((location) => {
         return (
          <Select.Option value={location.id} key={location.id}>
           {location.street + ' ' + location.street_nr + ', ' + location.city + ', ' + location.country}
          </Select.Option>
         );
        })}
      </Select>
     </Form.Item>

     <Link href='/master-data-manager/geographies/create' target='_blank' passHref>
      <Tooltip title='Add new Location' placement='right'>
       <Button style={{ position: 'relative', top: '3px' }} shape='circle' icon={<PlusOutlined />} />
      </Tooltip>
     </Link>
    </div>
    <div
     style={{
      display: 'flex',
      gap: '10px',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
     }}
    >
     <Form.Item style={{ flexGrow: '1' }} label='Building' name='building'>
      <Select placeholder='Select option'>
       {locations && activeLocation ? (
         locations
         ?.filter((location) => location.id === activeLocation)[0]
         .buildings?.map((building) => {
          return (
           <Select.Option value={building.id} key={building.id}>
            {building.building_name}
           </Select.Option>
          );
         })
       ) : (null)}
      </Select>
     </Form.Item>

     <Form.Item style={{ flexGrow: '1' }} label='Floor' name='floor'>
      <Input placeholder='Add floor' />
     </Form.Item>

     <Form.Item style={{ flexGrow: '1' }} label='Seat' name='seat'>
      <Input placeholder='Add seat' />
     </Form.Item>
    </div>
    <Divider orientation='middle' plain style={{ color: 'grey', fontWeight: 'lighter' }}>
     Job Description
    </Divider>
    <div
     style={{
      display: 'flex',
      gap: '10px',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
     }}
    >
     <Form.Item name='job_title' label='Job Title' style={{ flexGrow: '1' }}>
      <Select>
       {jobs &&
        jobs.map((job) => {
         return (
          <Select.Option value={job.id} key={job.id}>
           {job.title}
          </Select.Option>
         );
        })}
      </Select>
     </Form.Item>

     {AddJobButton}
    </div>
    <div
     style={{
      display: 'flex',
      gap: '10px',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
     }}
    >
     <Form.Item
      style={{ flexGrow: '1' }}
      label='Activity Tags'
      name='activity'
      initialValue={employeeId && initialValues.activity?.map((tag) => tag.id)}
     >
      <Select
       mode='multiple'
       placeholder='Please select activity tags'
       filterOption={(input, option) =>
        option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
        option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0
       }
      >
       {activityTags?.map((tag) => (
        <Select.Option key={tag.name} value={tag.id}>
         {tag.name}
        </Select.Option>
       ))}
      </Select>
     </Form.Item>
     {AddActivityTagButton}
    </div>

    <Form.Item>
     <Button type='primary' htmlType='submit'>
      {employeeId ? 'Save changes' : 'Add employee'}
     </Button>
    </Form.Item>
   </Form>
   {AddActivityTagModal}
   {AddJobModal}
  </>
 );
}
