import { useState } from "react";

// Components
import { Table, Empty, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

// Data mutation
import deleteLocation from "../../api_utils/api_mutators/deleteLocation";

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
      fixed: 'left',
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
      ellipsis: true,
      render: (text, record) => record.activity?.map(tag => tag.name).join(", "),
    },
    {
      title: "Business Entity",
      render: (text, record) => record.organizational_entity.name,
    },
    {
      title: "Location",
      ellipsis: true,
      render: (text, record) => {
        return (
          record.organizational_entity.location?.street + " " +
          record.organizational_entity.location?.street_nr + ", " +
          record.organizational_entity.location?.city + ", " +
          record.organizational_entity.location?.country
        )
      },
    },
    {
      title: "Building",
      render: (text, record) => record.building.building_name,
    },
    {
      title: "",
      width: "3%",
      fixed: 'right',
      render: (text, record) => {
        return (
          <>
            <Link href={`geographies/${record.key}`}>
              <Tooltip
                title="Edit this location or add buildings"
                placement="left"
              >
                <EditOutlined />
              </Tooltip>
            </Link>
            <Tooltip title="Delete this location" placement="left">
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
