import { useState, useEffect } from 'react';
import { getStoresByCampaignId } from '../../store/api/campaignDetailApi';

const useGetStoresByCampaignId = (campaignId, searchName = "", page = 1, size = 10) => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 0
  });

  useEffect(() => {
    const fetchStores = async () => {
      if (!campaignId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getStoresByCampaignId(campaignId, searchName, page, size);
        console.log('Data from API:', data);
        
        setStores(data.items || []);
        setPagination({
          total: data.total || 0,
          page: data.page || 1,
          totalPages: data.totalPages || 0
        });
        setError(null);
      } catch (err) {
        console.error('Error in useGetStoresByCampaignId:', err);
        setError(err.message || "Failed to fetch stores");
        setStores([]);
        setPagination({
          total: 0,
          page: 1,
          totalPages: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, [campaignId, searchName, page, size]);

  return {
    stores,
    loading,
    error,
    total: pagination.total,
    currentPage: pagination.page,
    totalPages: pagination.totalPages
  };
};

export default useGetStoresByCampaignId; 