import { useQuery } from "@tanstack/react-query";
import { getLecturersByCampusAPI } from "../../store/api/lecturerApi";
import toast from "react-hot-toast";

export const useGetLecturers = ({
  campusId,
  searchName = "",
  page = 1,
  size = 10,
} = {}) => {
  const params = {
    campusId,
    searchName,
    page,
    size,
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["lecturers", campusId, searchName, page, size],
    queryFn: () => getLecturersByCampusAPI(params),
    staleTime: 0,
    onError: (error) => {
      toast.error("Không thể tải danh sách giảng viên");
    },
    enabled: !!campusId,
  });

  const lecturers = data?.success && data.data
    ? {
        result: Array.isArray(data.data.items) ? data.data.items : [],
        totalCount: data.data.total || 0,
        page: data.data.page || page,
        size: data.data.size || size,
        totalPages: data.data.totalPages || 0,
      }
    : {
        result: [],
        totalCount: 0,
        page,
        size,
        totalPages: 0,
      };

  return { lecturers, error, isLoading };
};