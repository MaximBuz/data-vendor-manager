/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import Link from "next/link";

/* COMPONENTS */
import { Upload, message, Button } from "antd";
import LocationDataTable from "../../../components/tables/LocationDataTable";
import { UploadOutlined } from '@ant-design/icons';

/* API FETCHING */
import { dehydrate, QueryClient, useQuery, useQueryClient } from "react-query";
import getLocations from "../../../api_utils/api_fetchers/getLocations";

/* NOTIFICATIONS */
import { toast } from "react-toastify";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function Geographies() {
  /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
  const queryClient = useQueryClient()

  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const locationsQuery = useQuery(["locations"], getLocations);
  
  /* -----~~~~~>>>UPLOADING<<<~~~~~----- */
  const uploadProps = {
    name: 'file',
    action: 'http://localhost:8000/api/business-locations/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status === 'done') {
        queryClient.invalidateQueries("locations")
        toast.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        toast.error(`${info.file.name} file upload error`);
      }
    },
  };

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
      <div style={{display: "flex", gap: "10px"}}>
        <Link href="geographies/create/">
          <Button type="primary" style={{ marginBottom: "10px" }}>
            Add new Business Location
          </Button>
        </Link>
        <Upload {...uploadProps} showUploadList={false}>
          <Button icon={<UploadOutlined/>} type="secondary" style={{ marginBottom: "10px" }}>
              Upload business locations
          </Button>
        </Upload>
      </div>
      <LocationDataTable
        data={locationsQuery.data}
        isLoading={locationsQuery.isLoading}
        /* scrollView={{ x: 1100, y: 500 }} */
      ></LocationDataTable>
    </>
  );
}

/* --------------------------------------------------------------------------- */
/* ~~~~~~SERVERSIDE RENDERING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */

export async function getServerSideProps(context) {
  /* -----~~~~~>>>INITIALIZING<<<~~~~~----- */
  const queryClient = new QueryClient();

  /* -----~~~~~>>>DATA FETCHING<<<~~~~~----- */
  await queryClient.prefetchQuery(["locations"], getLocations);

  /* -----~~~~~>>>PASSING PROPS<<<~~~~~----- */
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
