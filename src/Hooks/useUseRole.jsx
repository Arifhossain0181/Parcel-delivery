import { useQuery } from "@tanstack/react-query";
import UseAuthhooks from "./UseAuthhooks";
import UseAxiosSecure from "./UseAxiosSecure";

const useUserRole = () => {
  const { user, loading: userLoading } = UseAuthhooks();
  const axiosSecure = UseAxiosSecure();

  const {
    data: roleData,
    isLoading: roleLoading,
    refetch,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !userLoading && !!user?.email, // only fetch when user exists
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data;
    },
  });

  const role = roleData?.role || null;

  return { role, roleLoading, userLoading, refetch };
};

export default useUserRole;
