import { useState, useEffect } from 'react';
import { getVouchersByCampaignId } from '../../store/api/campaignDetailApi';

const useGetVouchersByCampaignId = (campaignId, searchName = "", page = 1, size = 10) => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 0
  });

  useEffect(() => {
    const fetchVouchers = async () => {
      if (!campaignId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getVouchersByCampaignId(campaignId, searchName, page, size);
        
        setVouchers(data.items || []);
        setPagination({
          total: data.total || 0,
          page: data.page || 1,
          totalPages: data.totalPages || 0
        });
        setError(null);
      } catch (err) {
        console.error('Error in useGetVouchersByCampaignId:', err);
        setError(err.message || "Failed to fetch vouchers");
        setVouchers([]);
        setPagination({
          total: 0,
          page: 1,
          totalPages: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, [campaignId, searchName, page, size]);

  return {
    vouchers,
    loading,
    error,
    total: pagination.total,
    currentPage: pagination.page,
    totalPages: pagination.totalPages
  };
};

export default useGetVouchersByCampaignId;