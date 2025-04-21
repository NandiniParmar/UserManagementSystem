import React, { useDebugValue, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DeleteModal from './DeleteModal'
import UsersModal from './UsersModal'
import { Button } from 'reactstrap'
import { setCurrentPage } from './slice/DashboardSlice'

const DisplayUsers = () => {
  const { usersList, search, itemsPerPage, currentPage } = useSelector((state) => state.dashboard)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const dispatch = useDispatch()

  const handleOpenDeleteModal = (id) => {
    setDeleteId(id)
    setOpenDeleteModal(true)
  }

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setOpenEditModal(true)
  }

  const filteredUsers = usersList.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(usersList.length / itemsPerPage);
  const usersToDisplay = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  return (
    <div className='flex flex-col'>
      <table className="table-fixed border-separate border border-gray-400">
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
          {
            usersToDisplay.map((item) => (
              <tr key={item.id}>
                <td className='border border-gray-300'>{item.id}</td>
                <td className='border border-gray-300'>{item.name}</td>
                <td className='border border-gray-300'>{item.email}</td>
                <td className='border border-gray-300'>{item.company.name}</td>
                <td className='border border-gray-300'>{item.address.city}</td>
                <td className='border border-gray-300 p-3 flex space-x-4'>
                  <button type="button" className="edit-btn" onClick={() => handleOpenEditModal(item)}>Edit</button>
                  <button type="button" className="delete-btn" onClick={() => handleOpenDeleteModal(item.id)}>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
        {openDeleteModal && <DeleteModal isOpen={handleOpenDeleteModal} onClose={() => setOpenDeleteModal(false)} id={deleteId} />}
        <UsersModal isOpen={openEditModal} onClose={() => setOpenEditModal(false)} editInfo={selectedUser} />
      </table>
      <div className="pagination-controls mt-4">
        <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>{`${currentPage} of ${totalPages}`}</span>
        <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default DisplayUsers
