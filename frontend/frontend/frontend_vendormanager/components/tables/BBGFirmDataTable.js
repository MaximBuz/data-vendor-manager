/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import Link from "next/link";

/* API FETCHING */
import { dehydrate, QueryClient, useQuery, useQueryClient } from "react-query";
import getBBGFirmIds from "../../api_utils/api_fetchers/getBBGFirmIds";

/* API MUTATION */
import deleteLocation from "../../api_utils/api_mutators/delete/deleteLocation";

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
export default function LocationDataTable({
  data,
  isLoading,
  scrollView,
  rowSelection,
}) {

  /* -----~~~~~>>>DELETION<<<~~~~~----- */
  const [idToDelete, setIdToDelete] = useState("");
  const [DeleteModal, showDeleteModal] = useDeleteConfirmation(
    deleteLocation, // Api call
    "Deleted location successfully", // Success Notification Text
    "locations", // Query to invalidate on success
    idToDelete, // Id to delete
    "Are you sure you want to delete this location?" // Confirmation Text
  );

  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const { isLoading, isError, data, error } = useQuery(
    ["bbgFirm", 1 /* Depth */],
    getBBGFirmIds
  );

  /* -----~~~~~>>>COLUMN DEFINITION<<<~~~~~----- */
  const columns = [
    {
      title: "Bloomberg Firm Number",
      dataIndex: "firm_number",
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
              placeholder="Search for Bloomberg Firm Numbers"
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
        return record.firm_number.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Affiliated Business Entity",
      render: (text, record) => {
        return (
          <Link
            href={`master-data-manager/organizations/${record.organizational_entity?.id}`}
          >
            {record.organizational_entity?.name}
          </Link>
        );
      },
      sorter: (a, b) =>
        a.organizational_entity?.name.localeCompare(
          b.organizational_entity.name
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
              placeholder="Search for Business Entities"
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
        return record.organizational_entity?.name
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
            <Link href={`employees/${record.key}`}>
              <Tooltip title="Edit" placement="topLeft">
                <EditOutlined />
              </Tooltip>
            </Link>
            <Tooltip title="Delete" placement="topLeft">
              <DeleteOutlined
                onClick={() => {
                  setIdToDelete(record.key);
                  showDeleteModal();
                }}
              />
            </Tooltip>
          </Space>
            {DeleteModal}
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
