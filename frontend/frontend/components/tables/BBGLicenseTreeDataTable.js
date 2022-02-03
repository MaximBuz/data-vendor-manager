/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* ROUTING */
import Link from "next/link";

/* API FETCHING */
import { dehydrate, QueryClient, useQuery, useQueryClient } from "react-query";
import getBBGLicenseTree from "../../utils/fetchers/getBBGLicenseTree";

/* COMPONENTS */
import { Table, Empty } from "antd";
import { Tooltip } from "antd";

/* --------------------------------------------------------------------------- */
/* ~~~~~~COMPONENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* --------------------------------------------------------------------------- */
export default function BBGLicenseTreeDataTable({
  scrollView,
  rowSelection
}) {
  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const { isLoading, isError, data, error } = useQuery(
    ["bbgLicenseTree", 0 /* Depth */],
    getBBGLicenseTree
  );

  /* -----~~~~~>>>COLUMN DEFINITION<<<~~~~~----- */
  const columns = [
    {
      title: "Identifier Type",
      fixed: "left",
      width: "25%",
      render: (text, record) => {
        return <Tooltip title={record.description}>{record.name}</Tooltip>;
      },
    },
    {
      title: "Bloomberg Identifier",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Business Entity",
      render: (text, record) => {
        return record.organizational_entity ? (
          <Link
            href={`organizations/${record.organizational_entity?.id}`}
          >
            {record.organizational_entity?.name || undefined}
          </Link>
        ) : (
          <div style={{ color: "lightgrey" }}>N/A</div>
        );
      },
    },
    {
      title: "Location",
      render: (text, record) => {
        return record.location ? (
          <Link
            href={`organizations/${record.location?.id}`}
          >
            {`${record.location?.street}, ${record.location?.city}, ${record.location?.country}` ||
              undefined}
          </Link>
        ) : (
          <div style={{ color: "lightgrey" }}>N/A</div>
        );
      },
    },
    {
      title: "Data Consumer",
      dataIndex: "data_consumer",
      key: "data_consumer",
      render: (text, record) => {
        return record.data_consumer ? (
          <Link
            href={`employees/${record.data_consumer?.id}`}
          >
            {record.data_consumer?.email}
          </Link>
        ) : (
          <div style={{ color: "lightgrey" }}>N/A</div>
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
      </>
    );
  } else if (isLoading) {
    return (
      <>
        {/* Here we can put an animated loading thingy */}
        Loading...
      </>
    );
  } else if (data.length === 0) {
    return <Empty />;
  }
}
