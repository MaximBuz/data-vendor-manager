/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import Link from "next/link";

/* API FETCHING */
import { dehydrate, QueryClient, useQuery, useQueryClient } from "react-query";
import getBBGAccountNrs from "../../api_utils/api_fetchers/getBBGAccountNrs";

/* API MUTATION */
import deleteBBGAccountNr from "../../api_utils/api_mutators/delete/deleteBBGAccountNr";

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
export default function BBGAccountDataTable({
  scrollView,
  rowSelection,
}) {

  /* -----~~~~~>>>DELETION<<<~~~~~----- */
  const [idToDelete, setIdToDelete] = useState("");
  const [DeleteModal, showDeleteModal] = useDeleteConfirmation(
    deleteBBGAccountNr, // Api call
    "Deleted Bloomberg Account Number successfully", // Success Notification Text
    ["bbgAccountNrs", 1 /* Depth */], // Query to invalidate on success
    idToDelete, // Id to delete
    "Are you sure you want to delete this Bloomberg Account Number?" // Confirmation Text
  );

  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const { isLoading, isError, data, error } = useQuery(
    ["bbgAccountNrs", 1 /* Depth */],
    getBBGAccountNrs
  );

  /* -----~~~~~>>>COLUMN DEFINITION<<<~~~~~----- */
  const columns = [
    {
      title: "Bloomberg Account Number",
      dataIndex: "account_number",
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
        return record.account_number.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Affiliated Location",
      render: (text, record) => {
        const location = `${record.location?.street}, ${record.location?.city}, ${record.location?.country}`
        return (
          <Link
            href={`geographies/${record.location?.id}`}
          >
            {location}
          </Link>
        );
      },
      sorter: (a, b) => {
        const locationA = `${a.location?.street}, ${a.location?.city}, ${a.location?.country}`
        const locationB = `${b.location?.street}, ${b.location?.city}, ${b.location?.country}`
        return locationA.localeCompare(locationB)
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
              placeholder="Search for Business Locations"
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
        const location = `${record.location?.street}, ${record.location?.city}, ${record.location?.country}`
        return location
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "Child of Bloomberg Firm Number",
      render: (text, record) => {
        return (
          <Link
            href={`vendors/bloomberg/firm-numbers/${record.firm_number?.id}`}
          >
            {record.firm_number?.firm_number}
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
        return record.firm_number?.firm_number
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
