/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import Link from "next/link";

/* COMPONENTS */
import { Table, Input, Button, Space, Empty, Tooltip } from "antd";
import {
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";

/* DATA UTILS */
import parse from "parse-duration";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function UsageByDataConsumerDataTable({
  data,
  isLoading,
  scrollView,
  rowSelection,
}) {
  /* -----~~~~~>>>COLUMN DEFINITION<<<~~~~~----- */
  const columns = [
    {
      title: "Usage Time",
      render: (text, record) => record.usage_time.replaceAll(":", " ").replace("d", " Days, "),
      sorter: (a, b) => parse(a.usage_time,"m") - parse(b.usage_time,"m"),
      fixed: "left",
    },
    {
      title: "Email",
      dataIndex: "data_consumer_email",
      sorter: (a, b) => a.data_consumer_email.localeCompare(b.email),
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
        return record.data_consumer_email.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Job Title",
      ellipsis: true,
      render: (text, record) => (
        <Tooltip
          placement="topLeft"
          title={record.data_consumer_job_title}
        >
          {record.data_consumer_job_title}
        </Tooltip>
      ),
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
              placeholder="Search Job Titles"
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
        return record.data_consumer_job_title.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Activity Tags",
      ellipsis: { showTitle: false },
      render: (text, record) => (
        <Tooltip
          placement="topLeft"
          title={record.activity_tags?.join(", ")}
        >
          {record.activity_tags?.join(", ")}
        </Tooltip>
      ),
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
              placeholder="Search Activity Tags"
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
        return record.activity_tags?.join(", ").toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Business Affiliation",
      ellipsis: true,
      render: (text, record) => (
        <Tooltip
          placement="topLeft"
          title={record.entity_name}
        >
          {record.entity_name}
        </Tooltip>
      ),
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
              placeholder="Search Business Affiliations"
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
        return record.entity_name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Location",
      ellipsis: true,
      render: (text, record) => {
        return (
          <Tooltip
            placement="topLeft"
            title={
              record.location_city +
              ", " +
              record.location_state +
              ", " +
              record.location_country
            }
          >
            {record.location_city + ", " + record.location_country}
          </Tooltip>
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
              placeholder="Search Locations"
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
        return `${record.location_city + ", " + record.location_state + ", " + record.location_country}`.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Bloomberg UUID",
      render: (text, record) => record.bbg_uuid,
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
              placeholder="Search Bloomberg UUIDs"
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
        return record.bbg_uuid.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Bloomberg SID",
      render: (text, record) => record.bbg_subscription,
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
              placeholder="Search Bloomberg SIDs"
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
        return record.bbg_subscription.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Bloomberg Account",
      render: (text, record) => record.bbg_account_number,
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
              placeholder="Search Bloomberg Accounts"
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
        return record.bbg_account_number.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Bloomberg Firm",
      render: (text, record) => record.bbg_firm_number,
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
              placeholder="Search Bloomberg Firm Numbers"
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
        return record.bbg_firm_number.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "",
      width: "45px",
      fixed: "right",
      render: (text, record) => {
        return (
          <>
              <Link href={`usage/${record.data_consumer_pk}`} passHref>
                <Tooltip title="Details" placement="left">
                  <EyeOutlined />
                </Tooltip>
              </Link>
          </>
        );
      },
    },
  ];

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
          rowKey="data_consumer_pk"
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
