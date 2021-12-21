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
  // Getting unique values for filtering
  const uniqueCountries = [
    ...new Set(
      data.map((item) => ({ text: item.country, value: item.country }))
    ),
  ];
  const uniqueStates = [
    ...new Set(data.map((item) => ({ text: item.state, value: item.state }))),
  ];
  const uniqueCities = [
    ...new Set(data.map((item) => ({ text: item.city, value: item.city }))),
  ];

  const [idToDelete, setIdToDelete] = useState("");

  // Handle deletion
  const [DeleteModal, showDeleteModal] = useDeleteConfirmation(
    deleteLocation, // Api call
    "Deleted location successfully", // Success Notification Text
    "locations", // Query to invalidate on success
    idToDelete, // Id to delete
    "Are you sure you want to delete this location?" // Confirmation Text
  );

  // defining the columns
  const columns = [
    {
      title: "Country",
      dataIndex: "country",
      filters: uniqueCountries,
      onFilter: (value, record) => record.country.indexOf(value) === 0,
      sorter: (a, b) => a.country.localeCompare(b.country),
    },
    {
      title: "State",
      dataIndex: "state",
      filters: uniqueStates,
      onFilter: (value, record) => record.state.indexOf(value) === 0,
      sorter: (a, b) => a.state.localeCompare(b.state),
    },
    {
      title: "City",
      dataIndex: "city",
      filters: uniqueCities,
      onFilter: (value, record) => record.city.indexOf(value) === 0,
      sorter: (a, b) => a.city.localeCompare(b.city),
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
      width: "3%",
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
