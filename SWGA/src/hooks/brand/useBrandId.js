// useBrand.js
import { useQuery } from '@tanstack/react-query';
import { getBrandByIdAPI } from '../../store/api/brandApi';
import { toast } from "react-hot-toast";

export const useBrand = (brandId) => {
  const { data: brand, isLoading, error, refetch } = useQuery({
    queryKey: ['brand', brandId], // Unique key for caching
    queryFn: async () => {
      if (!brandId) {
        throw new Error('Brand ID is required');
      }
      const response = await getBrandByIdAPI(brandId);
      return response.data; // Return the brand data
    },
    enabled: !!brandId, // Only run the query if brandId exists
    onError: (err) => {
      toast.error(err.message || 'Đã có lỗi xảy ra khi lấy thông tin thương hiệu!');
    },
  });

  return {
    brand, // The fetched brand data
    loading: isLoading, // Loading state
    error: error?.message || null, // Error message if any
    refetch, // Function to manually refetch
  };
};

export default useBrand;