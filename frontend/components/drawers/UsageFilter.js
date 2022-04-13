/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* API FETCHING */
import getOrganizationalEntityRootChildren from '../../utils/fetchers/getOrganizationalEntityRootChildren';
import getActivityTags from '../../utils/fetchers/getActivityTags';
import getLocations from '../../utils/fetchers/getLocations';
import getJobs from '../../utils/fetchers/getJobs';
import getBbgSubscriptions from '../../utils/fetchers/getBbgSubscriptions';
import getBbgAccountNrs from '../../utils/fetchers/getBbgAccountNrs';
import getBbgFirmNrs from '../../utils/fetchers/getBbgFirmNrs';

/* COMPONENTS */
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Space,
  TreeSelect,
  Divider,
  InputNumber,
} from 'antd';

/* HOOKS */
import { useQuery } from 'react-query';
import { useState } from 'react';

/* DATE UTILS */
import moment from 'moment';

/* ------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */
export default function UsageFilter(props) {
  /* -----~~~~~>>>INITIALIZE<<<~~~~~----- */

  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const activityTagsQuery = useQuery(
    ['activityTags', 0 /* Depth */],
    getActivityTags
  );
  const treeQuery = useQuery(
    ['organizationalEntityRootChildren', 10],
    getOrganizationalEntityRootChildren
  );
  const locationQuery = useQuery(['locations'], getLocations);
  const jobsQuery = useQuery(['jobs'], getJobs);
  const BBGSubscriptionsQuery = useQuery(
    ['bbgSubscriptions', 1 /* Depth */],
    getBbgSubscriptions
  );
  const BBGAccountQuery = useQuery(
    ['bbgAccountNrs', 1 /* Depth */],
    getBbgAccountNrs
  );
  const BBGFirmsQuery = useQuery(['bbgFirmNrs', 1], getBbgFirmNrs);

  /* -----~~~~~>>>HANDLE CHILD DRAWER<<<~~~~~----- */
  const [childDrawerVisible, setChildDrawerVisible] = useState(false);

  /* -----~~~~~>>>HANDLE FORM SUBMITTING<<<~~~~~----- */
  const onFinish = (values) => {
    props.setFilters({
      ...props.filters,
      ...values,
      start_date: values.timeframe[0].format('YYYY-MM-DD'),
      end_date: values.timeframe[1].format('YYYY-MM-DD'),
    });
  };

  return (
    <Drawer
      title='Filter Options'
      width={720}
      onClose={props.onClose}
      visible={props.visible}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form
        layout='vertical'
        onFinish={onFinish}
        initialValues={{
          // timeframe: [moment().subtract(1, 'months'), moment()], // this is the correct one for production
          timeframe: [moment("2022-01-01").format('YYYY-MM-DD'), moment("2022-03-01").format('YYYY-MM-DD')], // this is only for demonstration (because of old data)
          entry_count_direction: ">",
          percentile_direction: "bottom",
          entry_count: null,
          percentile: null
        }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name='timeframe' label='Timeframe'>
              <DatePicker.RangePicker
                style={{ width: '100%' }}
                getPopupContainer={(trigger) => trigger.parentElement}
              />
            </Form.Item>
          </Col>
        </Row>
        <Divider
          orientation='middle'
          plain
          style={{ color: 'grey', fontWeight: 'lighter' }}
        >
          Geography
        </Divider>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label='Locations' name='location'>
              <Select>
                {locationQuery.data?.map((location) => {
                  return (
                    <Select.Option value={location.id} key={location.id}>
                      {location.street +
                        ' ' +
                        location.street_nr +
                        ', ' +
                        location.city +
                        ', ' +
                        location.country}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={8}>
            <Form.Item label='Country' name='country'>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label='State' name='state'>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label='City' name='city'>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Divider
          orientation='middle'
          plain
          style={{ color: 'grey', fontWeight: 'lighter' }}
        >
          Business
        </Divider>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label='Organizational Entities' name='entity'>
              <TreeSelect
                showSearch
                treeNodeFilterProp='title'
                treeLine={{ showLeafIcon: false }}
                treeData={treeQuery.data}
                treeDefaultExpandAll
                multiple
                placeholder='Please select entity'
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name='job_title' label='Job Titles'>
              <Select
                mode='multiple'
                placeholder='Please select job titles'
                filterOption={(input, option) =>
                  option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                  option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {jobsQuery.data?.map((job) => (
                  <Select.Option key={job.title} value={job.id}>
                    {job.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name='activity_tag' label='Activity Tags'>
              <Select
                mode='multiple'
                placeholder='Please select activity tags'
                filterOption={(input, option) =>
                  option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                  option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {activityTagsQuery.data?.map((tag) => (
                  <Select.Option key={tag.name} value={tag.id}>
                    {tag.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Divider
          orientation='middle'
          plain
          style={{ color: 'grey', fontWeight: 'lighter' }}
        >
          Vendor (Bloomberg)
        </Divider>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name='bbg_subscription_id' label='Subscriptions (SIDs)'>
              <Select
                mode='multiple'
                placeholder='Please select SIDs'
                filterOption={(input, option) =>
                  option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                  option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {BBGSubscriptionsQuery.data?.map((subscription) => {
                  return (
                    <Select.Option
                      value={subscription.id}
                      key={subscription.subscription_id}
                    >
                      {subscription.subscription_id}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name='bbg_account_number' label='Account Numbers'>
              <Select
                mode='multiple'
                placeholder='Please select Account Nrs'
                filterOption={(input, option) =>
                  option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                  option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {BBGAccountQuery.data?.map((account) => {
                  return (
                    <Select.Option
                      value={account.id}
                      key={account.account_number}
                    >
                      {account.account_number}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name='bbg_firm_number' label='Firm Numbers'>
              <Select
                mode='multiple'
                placeholder='Please select Firm Nrs'
                filterOption={(input, option) =>
                  option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                  option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {BBGFirmsQuery.data?.map((firm) => {
                  return (
                    <Select.Option value={firm.id} key={firm.firm_number}>
                      {firm.firm_number}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Space>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
            <Button
              type='secondary'
              onClick={() => setChildDrawerVisible(true)}
            >
              Advanced Options
            </Button>
          </Space>
        </Form.Item>
        <Drawer
          visible={childDrawerVisible}
          title='Advanced Filtering'
          width={560}
          onClose={() => setChildDrawerVisible(false)}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Row gutter={16}>
            <Col span={24}>
              <p style={{ marginBottom: '8px' }}>Number of usage entries</p>
              <Form.Item name='entry_count'>
                <InputNumber
                  style={{ width: '100%' }}
                  addonBefore={
                    <Form.Item name="entry_count_direction" style={{maxHeight: "30px", margin: 0}}>
                      <Select>
                        <Select.Option value='>'>Above</Select.Option>
                        <Select.Option value='<'>Below</Select.Option>
                      </Select>
                    </Form.Item>
                  }
                  min={0}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <p style={{ marginBottom: '8px' }}>Usage time percentiles</p>
              <Form.Item name='percentile'>
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={(value) => value + " %"}
                  addonBefore={
                    <Form.Item name="percentile_direction" style={{maxHeight: "30px", margin: 0}}>
                      <Select style={{minWidth: "70px"}}>
                        <Select.Option value='top'>Top</Select.Option>
                        <Select.Option value='bottom'>Bottom</Select.Option>
                      </Select>
                    </Form.Item>
                  }
                  addonAfter={
                    "Percentile"
                  }
                  min={0}
                  max={99}
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider></Divider>
          <Row gutter={16}>
            <Col span={24}>
            <p style={{ marginBottom: '8px' }}>Exclude Organizational Entities</p>
              <Form.Item name='entity_exclude'>
                <TreeSelect
                  showSearch
                  treeNodeFilterProp='title'
                  treeLine={{ showLeafIcon: false }}
                  treeData={treeQuery.data}
                  treeDefaultExpandAll
                  multiple
                  placeholder='Please select entities to exclude'
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
            <p style={{ marginBottom: '8px' }}>Exclude Job Titles</p>
              <Form.Item name='job_title_exclude'>
                <Select
                  mode='multiple'
                  placeholder='Please select job titles'
                  filterOption={(input, option) =>
                    option.key.toLowerCase().indexOf(input.toLowerCase()) >=
                      0 ||
                    option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {jobsQuery.data?.map((job) => (
                    <Select.Option key={job.title} value={job.id}>
                      {job.title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
            <p style={{ marginBottom: '8px' }}>Exclude Activity Tags</p>
              <Form.Item name='activity_tag_exclude'>
                <Select
                  mode='multiple'
                  placeholder='Please select activity tags'
                  filterOption={(input, option) =>
                    option.key.toLowerCase().indexOf(input.toLowerCase()) >=
                      0 ||
                    option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {activityTagsQuery.data?.map((tag) => (
                    <Select.Option key={tag.name} value={tag.id}>
                      {tag.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

        </Drawer>
      </Form>
    </Drawer>
  );
}
