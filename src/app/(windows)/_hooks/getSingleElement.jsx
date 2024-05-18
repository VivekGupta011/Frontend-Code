import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getSingleElementFunc = async (ElementId) => {
  const token = localStorage.getItem("token");
  return axios
    .get(
      `${process.env.NEXT_PUBLIC_API_URL}/${ElementId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response;
    });
};

const useGetSingleElementFunc = (ElementId) => {
  const queryKey = ["Single window Details", ElementId];
  return useQuery({
    queryKey: queryKey,
    queryFn: () => getSingleElementFunc(ElementId),
  });
};

export default useGetSingleElementFunc;
