/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* API FETCHING */
import getOrganizationalEntityRootChildren from "../../api_utils/api_fetchers/getOrganizationalEntityRootChildren";
import getActivityTags from "../../api_utils/api_fetchers/getActivityTags";
import getLocations from "../../api_utils/api_fetchers/getLocations";
import getJobs from "../../api_utils/api_fetchers/getJobs";

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
  Divider
} from "antd";

/* HOOKS */
import { useQuery } from "react-query";
import { useState } from "react";

/* DATE UTILS */
import moment from "moment";

/* ------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */
export default function UsageFilter(props) {
  /* -----~~~~~>>>INITIALIZE<<<~~~~~----- */
  const { Option } = Select;

  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const activityTagsQuery = useQuery(
    ["activityTags", 0 /* Depth */],
    getActivityTags
  );

  const treeQuery = useQuery(
    ["organizationalEntityRootChildren", 10],
    getOrganizationalEntityRootChildren
  );

  const locationQuery = useQuery(["locations"], getLocations);

  const jobsQuery = useQuery(["jobs"], getJobs);

  /* -----~~~~~>>>HANDLE FORM SUBMITTING<<<~~~~~----- */
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Drawer
      title="Filter Options"
      width={720}
      onClose={props.onClose}
      visible={props.visible}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          timeframe: [moment().subtract(1, "months"), moment()],
        }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="timeframe" label="Timeframe">
              <DatePicker.RangePicker
                style={{ width: "100%" }}
                getPopupContainer={(trigger) => trigger.parentElement}
              />
            </Form.Item>
          </Col>
        </Row>
        <Divider orientation="middle" plain style={{color: "grey",  fontWeight: "lighter"}}>Geography</Divider>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Locations" name="locations">
              <Select>
                {locationQuery.data?.map((location) => {
                  return (
                    <Select.Option value={location.id}>
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
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={8}>
            <Form.Item label="Country" name="country">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="State" name="state">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="City" name="city">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Divider orientation="middle" plain style={{color: "grey",  fontWeight: "lighter"}}>Business</Divider>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Organizational Entities"
              name="organizational_entity"
            >
              <TreeSelect
                treeLine={{ showLeafIcon: false }}
                treeData={treeQuery.data}
                treeDefaultExpandAll
                multiple
                placeholder="Please select entity"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="jobTitles" label="Job Titles">
              <Select
                mode="multiple"
                placeholder="Please select job titles"
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
            <Form.Item name="activityTags" label="Activity Tags">
            <Select
              mode="multiple"
              placeholder="Please select activity tags"
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
        <Divider orientation="middle" plain style={{color: "grey",  fontWeight: "lighter"}}>Vendor (Bloomberg)</Divider>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
