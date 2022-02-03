/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import Link from "next/link";

/* API FETCHING */
import { dehydrate, QueryClient, useQuery, useQueryClient } from "react-query";
import getBBGSubscriptions from "../../api_utils/api_fetchers/getBBGSubscriptions";

/* API MUTATION */
import deleteBBGSubscription from "../../api_utils/api_mutators/delete/deleteBBGSubscription";

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
export default function BBGSubscriptionDataTable({
  scrollView,
  rowSelection,
}) {

  /* -----~~~~~>>>DELETION<<<~~~~~----- */
  const [idToDelete, setIdToDelete] = useState("");
  const [DeleteModal, showDeleteModal] = useDeleteConfirmation(
    deleteBBGSubscription, // Api call
    "Deleted Bloomberg Subscription successfully", // Success Notification Text
    ["bbgSubscriptions", 1 /* Depth */], // Query to invalidate on success
    idToDelete, // Id to delete
    "Are you sure you want to delete this Bloomberg Subscription?" // Confirmation Text
  );

  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const { isLoading, isError, data, error } = useQuery(
    ["bbgSubscriptions", 1 /* Depth */],
    getBBGSubscriptions
  );

  /* -----~~~~~>>>COLUMN DEFINITION<<<~~~~~----- */
  const columns = [
    {
      title: "Bloomberg Subscription ID (SID)",
      dataIndex: "subscription_id",
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
        return record.subscription_id.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Parent Bloomberg Account Number",
      render: (text, record) => {
        return (
          <Link
            href={`vendors/bloomberg/account-numbers/${record.bloomberg_account?.id}`}
          >
            {record.bloomberg_account?.account_number}
          </Link>
        );
      },
      sorter: (a, b) =>
        a.bloomberg_account?.account_number.localeCompare(
          b.bloomberg_account?.account_number
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
              placeholder="Search for Bloomberg Account Numbers"
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
        return record.bloomberg_account?.account_number
          .toLowerCase()
          .includes(value.toLowerCase());
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
            <Link href={`vendors/bloomberg/subscriptions/${record.id}`} passHref>
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
          rowKey="id"
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
