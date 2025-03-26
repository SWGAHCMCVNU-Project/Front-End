import { useState, useEffect } from "react";
import { getCampaignsByBrandIdAPI } from "../../store/api/campaignApi";

const useCampaignsByBrandId = (brandId, initialParams = { page: 1, size: 10, searchName: "" }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: initialParams.page,
    totalPages: 1,
    totalItems: 0,
  });

  const fetchCampaigns = async (params = initialParams) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getCampaignsByBrandIdAPI(brandId, params);
      if (response.success) {
        const fetchedCampaigns = response.data.items || [];
        setCampaigns(Array.isArray(fetchedCampaigns) ? fetchedCampaigns : []);
        setPagination({
          currentPage: response.data.page || params.page,
          totalPages: response.data.totalPages || 1,
          totalItems: response.data.total || fetchedCampaigns.length,
        });
      } else {
        setError(response.message);
        setCampaigns([]);
      }
    } catch (err) {
      setError("Đã xảy ra lỗi khi tải danh sách chiến dịch");
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (brandId) {
      fetchCampaigns({ ...initialParams, page: initialParams.page ,size: initialParams.size});
    }
  }, [brandId, initialParams.page,initialParams.size]); // Thêm initialParams.page vào dependency để phản ứng với thay đổi page

  const refetch = (newParams) => {
    const updatedParams = { ...initialParams, ...newParams };
    fetchCampaigns(updatedParams);
  };

  return { campaigns, loading, error, pagination, refetch };
};

export default useCampaignsByBrandId;