/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import { useRouter } from 'next/router';

/* CHARTS */
import UsageOverTimeChart from '../../../components/charts/UsageOverTime';

/* API FETCHING */
import { dehydrate, QueryClient, useQuery, useQueryClient } from 'react-query';
import getDataConsumer from '../../../utils/fetchers/getDataConsumer';
import getOrganizationalEntityRootChildren from '../../../utils/fetchers/getOrganizationalEntityRootChildren';
import getAggregatedUsage from '../../../utils/fetchers/getAggregatedUsage';
import getUsageRawDataconsumer from '../../../utils/fetchers/getUsageRawDataConsumer';
import getUsageStatisticsByDataConsumer from '../../../utils/fetchers/getUsageStatisticsByDataConsumer';

/* COMPONENTS */
import { FilterOutlined } from '@ant-design/icons';
import Image from 'next/image';
import {
 Row,
 Col,
 Divider,
 Popover,
 Tree,
 Modal,
 Button,
 Spin,
 Empty,
 Form,
 DatePicker,
 Statistic,
} from 'antd';
import UsageRawDataconsumerDataTable from '../../../components/tables/UsageRawDataconsumerDataTable';

/* HOOKS */
import { useState } from 'react';

/* DATA UTILS */
import moment from 'moment';
import parse from 'parse-duration';

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function Employee() {
 /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
 const router = useRouter();
 const { id: employeeId } = router.query;

 /* -----~~~~~>>>HANDLE FILTER<<<~~~~~----- */
 const [filters, setFilters] = useState({
  // start_date: moment().subtract(1, 'months').format('YYYY-MM-DD'), // this is the correct one for production
  // end_date: moment().format('YYYY-MM-DD'), // this is the correct one for production
  start_date: moment("2022-01-01").format('YYYY-MM-DD'), // this is only for demonstration (because of old data), // this is the correct one for production
  end_date: moment("2022-03-01").format('YYYY-MM-DD'), // this is only for demonstration (because of old data), // this is the correct one for production
  /* data_consumer: */
  entity: [],
  location: [],
  country: null,
  state: null,
  city: null,
  job_title: [],
  activity_tag: [],
  bbg_firm_number: [],
  bbg_account_number: [],
  bbg_subscription_id: [],
  bbg_uuid: [],
 });

 const onFinish = (values) => {
  setFilters({
   ...filters,
   ...values,
   start_date: values.timeframe[0].format('YYYY-MM-DD'),
   end_date: values.timeframe[1].format('YYYY-MM-DD'),
  });
 };

 /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
 const dataConsumerQuery = useQuery(['dataConsumer', employeeId, 2 /* Depth */], getDataConsumer);
 const dataConsumer = dataConsumerQuery.isSuccess && dataConsumerQuery.data;

 const treeQuery = useQuery(['organizationalEntityRootChildren', 10], getOrganizationalEntityRootChildren);

 const usageByTime = useQuery(['aggregatedUsage', 'time' /* ...group by */, filters], getAggregatedUsage);

 const usageStatistic = useQuery(['usageStatistic', filters], getUsageStatisticsByDataConsumer);

 const rawUsage = useQuery(['rawUsage', filters], getUsageRawDataconsumer);

 /* -----~~~~~>>>HANDLE USAGE OVER TIME MODAL<<<~~~~~----- */
 const [usageOverTimeModalVisibility, setUsageOverTimeModalVisibility] = useState(false);
 const closeUsageOverTimeModal = () => setUsageOverTimeModalVisibility(false);

 /* -----~~~~~>>>STYLING PARAMETERS<<<~~~~~----- */
 const smallChartContainerStyle = {
  width: 'fit-content',
  maxWidth: '400px',
  height: 'fit-content',
  minHeight: '150px',
  minWidth: '350px',
  padding: '20px',
  borderRadius: '2px',
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: 'rgb(217, 217, 217)',
  backgroundColor: 'white',
 };

 /* --------------------------------------------------------------------------- */
 /* ~~~~~~RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
 /* --------------------------------------------------------------------------- */
 if (dataConsumerQuery.isLoading) {
  return <>Loading...</>;
 }

 if (dataConsumerQuery.error) {
  return <>Error...</>;
 }

 return (
  <>
   <Row gutter={[20, 20]}>
    <Col span={6}>
     <div style={{ maxHeight: '80vh', overflowY: 'scroll' }} className='masked-overflow-vertical'>
      <Row justify='center'>
       <img
        src={`https://avatars.dicebear.com/api/miniavs/${Math.random()*10}.svg?b=%23d6ebff&r=50&size=400`}
        width={180}
        alt='data-consumer-avatar'
       ></img>
      </Row>
      <Row justify='center' style={{ marginBottom: '30px' }}>
       <div
        style={{
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
        }}
       >
        <p style={{ margin: '0', fontSize: '2em' }}>
         {dataConsumer?.first_name + ' ' + dataConsumer?.last_name}
        </p>
        <p style={{ margin: '0' }}>{dataConsumer?.email}</p>
       </div>
      </Row>

      <Divider
       orientation='middle'
       plain
       style={{
        color: 'grey',
        fontWeight: 'lighter',
        marginBottom: '0px',
       }}
      >
       Job Title
      </Divider>
      <Row justify='center' style={{ marginBottom: '30px' }}>
       {dataConsumer?.job_title?.title}
      </Row>

      <Divider
       orientation='middle'
       plain
       style={{
        color: 'grey',
        fontWeight: 'lighter',
        marginBottom: '0px',
       }}
      >
       Activities
      </Divider>
      <Row justify='center' style={{ marginBottom: '30px' }}>
       <Popover
        title='Activities of this Employee'
        trigger='hover'
        content={dataConsumer?.activity?.map((tag) => {
         return (
          <Row justify='center' key={tag.id}>
           {tag.name}
          </Row>
         );
        })}
       >
        {dataConsumer?.activity?.map((tag) => tag.name).join(', ')}
       </Popover>
      </Row>

      <Divider
       orientation='middle'
       plain
       style={{
        color: 'grey',
        fontWeight: 'lighter',
        marginBottom: '0px',
       }}
      >
       Business Affiliation
      </Divider>
      <Row justify='center' style={{ marginBottom: '30px' }}>
       <Popover
        title='Position in Organizational Hierarchy'
        trigger='hover'
        content={
         <Tree
          showLine={{ showLeafIcon: false }}
          defaultSelectedKeys={[dataConsumer?.organizational_entity?.id]}
          treeData={treeQuery.isSuccess && treeQuery.data}
          defaultExpandAll={true}
         />
        }
       >
        {dataConsumer?.organizational_entity?.name}
       </Popover>
      </Row>

      <Divider
       orientation='middle'
       plain
       style={{
        color: 'grey',
        fontWeight: 'lighter',
        marginBottom: '0px',
       }}
      >
       Location
      </Divider>
      <Row justify='center' style={{ marginBottom: '30px' }}>
       <Popover
        title='Location of Employee'
        trigger='hover'
        content={
         <>
          <Row justify='center'>{dataConsumer?.building?.building_name}</Row>
          <Row justify='center'>{'Floor: ' + dataConsumer.floor + ', Seat: ' + dataConsumer.seat}</Row>
          <Divider style={{ margin: '10px' }}></Divider>
          <Row justify='center'>
           {dataConsumer?.location?.street + ' ' + dataConsumer?.location?.street_nr}
          </Row>
          <Row justify='center'>{dataConsumer?.location?.zip_code + ' ' + dataConsumer?.location?.city}</Row>
          <Divider style={{ margin: '10px' }}></Divider>
          <Row justify='center'>{dataConsumer?.location?.state}</Row>
          <Row justify='center'>{dataConsumer?.location?.country}</Row>
         </>
        }
       >
        {`${dataConsumer?.location?.city + ', ' + dataConsumer?.location?.country}`}
       </Popover>
      </Row>
      <Divider
       orientation='middle'
       plain
       style={{
        color: 'grey',
        fontWeight: 'lighter',
        marginBottom: '0px',
       }}
      >
       Bloomberg License Info
      </Divider>
      <Row justify='center' style={{ marginBottom: '30px' }}>
       Work in progress...
      </Row>
     </div>
    </Col>
    <Divider type='vertical' style={{ height: 'auto', minHeight: '70vh' }}></Divider>
    <Col span={17}>
     <div style={{ maxHeight: '80vh', overflowY: 'scroll' }} className='masked-overflow-vertical'>
      <Row>
       <Col span={24}>
        <Form
         layout='inline'
         onFinish={onFinish}
         initialValues={{
          // timeframe: [moment().subtract(1, 'months'), moment()], // this is the correct one for production
          timeframe: [moment('2022-01-01'), moment('2022-03-01')], // this is only for demonstration (because of old data)
         }}
        >
         <Form.Item name='timeframe'>
          <DatePicker.RangePicker getPopupContainer={(trigger) => trigger.parentElement} />
         </Form.Item>
         <Form.Item>
          <Button icon={<FilterOutlined />} type='secondary' htmlType='submit'>
           Filter
          </Button>
         </Form.Item>
        </Form>
       </Col>
      </Row>
      <Divider type='horizontal'></Divider>
      <div
       style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        overflowX: 'scroll',
        paddingBottom: '5px',
        marginBottom: '20px',
       }}
       className='masked-overflow-horizontal'
      >
       {/* USAGE OVER TIME CHART SMALL TILE */}
       <div style={smallChartContainerStyle}>
        <UsageOverTimeChart
         usageDataQuery={usageByTime}
         size='small'
         openModal={setUsageOverTimeModalVisibility}
        />
       </div>

       {/* USAGE STATISTICS SMALL TILE */}
       <div
        style={{
         ...smallChartContainerStyle,
         minWidth: '650px',
         minHeight: '150px',
        }}
       >
        {usageStatistic.isLoading ? (
         <Spin />
        ) : usageStatistic.isError ? (
         <Empty />
        ) : (
         <>
          <Row gutter={[30, 0]}>
           <Col span={8}>
            <Statistic
             title='Count of entries'
             value={usageStatistic.data && usageStatistic.data[0].count}
             suffix='entries'
            />
            <Divider style={{ margin: '6px 0 6px 0' }} />
            <Statistic
             title='Total time'
             value={usageStatistic.data && parse(usageStatistic.data[0].sum, 'h')?.toFixed(2)}
             suffix='hours'
            />
           </Col>
           <Col span={8}>
            <Statistic
             title='Average usage time'
             value={usageStatistic.data && parse(usageStatistic.data[0].mean, 'h')?.toFixed(2)}
             suffix='hours'
            />
            <Divider style={{ margin: '6px 0 6px 0' }} />
            <Statistic
             title='Standart deviation'
             value={usageStatistic.data && parse(usageStatistic.data[0].std, 'h')?.toFixed(2)}
             suffix='hours'
            />
           </Col>
           <Col span={8}>
            <Statistic
             title='First quartile (25%)'
             value={usageStatistic.data && parse(usageStatistic.data[0].first_quartile, 'h')?.toFixed(2)}
             suffix='hours'
            />
            <Divider style={{ margin: '6px 0 6px 0' }} />
            <Statistic
             title='Third quartile (75%)'
             value={usageStatistic.data && parse(usageStatistic.data[0].third_quartile, 'h')?.toFixed(2)}
             suffix='hours'
            />
           </Col>
          </Row>
         </>
        )}
       </div>
      </div>
      <Divider type='horizontal'></Divider>
      <div>
       <h2 style={{ marginBottom: '20px', lineHeight: '1em' }}>All Usage Entries</h2>
       <UsageRawDataconsumerDataTable data={rawUsage.data} isLoading={rawUsage.isLoading} />
      </div>
     </div>
    </Col>
   </Row>

   {/* -----~~~~~>>>OPENING LARGE MODALS OF CHARTS<<<~~~~~----- */}

   {/* USAGE OVER TIME LARGE MODAL */}
   <Modal
    visible={usageOverTimeModalVisibility}
    okText='Close'
    closable={false}
    footer={[
     <Button type='secondary' onClick={closeUsageOverTimeModal} key='1'>
      Close
     </Button>,
    ]}
    onOk={closeUsageOverTimeModal}
    width={850}
   >
    <UsageOverTimeChart usageDataQuery={usageByTime} size='large' />
   </Modal>
  </>
 );
}

/* --------------------------------------------------------------------------- */
/* ~~~~~~SERVERSIDE RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */

// export async function getServerSideProps(context) {
//   /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
//   const queryClient = new QueryClient();
//   const employeeId = context.params.id;

//   /* -----~~~~~>>>DATA FETCHING<<<~~~~~----- */
//   await queryClient.prefetchQuery(
//     ["organizationalEntityRootChildren", 10 /* Depth */],
//     getOrganizationalEntityRootChildren
//   );
//   await queryClient.prefetchQuery(
//     ["dataConsumer", employeeId, 2 /* Depth */],
//     getDataConsumer
//   );
//   await queryClient.prefetchQuery(
//     ["activityTags", 0 /* Depth */],
//     getActivityTags
//   );
//   await queryClient.prefetchQuery(["locations"], getLocations);
//   await queryClient.prefetchQuery(["jobs"], getJobs);

//   /* -----~~~~~>>>PASSING PROPS<<<~~~~~----- */
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }
