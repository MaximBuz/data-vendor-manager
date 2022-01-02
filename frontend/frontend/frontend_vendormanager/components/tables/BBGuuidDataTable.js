/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import Link from "next/link";

/* API FETCHING */
import { dehydrate, QueryClient, useQuery, useQueryClient } from "react-query";
import getBBGuuids from "../../api_utils/api_fetchers/getBBGuuids";

/* API MUTATION */
import deleteBBGuuid from "../../api_utils/api_mutators/delete/deleteBBGuuid";

/* COMPONENTS */
import { Table, Empty, Tooltip, Input, Space, Button } from "antd";
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
export default function BBGuuidDataTable({ scrollView, rowSelection }) {
  /* -----~~~~~>>>DELETION<<<~~~~~----- */
  const [idToDelete, setIdToDelete] = useState("");
  const [DeleteModal, showDeleteModal] = useDeleteConfirmation(
    deleteBBGuuid, // Api call
    "Deleted Bloomberg UUID successfully", // Success Notification Text
    ["bbgUuids", 1 /* Depth */], // Query to invalidate on success
    idToDelete, // Id to delete
    "Are you sure you want to delete this Bloomberg UUID?" // Confirmation Text
  );

  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const { isLoading, isError, data, error } = useQuery(
    ["bbgUuids", 1 /* Depth */],
    getBBGuuids
  );

  /* -----~~~~~>>>COLUMN DEFINITION<<<~~~~~----- */
  const columns = [
    {
      title: "Bloomberg Unique User ID (UUID)",
      dataIndex: "uuid",
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
              placeholder="Search for Bloomberg UUIDs"
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
        return record.uuid.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Parent Bloomberg Subscription ID",
      render: (text, record) => {
        return (
          <Link
            href={`vendors/bloomberg/subscriptions/${record.bloomberg_subscription?.id}`}
          >
            {record.bloomberg_subscription?.subscription_id}
          </Link>
        );
      },
      sorter: (a, b) =>
        a.bloomberg_subscription?.subscription_id.localeCompare(
          b.bloomberg_subscription?.subscription_id
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
              placeholder="Search for Bloomberg Subscription IDs"
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
        return record.bloomberg_subscription?.subscription_id
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "Employee (Data Consumer)",
      render: (text, record) => {
        return (
          <Link href={`employees/${record.data_consumer?.id}`}>
            {`${record.data_consumer?.email} (${record.data_consumer?.first_name} ${record.data_consumer?.last_name}) `}
          </Link>
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
              placeholder="Search for Bloomberg UUIDs"
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
        return record.uuid.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "",
      width: "3%",
      fixed: "right",
      render: (text, record) => {
        return (
          <>
            <Space>
              <Link href={`vendors/bloomberg/uuids/${record.id}`}>
                <Tooltip title="Edit" placement="left">
                  <EditOutlined />
                </Tooltip>
              </Link>
              <Tooltip title="Delete" placement="top">
                <DeleteOutlined
                  onClick={() => {
                    setIdToDelete(record.id);
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
          scroll={scrollView}
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
