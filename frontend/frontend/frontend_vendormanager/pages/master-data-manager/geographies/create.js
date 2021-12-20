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

export default function CreateLocation() {
  //setting up mutations with react query
  const queryClient = useQueryClient();
  const mutation = useMutation(postLocation, {
    onSuccess: () => queryClient.invalidateQueries("locations"),
  });

  return (
    <>
      <h2>Add new Location</h2>
      <CreateLocationForm />
    </>
  );
}
