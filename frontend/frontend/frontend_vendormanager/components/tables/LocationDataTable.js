import { useState } from "react";

// Components
import { Table, Empty, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DeleteModal from "../modals/DeleteModal";

// Data mutation
import { useMutation, useQueryClient } from "react-query";
import deleteLocation from "../../api_utils/api_mutators/deleteLocation";

// Routing
import Link from "next/link";

// Notifications
import { toast } from "react-toastify";

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

  //setting up mutations with react query
  const queryClient = useQueryClient();

  /* 
  --------------------------------------
  Handle Deletion Confirmation Modal
  --------------------------------------
  */

  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const showDeleteModal = () => setDeleteConfirmationVisible(true);

  const [idToDelete, setIdToDelete] = useState("");

  // creating mutator
  const locationDeletionMutation = useMutation(deleteLocation, {
    onSuccess: () => {
      toast.success("Deleted Location successfully");
      queryClient.invalidateQueries("locations");
    },
  });

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
        <DeleteModal
          modalVisibility={deleteConfirmationVisible}
          setModalVisible={setDeleteConfirmationVisible}
          mutator={locationDeletionMutation}
          idToDelete={idToDelete}
          text="Are you sure you want to delete this location?"
        ></DeleteModal>
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
