import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";

const useFetchTracking = (trackingIdOrParcelId) => {
  const axiosSecure = UseAxiosSecure();

  const { data = [], isLoading, error } = useQuery({
    queryKey: ["tracking", trackingIdOrParcelId],
    enabled: !!trackingIdOrParcelId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tracking?trackingId=${trackingIdOrParcelId}`);
      return res.data;
    },
  });

  return { data, isLoading, error };
};

export default useFetchTracking;
