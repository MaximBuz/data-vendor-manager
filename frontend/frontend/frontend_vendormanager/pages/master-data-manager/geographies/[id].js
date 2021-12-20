// React
import { useState } from "react";

// Routing
import { useRouter } from "next/router";

// Data Fetching
import {
  dehydrate,
  QueryClient,
  useQuery,
  useMutation,
  useQueryClient,
} from "react-query";
import getLocationWithBuildings from "../../../api_utils/api_fetchers/getLocationWithBuildings";
import getOrganizationalEntities from "../../../api_utils/api_fetchers/getOrganizationalEntities";
import getOrganizationalEntityRootChildren from "../../../api_utils/api_fetchers/getOrganizationalEntityRootChildren";

// Data Mutation
import postBuilding from "../../../api_utils/api_mutators/postBuilding";

// Components
import LocationForm from "../../../components/forms/LocationForm";
import BuildingCard from "../../../components/cards/BuildingCard";
import { Row, Col, Tree, Divider, Modal, Form, Input } from "antd";

// Styling
import { UilMapMarkerPlus } from "@iconscout/react-unicons";

export default function Organization() {
  // get id of the location
  const router = useRouter();
  const { id: locationId } = router.query;

  //setting up mutations with react query
  const queryClient = useQueryClient();
  const buildingMutation = useMutation(postBuilding, {
    onSuccess: () => queryClient.invalidateQueries("locationWithBuildings"),
  });

  /* 
  --------------------------------------
  Handle Modal for adding new Buildings to location
  --------------------------------------
  */

  // modal functionality
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Add new Building to this location"
  );
  const showModal = () => setVisible(true);

  // handling form inside modal
  const [modalForm] = Form.useForm();

  // handle submit
  const handleOk = () => {
    modalForm
      .validateFields()
      .then((values) => {
        modalForm.resetFields();
        buildingMutation.mutate({
          values: values,
          building_location: locationId,
        });
        setVisible(false);
      })
      .catch((info) => console.log(info));
  };
  const handleCancel = () => {
    setVisible(false);
  };

  // Data fetching for locations dropdown
  const locationQuery = useQuery(
    ["locationWithBuildings", locationId],
    getLocationWithBuildings
  );
  const location = locationQuery?.data;
  const buildings = location?.buildings;


  // Data fetching for preselecting organizational entities related to this location
  const entitiesQuery = useQuery(
    ["organizationalEntities", 1 /* Depth parameter */],
    getOrganizationalEntities
  );
  const relatedEntities = entitiesQuery?.data.filter((entity) => entity.location?.id == locationId);
  // Data fetching tree structure
    const treeQuery = useQuery(
      ["organizationalEntityRootChildren", 10],
      getOrganizationalEntityRootChildren
    );
  
    const treeData = treeQuery.data && JSON.parse(JSON.stringify(treeQuery.data).split('"id":').join('"key":').split('"name":').join('"title":'));
  

  /*   const treeData = treeQuery.data && JSON.parse(JSON.stringify(treeQuery.data).split('"id":').join('"key":')); */

  if (locationQuery.isLoading) {
    return <>Loading...</>;
  }

  if (locationQuery.error) {
    return <>Error...</>;
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col flex={1}>
          <h2>
            Location in {location.city}, {location.country}
          </h2>
          <LocationForm initialValues={location} />
        </Col>
        <Divider type="vertical" style={{ minHeight: "70vh" }} />
        <Col flex={1}>
          <div
            style={{
              height: "70vh",
              /* overflowY: "scroll",
            scrollbarWidth: "none", */
            }}
          >
            <h2>Buildings associated with this location</h2>
            {buildings.map((building) => {
              return <BuildingCard building={building} />;
            })}
            {/* Create new Building button */}
            {/* ------------------------------------------ */}
            <div
              onClick={showModal}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0px",
                padding: "10px",
                borderRadius: "2px",
                borderStyle: "dashed",
                borderWidth: "1px",
                borderColor: "#d9d9d9",
                margin: "20px",
                color: "grey",
                cursor: "pointer",
              }}
            >
              <UilMapMarkerPlus />
              Add new Building
            </div>
            {/* ------------------------------------------ */}
          </div>
        </Col>
        <Divider type="vertical" style={{ minHeight: "70vh" }} />
        <Col flex={1}>
          <h2>Entities associated with this location</h2>
          {/* Displaying Entities at that location */}
          {/* ------------------------------------------ */}
          <div style={{height: "40em", overflow:"scroll", backgroundColor: "white", border: "1px solid #d9d9d9"}}>
            <Tree
              showLine = {{showLeafIcon: false}}
              defaultExpandAll
              multiple={true}
              defaultSelectedKeys={relatedEntities.map(entity => entity.id)}
              /* selectable= {false} */
              /* onSelect={"onSelect"} */
              treeData={treeData}
              style={{ padding: "10px 0 0 10px", minHeigth: "100%"}}
            />
          </div>
          {/* ------------------------------------------ */}
        </Col>
      </Row>

      <Modal
        title="Add new Building to this location"
        visible={visible}
        okText="Add"
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form form={modalForm} preserve={false} layout="vertical">
          <Form.Item name="building_name">
            <Input placeholder="Add new Building to this location" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export async function getServerSideProps(context) {
  // Initializing cache from React Query
  const queryClient = new QueryClient();

  const locationId = context.params.id;

  // Prefetching the locations
  await queryClient.prefetchQuery(
    ["locationWithBuildings", locationId],
    getLocationWithBuildings
  );

  // Prefetching organizational entities
  await queryClient.prefetchQuery(
    ["organizationalEntities", 1 /* Depth parameter */],
    getOrganizationalEntities
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
