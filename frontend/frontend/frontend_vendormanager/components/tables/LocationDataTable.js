import { Table } from "antd";
import { Empty } from "antd";

export default function LocationDataTable({
  data,
  isLoading,
  scrollView,
  rowSelection,
}) {

  // Getting unique values for filtering
  const uniqueCountries = [...new Set(data.map(item => ({text: item.country, value: item.country})))];
  const uniqueStates = [...new Set(data.map(item => ({text: item.state, value: item.state})))];
  const uniqueCities = [...new Set(data.map(item => ({text: item.city, value: item.city})))];

  // defining the columns
  const columns = [
    {
      title: "Country",
      dataIndex: "country",
      filters: uniqueCountries,
      onFilter: (value, record) => record.country.indexOf(value) === 0,
      sorter: (a, b) => a.country.localeCompare(b.country),
    },
    {
      title: "State",
      dataIndex: "state",
      defaultSortOrder: "descend",
      filters: uniqueStates,
      onFilter: (value, record) => record.state.indexOf(value) === 0,
      sorter: (a, b) => a.state.localeCompare(b.state),
    },
    {
      title: "City",
      dataIndex: "city",
      filters: uniqueCities,
      onFilter: (value, record) => record.city.indexOf(value) === 0,
      sorter: (a, b) => a.city.localeCompare(b.city),
    },
    {
      title: "Zip Code",
      dataIndex: "zip_code",
      width: "10%"
    },
    {
      title: "Street",
      dataIndex: "street",
    },
    {
      title: "Street Number",
      dataIndex: "street_nr",
      width: "12%"
    },
  ];

  if (!isLoading) {
    return (
      <>
        <Table
          columns={columns}
          rowSelection={rowSelection}
          dataSource={data}
          scroll={scrollView}
        />
      </>
    );
  } else if (isLoading) {
    return (
      <>
        {/* Here we can put an animated loading thingy */}
        Loading...
      </>
    );
  } else if (!data) {
    return <Empty />;
  }
}
