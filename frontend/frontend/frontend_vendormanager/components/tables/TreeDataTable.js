import { Table } from 'antd';

/* Actions when selecting rows in the table */
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

export default function TreeDataTable({columns, data, isLoading }) {
  if (!isLoading) {
    return (
      <>
        <Table
          columns={columns}
          rowSelection={{ ...rowSelection }}
          dataSource={data}
        />
      </>
    );
  } else {
    return (
      <>
      {/* Here we can put an animated loading thingy */}
        Loading...
      </>
    );
  }
}