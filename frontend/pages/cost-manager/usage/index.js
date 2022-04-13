/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* API FETCHING */
import { dehydrate, useQuery, useQueryClient } from 'react-query';
import getAggregatedUsage from '../../../utils/fetchers/getAggregatedUsage';
import getUsageStatisticsByDataConsumers from '../../../utils/fetchers/getUsageStatisticsByDataConsumers';

/* CHARTS */
import UsageOverTimeChart from '../../../components/charts/UsageOverTime';
import UsageByEntityChart from '../../../components/charts/UsageByEntity';
import UsageByActivityTagChart from '../../../components/charts/UsageByActivityTag';

/* COMPONENTS */
import { Modal, Button, Statistic, Divider, Spin, Empty } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import UsageFilter from '../../../components/drawers/UsageFilter';
import UsageByDataConsumerDataTable from '../../../components/tables/UsageByDataConsumersDataTable';

/* HOOKS */
import { useState } from 'react';

/* DATA UTILS */
import parse from 'parse-duration';
import moment from 'moment';

/* ------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */
export default function Home() {
 /* -----~~~~~>>>HANDLE FILTER<<<~~~~~----- */
 const [filterDrawerVisibility, setFilterDrawerVisibility] = useState(false);
 const [filters, setFilters] = useState({
  // start_date: moment().subtract(1, 'months').format('YYYY-MM-DD'), // this is the correct one for production
  // end_date: moment().format('YYYY-MM-DD'), // this is the correct one for production
  start_date: moment('2022-01-01').format('YYYY-MM-DD'), // this is only for demonstration (because of old data), // this is the correct one for production
  end_date: moment('2022-03-01').format('YYYY-MM-DD'), // this is only for demonstration (because of old data), // this is the correct one for production
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

 /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
 const usageByDataConsumer = useQuery(
  ['aggregatedUsage', 'data-consumer' /* ...group by */, filters],
  getAggregatedUsage
 );
 const usageByTime = useQuery(
  [
   'aggregatedUsage',
   'time' /* ...group by */,
   {
    ...filters,
    freq: 'd',
   },
  ],
  getAggregatedUsage
 );
 const usageByEntity = useQuery(['aggregatedUsage', 'entity' /* ...group by */, filters], getAggregatedUsage);
 const usageByActivityTag = useQuery(
  ['aggregatedUsage', 'activity-tag' /* ...group by */, filters],
  getAggregatedUsage
 );
 const usageStatistics = useQuery(['usageStatistics', filters], getUsageStatisticsByDataConsumers);

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

 /* -----~~~~~>>>HANDLE USAGE OVER TIME MODAL<<<~~~~~----- */
 const [usageOverTimeModalVisibility, setUsageOverTimeModalVisibility] = useState(false);
 const closeUsageOverTimeModal = () => setUsageOverTimeModalVisibility(false);

 /* -----~~~~~>>>HANDLE USAGE BY ENTITY MODAL<<<~~~~~----- */
 const [usageByEntityModalVisibility, setUsageByEntityModalVisibility] = useState(false);
 const closeUsageByEntityModal = () => setUsageByEntityModalVisibility(false);

 /* -----~~~~~>>>HANDLE USAGE BY ACTIVITY TAG MODAL<<<~~~~~----- */
 const [usageByActivityTagModalVisibility, setUsageByActivityTagModalVisibility] = useState(false);
 const closeUsageByActivityTagModal = () => setUsageByActivityTagModalVisibility(false);

 /* --------------------------------------------------------------------------- */
 /* ~~~~~~RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
 /* --------------------------------------------------------------------------- */

 return (
  <>
   <h2>Usage Analysis</h2>
   <div
    style={{
     display: 'flex',
     flexDirection: 'row',
     justifyContent: 'space-between',
    }}
   >
    <p style={{ maxWidth: '550px' }}>
     Here you can see a variety of statistics on the usage of Market Data Services across your organization.
     You can easily filter, group and export data and see where potential savings might be possible.
    </p>
    <Button
     type='primary'
     icon={<FilterOutlined />}
     size='large'
     onClick={() => setFilterDrawerVisibility(true)}
    >
     Set Filters and Timeframes
    </Button>
   </div>

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

    {/* USAGE BY ENTITY CHART SMALL TILE */}
    <div style={smallChartContainerStyle}>
     <UsageByEntityChart
      usageDataQuery={usageByEntity}
      size='small'
      openModal={setUsageByEntityModalVisibility}
     />
    </div>

    {/* USAGE STATISTICS SMALL TILE */}
    <div
     style={{
      ...smallChartContainerStyle,
      minWidth: '350px',
      minHeight: '150px',
     }}
    >
     {usageStatistics.isLoading ? (
      <Spin />
     ) : usageStatistics.isError ? (
      <Empty />
     ) : (
      <>
       <Statistic
        title='Mean Usage Time (per Employee)'
        value={usageStatistics.data && parse(usageStatistics.data[0].mean, 'h').toFixed(2)}
        suffix='hours'
       />
       <Divider style={{ margin: 6 }} />
       <Statistic
        title='Standart Deviation'
        value={usageStatistics.data && parse(usageStatistics.data[0].std, 'h').toFixed(2)}
        suffix='hours'
       />
      </>
     )}
    </div>

    {/* USAGE BY ACTIVITY TAG CHART SMALL TILE */}
    <div style={smallChartContainerStyle}>
     <UsageByActivityTagChart
      usageDataQuery={usageByActivityTag}
      size='small'
      openModal={setUsageByActivityTagModalVisibility}
     />
    </div>
   </div>

   {/* TABLE SHOWING USAGES BY DATACONSUMER WITH ALL METADATA */}
   <UsageByDataConsumerDataTable
    data={usageByDataConsumer.data}
    isLoading={usageByDataConsumer.isLoading}
    scrollView={{ x: 2000 }}
   />

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

   {/* USAGE BY ENTITY LARGE MODAL */}
   <Modal
    visible={usageByEntityModalVisibility}
    okText='Close'
    closable={false}
    footer={[
     <Button type='secondary' onClick={closeUsageByEntityModal} key='1'>
      Close
     </Button>,
    ]}
    onOk={closeUsageByEntityModal}
    width={850}
   >
    <UsageByEntityChart usageDataQuery={usageByEntity} size='large' />
   </Modal>

   {/* USAGE BY ACTIVITY TAG LARGE MODAL */}
   <Modal
    visible={usageByActivityTagModalVisibility}
    okText='Close'
    closable={false}
    footer={[
     <Button type='secondary' onClick={closeUsageByActivityTagModal} key='1'>
      Close
     </Button>,
    ]}
    onOk={closeUsageByActivityTagModal}
    width={850}
   >
    <UsageByActivityTagChart usageDataQuery={usageByActivityTag} size='large' />
   </Modal>

   <UsageFilter
    onClose={() => setFilterDrawerVisibility(false)}
    visible={filterDrawerVisibility}
    setFilters={setFilters}
    filters={filters}
   />
  </>
 );
}
