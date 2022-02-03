/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import Link from "next/link";

/* API MUTATION */
import deleteLocation from "../../api_utils/api_mutators/delete/deleteLocation";

/* COMPONENTS */
import { Table, Empty, Tooltip, Input, Space, Button, Typography } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";

/* HOOKS */
import useDeleteConfirmation from "../../custom_hooks/useDeleteConfirmation";
import { useState } from "react";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function LocationDataTable({
  data,
  isLoading,
  scrollView,
  rowSelection,
}) {
  /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
  const { Text } = Typography;

  /* -----~~~~~>>>DELETION<<<~~~~~----- */
  const [idToDelete, setIdToDelete] = useState("");
  const [DeleteModal, showDeleteModal] = useDeleteConfirmation(
    deleteLocation, // Api call
    "Deleted location successfully", // Success Notification Text
    "locations", // Query to invalidate on success
    idToDelete, // Id to delete
    "Are you sure you want to delete this location?" // Confirmation Text
  );

  /* -----~~~~~>>>COLUMN DEFINITION<<<~~~~~----- */
  const columns = [
    {
      title: "Country",
      dataIndex: "country",
      sorter: (a, b) => a.country.localeCompare(b.country),
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
              placeholder="Search country"
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
        return record.country.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "State",
      dataIndex: "state",
      sorter: (a, b) => a.state.localeCompare(b.state),
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
              placeholder="Search state"
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
        return record.state.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "City",
      dataIndex: "city",
      sorter: (a, b) => a.city.localeCompare(b.city),
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
              placeholder="Search city"
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
        return record.city.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Zip Code",
      dataIndex: "zip_code",
      width: "10%",
    },
    {
      title: "Street",
      dataIndex: "street",
    },
    {
      title: "Street Number",
      dataIndex: "street_nr",
      width: "12%",
    },
    {
      title: "",
      width: "6%",
      fixed: "right",
      render: (text, record) => {
        return (
          <>
            <Space>
              <Link href={`geographies/${record.key}`} passHref>
                <Tooltip
                  title="Edit this location or add buildings"
                  placement="left"
                >
                  <EditOutlined />
                </Tooltip>
              </Link>
              <Tooltip title="Delete" placement="top">
                <DeleteOutlined
                  onClick={() => {
                    setIdToDelete(record.key);
                    showDeleteModal();
                  }}
                />
              </Tooltip>
            </Space>
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
          /* scroll={scrollView}
          pagination={false}
          summary={pageData => {
            let total = 0;
            pageData.forEach(({ zip_code }) => {
              total += parseInt(zip_code);
            });
            return (
              <>
              <Table.Summary.Row>
                <Table.Summary.Cell></Table.Summary.Cell>
                <Table.Summary.Cell></Table.Summary.Cell>
                <Table.Summary.Cell>Total:</Table.Summary.Cell>
                <Table.Summary.Cell>
                  <Text type="danger">{total}</Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
              </>
            )
          }} */
        />
        {DeleteModal}
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
