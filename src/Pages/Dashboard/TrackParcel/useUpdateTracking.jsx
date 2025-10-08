import { useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const useUpdateTracking = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (trackingData) => {
      const res = await axiosSecure.post("/tracking", trackingData);
      return res.data;
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(["tracking", variables.trackingId]);
      },
    }
  );

  return mutation;
};

export default useUpdateTracking;
