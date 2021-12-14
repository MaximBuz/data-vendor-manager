// Components
import TreeDataTable from "../../components/tables/TreeDataTable";

// Data Fetching
import { dehydrate, QueryClient, useQuery } from 'react-query';
import getOrganizationalEntities from "../../api_fetchers/getOrganizationalEntities";

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
    width: '20%',
  },
  {
    title: 'Entity Type',
    dataIndex: 'type',
    width: '30%',
    key: 'type',
  },
];

const fakeData = [
  {
    key: 1,
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
                key: 1312,
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
  const { isLoading, error, data } = useQuery(["organizational_entities", 10], getOrganizationalEntities)
  
  const transformedData = data.map(item => {
    return ({
      key: item.id,
      name: item.name,
      internal_id: item.internal_id,
      type: item.type.name
    })
  })

  return (
    <>
      <h1>Create and edit your organizational structure</h1>
      <TreeDataTable columns={fakeColumns} data={transformedData} isLoading={isLoading}/>
    </>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  // the second parameter I'm giving inside the array is the depth I need
  await queryClient.prefetchQuery(["organizational_entities", 10], getOrganizationalEntities)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}