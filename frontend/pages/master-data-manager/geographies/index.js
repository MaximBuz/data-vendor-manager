/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import Link from "next/link";

/* COMPONENTS */
import { Upload, Button, Tooltip, Modal, Space } from "antd";
import LocationDataTable from "../../../components/tables/LocationDataTable";
import {
  InfoOutlined,
  UploadOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

/* API FETCHING */
import { dehydrate, QueryClient, useQuery, useQueryClient } from "react-query";
import getLocations from "../../../utils/fetchers/getLocations";
import getLocationCsvTemplate from "../../../utils/fetchers/getLocationCsvTemplate";

/* NOTIFICATIONS */
import { toast } from "react-toastify";

/* HOOKS */
import { useState } from "react";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function Geographies() {
  /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
  const queryClient = useQueryClient();

  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const locationsQuery = useQuery(["locations"], getLocations);
  const {data, refetch} = useQuery("locationCsvQuery", getLocationCsvTemplate, {
    refetchOnWindowFocus: false,
    enabled: false // turned off by default, manual refetch is needed
  });

  /* -----~~~~~>>>UPLOADING<<<~~~~~----- */
  const uploadProps = {
    name: "file",
    action: "https://vendor-backend-prod.herokuapp.com/api/business-locations/upload/",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status === "done") {
        queryClient.invalidateQueries("locations");
        toast.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        toast.error(`${info.file.name} file upload error`);
      }
    },
  };

  /* -----~~~~~>>>HANDLING INFO MODAL<<<~~~~~----- */
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);


  /* --------------------------------------------------------------------------- */
  /* ~~~~~~RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* --------------------------------------------------------------------------- */
  return (
    <>
      <h2>Business Location Modelling</h2>
      <p style={{ maxWidth: "550px" }}>
        Here you can add and modify locations where organizational entities are
        located. This data will later be used to analyse, where potential cost
        savings and optimizations in market data spend are possible.
      </p>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <Link href="geographies/create/" passHref>
          <Button type="primary" style={{ marginBottom: "10px" }}>
            Add new Business Location
          </Button>
        </Link>
        <Upload {...uploadProps} showUploadList={false}>
          <Button
            icon={<UploadOutlined />}
            type="secondary"
            style={{ marginBottom: "10px" }}
          >
            Upload business locations
          </Button>
        </Upload>
        <Tooltip title="How to upload your locations">
          <Button
            shape="circle"
            icon={<InfoOutlined />}
            size="small"
            style={{ position: "relative", bottom: "5px" }}
            onClick={showModal}
          />
        </Tooltip>
      </div>
      <LocationDataTable
        data={locationsQuery.data}
        isLoading={locationsQuery.isLoading}
        scrollView={{ y: 500 }}
      ></LocationDataTable>
      <Modal
        title="How to upload your business locations"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <p>
          In order to upload your business locations you have to provide a
          specifically formatted .csv file.
        </p>
        <p>
          Following formatting rules have to be considered:
          <ul>
            <li>Encoding: UTF-8</li>
            <li>Seperated by a semicolon ( ; )</li>
            <li>First row with the correct header names</li>
          </ul>
        </p>
        <p>
          You can download the following template and fill in your locations
          manually by using i.e. Microsoft Excel. Please make sure to save and
          upload the file in the correct file format afterwards.
        </p>
        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <Button type="primary" icon={<DownloadOutlined />} onClick={() => refetch()}>
            Download CSV Template
          </Button>
        </div>
      </Modal>
    </>
  );
}

/* --------------------------------------------------------------------------- */
/* ~~~~~~SERVERSIDE RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */

// export async function getServerSideProps(context) {
//   /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
//   const queryClient = new QueryClient();

//   /* -----~~~~~>>>DATA FETCHING<<<~~~~~----- */
//   await queryClient.prefetchQuery(["locations"], getLocations);

//   /* -----~~~~~>>>PASSING PROPS<<<~~~~~----- */
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }
