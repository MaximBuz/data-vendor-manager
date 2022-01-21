import React from 'react';
import LoginPage from "../components/auth/loginPage";

/* API FETCHING */
import { useQuery } from 'react-query';
import getCurrentUser from '../api_utils/auth/getCurrentUser';



export default function _AppContainer({children}) {

  /* Here use a query to get current user */
  const currentUser = useQuery(["currentUser"], getCurrentUser, {retry: false});
  /* If Django returns a serialized user, show all children */
  /* Else, show login page */

  if (currentUser.data) {
    return <>{children}</>
  } else {
    return <LoginPage/>
  } 
}
