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

// Data Mutation
import postLocation from "../../../api_utils/api_mutators/postLocation";

// Components
import CreateLocationForm from "../../../components/forms/CreateLocationForm";
import { Row, Col, Divider, Form, Input } from "antd";

// Notifications
import { toast } from "react-toastify";

export default function CreateLocation() {
  //setting up mutations with react query
  const queryClient = useQueryClient();
  const mutation = useMutation(postLocation, {
    onSuccess: () => {
      toast.success("Added location successfully")
      queryClient.invalidateQueries("locations")},
  });

  return (
    <>
    <Row>
      <Col flex={0.3}>
        <h2>Add new Location</h2>
        <CreateLocationForm />
      </Col>
    </Row>
    </>
  );
}
