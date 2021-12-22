import { useState } from "react";

// Components
import { Table, Empty, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

// Data mutation
import deleteEmployee from "../../api_utils/api_mutators/delete/deleteEmployee";

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

   // Handle deletion
   const [DeleteModal, showDeleteModal] = useDeleteConfirmation(
    deleteEmployee, // Api call
    "Deleted employee successfully", // Success Notification Text
    ["dataConsumers",2], // Query to invalidate on success
    idToDelete, // Id to delete
    "Are you sure you want to delete this employee?" // Confirmation Text
  );

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
              record.location?.street +
              " " +
              record.location?.street_nr +
              ", " +
              record.location?.zip_code +
              " " +
              record.location?.city +
              ", " +
              record.location?.state +
              ", " +
              record.location?.country
            }
          >
            {record.location?.city +
              ", " +
              record.location?.country}
          </Tooltip>
        );
      },
    },
    {
      title: "Building",
      render: (text, record) => record.building?.building_name,
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
            {DeleteModal}
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
