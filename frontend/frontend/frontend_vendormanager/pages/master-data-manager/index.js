// Components
import TreeDataTable from "../../components/tables/TreeDataTable";

// Data Fetching
import { dehydrate, QueryClient, useQuery } from 'react-query';
import getOrganizationalEntityRootChildren from "../../api_fetchers/getOrganizationalEntityRootChildren";

const fakeColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Internal Id',
    dataIndex: 'internal_id',
    key: 'internal_id',
  },
  {
    title: 'Entity Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'LEI Code',
    dataIndex: 'bbg_lei_code',
    key: 'bbg_lei_code',
  },
];

const fakeData = [
  {
    key: 123123,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park',
      },
      {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [
          {
            key: 121,
            name: 'Jimmy Brown',
            age: 16,
            address: 'New York No. 3 Lake Park',
          },
        ],
      },
      {
        key: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [
          {
            key: 131,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park',
            children: [
              {
                key: 1311,
                name: 'Jim Green jr.',
                age: 25,
                address: 'London No. 3 Lake Park',
              },
              {
                key: 122212,
                name: 'Jimmy Green sr.',
                age: 18,
                address: 'London No. 4 Lake Park',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

export default function Organizations() {
  // Data fetching
  // the second parameter I'm giving inside the array is the depth I need
  const { isLoading, error, data } = useQuery(["organizationalEntityRootChildren", 10], getOrganizationalEntityRootChildren)
  // change "id" field to "key" for table to work properly
  const translatedData = JSON.parse(JSON.stringify(data).split('"id":').join('"key":'));
  return (
    <>
      <h1>Create and edit your organizational structure</h1>
      <TreeDataTable columns={fakeColumns} data={translatedData} isLoading={isLoading}/>
    </>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  // the second parameter I'm giving inside the array is the depth I need
  await queryClient.prefetchQuery(["prganizationalEntityRootChildren", 10], getOrganizationalEntityRootChildren)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}