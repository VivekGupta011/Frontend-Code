import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const createWindowElement = async (data) => {
  const token = localStorage.getItem('token'); // Getting the token from local storage
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
  return await axios.post(apiUrl, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const useCreateWindowElement = (successHandler, errorHandler) => {
  return useMutation({
    mutationFn: async (data) => await createWindowElement(data),
    onSuccess: (data) => successHandler(),
    onError: (error) => errorHandler(error),
  });
};

export default useCreateWindowElement;
