import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModal from './DeleteModal';
import UsersModal from './UsersModal';
import { Button } from 'reactstrap';
import { setCurrentPage, setLoading } from './slice/DashboardSlice';

const DisplayUsers = () => {
  const dispatch = useDispatch();
  const { usersList, search, itemsPerPage, currentPage, isLoading, filterByName, filterByEmail } = useSelector((state) => state.dashboard);
  console.log('filterByName:', filterByName);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // const filteredUsers = useMemo(() => {
  //   return usersList.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()) && (filterByName ? user.name.toLowerCase() === filterByName.toLowerCase() : true));
  // }, [usersList, search, filterByName])

  const filteredUsers = useMemo(() => {
    return usersList.filter((user) => {
      const nameMatches = user.name.toLowerCase().includes(search.toLowerCase()) &&
        (filterByName ? user.name.toLowerCase() === filterByName.toLowerCase() : true);

      const emailMatches = (filterByEmail ? user.email.toLowerCase() === filterByEmail.toLowerCase() : true);

      return nameMatches && emailMatches;
    });
  }, [usersList, search, filterByName, filterByEmail]);

  const handleOpenDeleteModal = (id) => {
    setDeleteId(id);
    setOpenDeleteModal(true);
  };

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };

  const totalPages = useMemo(() => Math.ceil(filteredUsers.length / itemsPerPage), [filteredUsers, itemsPerPage]);

  const usersToDisplay = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIndex = startIdx + itemsPerPage;
    return filteredUsers.slice(startIdx, endIndex);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setLoading(false))
    }, 1000);
    return () => clearTimeout(timer)
  }, [dispatch])

  return (
    <div className="flex flex-col w-full">
      {
        isLoading ?
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
          :
          <table className="table-fixed border-separate border border-gray-400 w-full">
            <thead>
              <tr>
                <th className='border border-gray-300'>ID</th>
                <th className='border border-gray-300'>Name</th>
                <th className="border border-gray-300">Email</th>
                <th className="border border-gray-300">Company's Name</th>
                <th className="border border-gray-300">Address</th>
                <th className="border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersToDisplay.map(user => (
                <tr key={user.id}>
                  <td className='border border-gray-300'>{user.id}</td>
                  <td className='border border-gray-300'>{user.name}</td>
                  <td className='border border-gray-300'>{user.email}</td>
                  <td className='border border-gray-300'>{user.company.name}</td>
                  <td className='border border-gray-300'>{user.address.city}</td>
                  <td className='border border-gray-300 p-3'>
                    <div className="flex gap-3">
                      <button className="edit-btn" onClick={() => handleOpenEditModal(user)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleOpenDeleteModal(user.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      }

      {/* Modals outside table structure */}
      {openDeleteModal && (
        <DeleteModal
          isOpen={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          id={deleteId}
        />
      )}
      {openEditModal && (
        <UsersModal
          isOpen={openEditModal}
          onClose={() => setOpenEditModal(false)}
          editInfo={selectedUser}
        />
      )}

      <div className="pagination-controls mt-4 flex items-center justify-between">
        <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>{`${currentPage} of ${totalPages}`}</span>
        <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default DisplayUsers;
