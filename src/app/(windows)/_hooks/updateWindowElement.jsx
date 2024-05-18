import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const updateEventMutation = async (data,userEventId) => {
  const apiUrl =  `${process.env.NEXT_PUBLIC_API_URL}/${userEventId}`;
  return await axios.put(apiUrl, data);
};

const useUpdateWindowtMutation = (successHandler, errorHandler,userEventId) => {
  return useMutation({
    mutationFn: async (data) => await updateEventMutation(data,userEventId),
    onSuccess: () => successHandler(),
    onError: (error) => errorHandler(error)
  });
};

export default useUpdateWindowtMutation;
