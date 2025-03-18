import { useState, useEffect } from 'react';
import { getVoucherDetailByCampaignId } from '../../store/api/campaignDetailApi';

const useGetVoucherDetailByCampaignId = (id) => {
  const [voucherDetail, setVoucherDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVoucherDetail = async () => {
      try {
        setLoading(true);
        const data = await getVoucherDetailByCampaignId(id);
        setVoucherDetail(data);
      } catch (err) {
        setError(err.message || "Failed to fetch voucher detail");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVoucherDetail();
    }
  }, [id]);

  return { voucherDetail, loading, error };
};

export default useGetVoucherDetailByCampaignId;