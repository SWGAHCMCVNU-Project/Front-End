import { useState, useEffect } from 'react';
import { getAllStudents } from '../../store/api/studentApi';

const useGetAllStudents = ({ page = 1, size = 10, search = "" } = {}) => {
  const [students, setStudents] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllStudents({ page, size, search });
      if (response && response.items) {
        setStudents(response.items);
        setTotalCount(response.total || 0);
      } else {
        setStudents([]);
        setTotalCount(0);
        setError('No students found in the response');
      }
    } catch (err) {
      console.error('Error fetching students:', err);
      setError(err.message || 'Failed to fetch students');
      setStudents([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page, size, search]);

  return { students, totalCount, loading, error, refetch: fetchStudents };
};

export default useGetAllStudents;