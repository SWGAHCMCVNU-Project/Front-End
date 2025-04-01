import { useState, useEffect } from 'react';
import { getStudentById } from '../../store/api/studentApi'; // Giả sử studentService nằm cùng thư mục

const useGetStudentById = (id) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStudent = async () => {
    if (!id) return; // Không gọi API nếu không có ID
    setLoading(true);
    setError(null);
    try {
      const data = await getStudentById(id);
      setStudent(data);
    } catch (err) {
      setError(err.message || `Failed to fetch student with ID ${id}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [id]); // Gọi lại API khi ID thay đổi

  return { student, loading, error, refetch: fetchStudent };
};

export default useGetStudentById;