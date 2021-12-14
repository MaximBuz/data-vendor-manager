import { Table } from 'antd';
import { Empty } from 'antd';

/* Actions when selecting rows in the table */
/* const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
}; */

export default function TreeDataTable({columns, data, isLoading, scrollView, rowSelection}) {
  
if (!isLoading) {
    return (
      <>
        <Table
          columns={columns}
          rowSelection={ rowSelection }
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
  } else if (data.length === 0) {
    return (
      <Empty/>
    )
  }
}