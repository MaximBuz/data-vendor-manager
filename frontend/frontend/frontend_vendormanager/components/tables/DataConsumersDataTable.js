import { useState } from "react";

// Components
import { Table, Empty, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

// Data mutation
import deleteLocation from "../../api_utils/api_mutators/delete/deleteLocation";

// Routing
import Link from "next/link";

// Custom Hooks
import useDeleteConfirmation from "../../custom_hooks/useDeleteConfirmation";

export default function LocationDataTable({
  data,
  isLoading,
  scrollView,
  rowSelection,
}) {
  const [idToDelete, setIdToDelete] = useState("");

  // defining the columns
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      width: "15%",
      fixed: "left",
      sorter: (a, b) => a.country.localeCompare(b.country),
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      sorter: (a, b) => a.state.localeCompare(b.state),
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      sorter: (a, b) => a.city.localeCompare(b.city),
    },
    {
      title: "Job Title",
      render: (text, record) => record.job_title?.title,
    },
    {
      title: "Activity Tags",
      ellipsis: { showTitle: false },
      render: (text, record) => (
        <Tooltip
          placement="topLeft"
          title={record.activity?.map((tag) => tag.name).join(", ")}
        >
          {record.activity?.map((tag) => tag.name).join(", ")}
        </Tooltip>
      ),
    },
    {
      title: "Business Affiliation",
      render: (text, record) => (
        <Tooltip
          placement="topLeft"
          title={
            record.organizational_entity.name + ", " +
            record.organizational_entity.parent?.name
          }
        >
          {record.organizational_entity.name}
        </Tooltip>
      ),
    },
    {
      title: "Location",
      ellipsis: true,
      render: (text, record) => {
        return (
          <Tooltip
            placement="topLeft"
            title={
              record.organizational_entity.location?.street +
              " " +
              record.organizational_entity.location?.street_nr +
              ", " +
              record.organizational_entity.location?.zip_code +
              " " +
              record.organizational_entity.location?.city +
              ", " +
              record.organizational_entity.location?.state +
              ", " +
              record.organizational_entity.location?.country
            }
          >
            {record.organizational_entity.location?.city +
              ", " +
              record.organizational_entity.location?.country}
          </Tooltip>
        );
      },
    },
    {
      title: "Building",
      render: (text, record) => record.building.building_name,
    },
    {
      title: "",
      width: "3%",
      fixed: "right",
      render: (text, record) => {
        return (
          <>
            <Link href={`employees/${record.key}`}>
              <Tooltip
                title="Edit this employee"
                placement="left"
              >
                <EditOutlined />
              </Tooltip>
            </Link>
            <Tooltip title="Delete this employee" placement="left">
              <DeleteOutlined
                onClick={() => {
                  setIdToDelete(record.key);
                  showDeleteModal();
                }}
              />
            </Tooltip>
          </>
        );
      },
    },
  ];

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
  } else if (!data) {
    return <Empty />;
  }
}
