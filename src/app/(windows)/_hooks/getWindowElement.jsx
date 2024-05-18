import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const getWindow = () => {
  const token = localStorage.getItem('token');
 console.log("${process.env.BASE_URL}/window");
 console.log(`${process.env.NEXT_PUBLIC_BASE_URL}/window`);
  return axios
    .get(`${process.env.NEXT_PUBLIC_BASE_URL}/window`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return error.response;
    });
};

const useGetWindow = () => {
  const queryKey = ['Single window Details'];

  return useQuery({
    queryKey: queryKey,
    queryFn: () => getWindow()
  });
};

export default useGetWindow;
