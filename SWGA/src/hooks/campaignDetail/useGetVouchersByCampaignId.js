import { useState, useEffect } from 'react';
import { getVouchersByCampaignId } from '../../store/api/campaignDetailApi';

const useGetVouchersByCampaignId = (campaignId, searchName = "", page = 1, size = 100) => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        setLoading(true);
        const data = await getVouchersByCampaignId(campaignId, searchName, page, size);
        setVouchers(data);
      } catch (err) {
        setError(err.message || "Failed to fetch vouchers");
      } finally {
        setLoading(false);
      }
    };

    if (campaignId) {
      fetchVouchers();
    }
  }, [campaignId, searchName, page, size]);

  return { vouchers, loading, error };
};

export default useGetVouchersByCampaignId;