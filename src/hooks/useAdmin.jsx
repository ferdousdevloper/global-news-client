import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from './useAuth';

const useAdmin = () => {
  const { user, loading } = useAuth();

  const { data: isAdmin = false, isLoading, isError, error } = useQuery({
    queryKey: [user?.email, 'isAdmin'],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axios.get(`https://global-news-server-phi.vercel.app/users/admin/${user?.email}`);
      return data?.admin;
    },
  });
  

  // Log the actual error if any
  if (isError) {
    console.error("Query error:", error);
  }

  return [isAdmin, isLoading, isError];
};

export default useAdmin;
