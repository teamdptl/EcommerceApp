// useUsersFetch.js

import baseUrl from "../config";
import { useState, useEffect } from "react";
import createFetch from "../utils/createFetch";

const useUsersFetch = (lastModified, pageSize = 5, searchData) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPage, setMaxPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchUsers = async (page = currentPage) => {
    setLoading(true);

    try {
      const queryString = new URLSearchParams({
        page,
        size: pageSize,
        keyword: searchData.keyword || "",
        userRole: searchData.userRole || "",
        isDeleted: searchData.isDeleted || "",
      }).toString();

      const response = await createFetch(`${baseUrl}/api/v1/users/search?${queryString}`);
      const data = await response.json();

      setUsers(data.content);
      setMaxPage(data.totalPages);
      setCurrentPage(data.number);
      setTotalElements(data.totalElements);
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [lastModified, searchData]);

  const handlePageChange = (newPage) => {
    if (newPage <= maxPage) {
      setCurrentPage(newPage);
      fetchUsers(newPage);
    }
  };

  return {
    users,
    errorMsg,
    loading,
    currentPage,
    maxPage,
    totalElements,
    handlePageChange,
  };
};

export default useUsersFetch;
