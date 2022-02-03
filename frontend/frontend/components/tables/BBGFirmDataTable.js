/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import Link from "next/link";
import { useRouter } from "next/router";

/* API FETCHING */
import { dehydrate, QueryClient, useQuery, useQueryClient } from "react-query";
import getBBGFirmNrs from "../../utils/fetchers/getBBGFirmNrs";

/* API MUTATION */
import deleteBBGFirmNr from "../../utils/mutators/delete/deleteBBGFirmNr";

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
  scrollView,
  rowSelection
}) {
  /* -----~~~~~>>>DELETION<<<~~~~~----- */
  const [idToDelete, setIdToDelete] = useState("");
  const [DeleteModal, showDeleteModal] = useDeleteConfirmation(
    deleteBBGFirmNr, // Api call
    "Deleted bloomberg firm number successfully", // Success Notification Text
    ["bbgFirmNrs",1], // Query to invalidate on success
    idToDelete, // Id to delete
    "Are you sure you want to delete this firm number and all associated children?" // Confirmation Text
  );

  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const { isLoading, isError, data, error } = useQuery(
    ["bbgFirmNrs",1],
    getBBGFirmNrs
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
            href={`organizations/${record.organizational_entity?.id}`}
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
            <Link href={`vendors/bloomberg/firm-numbers/${record.id}`} passHref>
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
