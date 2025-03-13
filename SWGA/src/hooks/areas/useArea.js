// hooks/useArea.js
import { useQuery } from "@tanstack/react-query";
import { getAreaByIdAPI } from "../../store/api/areasApi";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useArea() {
  const { areaId } = useParams();

  const { isLoading, data: area, error } = useQuery({
    queryKey: ["area", areaId],
    queryFn: () => getAreaByIdAPI(areaId),
    enabled: !!areaId,
    staleTime: 1000 * 60,
    onError: () => toast.error("Không thể tải thông tin khu vực"),
  });

  return { isLoading, area, error };
}