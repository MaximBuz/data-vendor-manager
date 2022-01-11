/* ------------------------------------------------------------------------- */
/* ~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ------------------------------------------------------------------------- */

/* API FETCHING */
import {
  dehydrate,
  QueryClient,
  useQuery,
  useMutation,
  useQueryClient,
} from "react-query";
import getAggregatedUsage from "../../api_utils/api_fetchers/getAggregatedUsage";


export default function Home() {

  /* -----~~~~~>>>DATAFETCHING<<<~~~~~----- */
  const usageDataQuery = useQuery(
    ["aggregatedUsage",
    "data-consumer",
    {
      start_date: "2022-01-01"
    }
    ],
    getAggregatedUsage
  );
  const usageData = usageDataQuery?.data;
  console.log(usageData);

  return <h1>Cost Manager</h1>;
}
