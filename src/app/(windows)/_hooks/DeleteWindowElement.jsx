import { useMutation } from "@tanstack/react-query";
import axios from 'axios';
const DeleteWindowElement =async (userWindowElementId) => {

    const token = localStorage.getItem('token');

  return axios
    .delete(
      `${process.env.NEXT_PUBLIC_API_URL}/${userWindowElementId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response;
    });
};


const useDeleteMutationWindowEle = (successHandler, errorHandler) => {
    return useMutation({
      mutationFn: async (userWindowElementId) => await DeleteWindowElement(userWindowElementId),
      onSuccess: (data) => successHandler(),
      onError: (error) => errorHandler(error),
    });
  };
  
  export default useDeleteMutationWindowEle;