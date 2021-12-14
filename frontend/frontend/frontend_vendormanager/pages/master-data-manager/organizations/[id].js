// Routing
import { useRouter } from "next/router";

// Data Fetching
import { dehydrate, QueryClient, useQuery } from "react-query";
import getOrganizationalEntity from "../../../api_fetchers/getOrganizationalEntity";

// Components
import EntityForm from "../../../components/forms/EntityForm";
import { Row, Col } from "antd";

export default function Organization() {
  const router = useRouter();
  const { id: entityId } = router.query;

  // Data fetching
  // the third parameter I'm giving inside the array is the depth I need
  const { isLoading, error, data } = useQuery(
    ["organizationalEntity", entityId, 10],
    getOrganizationalEntity
  );

  const entity = data[0];

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error...</>;
  }

  return (
    <>
      <h2>
        {entity.name} ({entity.type.name})
      </h2>
      <Row>
        <Col flex={2}>
          <EntityForm initialValues={entity} />
        </Col>
        <Col
          flex={1}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          Hier kommen Später Eltern und Kinder hin
        </Col>
      </Row>
    </>
  );
}

export async function getServerSideProps(context) {
  // get the id of the entity
  const entityId = context.params.id;
  console.log(entityId);

  const queryClient = new QueryClient();

  // the third parameter I'm giving inside the array is the depth I need
  await queryClient.prefetchQuery(
    ["organizationalEntity", entityId, 10],
    getOrganizationalEntity
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
