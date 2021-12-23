/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import Link from "next/link";

/* COMPONENTS */
import { Table, Empty } from "antd";

/* COMPONENTS */
import { Button, Tooltip, Divider, Input, Space, Radio } from "antd";
import { SearchOutlined } from "@ant-design/icons";

/* ------------------------------------------------------------------------- */
/* ~~~~~~PREPARING COLUMNS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

const columns = [
  {
    title: "Identifier Type",
    fixed: "left",
    width: "25%",
    render: (text, record) => {
      return <Tooltip title={record.description}>{record.name}</Tooltip>;
    },
  },
  {
    title: "Bloomberg Identifier",
    dataIndex: "key",
    key: "key",
    filterMode: "tree",
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => {
      return (
        <div style={{ padding: 8 }}>
          <Input
            autoFocus
            placeholder="Search email"
            style={{ marginBottom: 8, display: "block", width: 250 }}
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => confirm()}
            onBlur={() => confirm()}
          />
          <Space>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
                confirm();
              }}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      );
    },
    filterIcon: () => {
      return <SearchOutlined />;
    },
    onFilter: (value, record) => {
      return record.key.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    title: "Business Entity",
    render: (text, record) => {
      return record.organizational_entity ? (
        <Link
          href={`/master-data-manager/organizations/${record.organizational_entity?.id}`}
        >
          {record.organizational_entity?.name || undefined}
        </Link>
      ) : (
        <div style={{ color: "lightgrey" }}>N/A</div>
      );
    },
  },
  {
    title: "Location",
    render: (text, record) => {
      return record.location ? (
        <Link
          href={`/master-data-manager/organizations/${record.location?.id}`}
        >
          {`${record.location?.street}, ${record.location?.city}, ${record.location?.country}` ||
            undefined}
        </Link>
      ) : (
        <div style={{ color: "lightgrey" }}>N/A</div>
      );
    },
  },
  {
    title: "Data Consumer",
    dataIndex: "data_consumer",
    key: "data_consumer",
    render: (text, record) => {
      return record.data_consumer ? (
        <Link
          href={`/master-data-manager/employees/${record.data_consumer?.id}`}
        >
          {record.data_consumer?.email}
        </Link>
      ) : (
        <div style={{ color: "lightgrey" }}>N/A</div>
      );
    },
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => {
      return (
        <div style={{ padding: 8 }}>
          <Input
            autoFocus
            placeholder="Search email"
            style={{ marginBottom: 8, display: "block", width: 250 }}
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => confirm()}
            onBlur={() => confirm()}
          />
          <Space>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
                confirm();
              }}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      );
    },
    filterIcon: () => {
      return <SearchOutlined />;
    },
    onFilter: (value, record) => {
      return record.data_consumer?.email
        .toLowerCase()
        .includes(value.toLowerCase());
    },
  },
];

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function BBGLicenseTreeDataTable({
  data,
  isLoading,
  scrollView,
  rowSelection,
}) {
  /* --------------------------------------------------------------------------- */
  /* ~~~~~~RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* --------------------------------------------------------------------------- */
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
  } else if (data.length === 0) {
    return <Empty />;
  }
}
