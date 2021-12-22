import { Table } from 'antd';
import { Empty } from 'antd';

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