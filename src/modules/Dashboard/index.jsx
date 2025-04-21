import React, { useState } from 'react'
import DisplayUsers from './DisplayUsers'
import UsersModal from './UsersModal';
import { Button, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchItem } from './slice/DashboardSlice';


const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const { search } = useSelector((state) => state.dashboard)
  const dispatch = useDispatch();
  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleSearchChange = (e) => {
    dispatch(setSearchItem(e.target.value))
  }
  const handleCloseSearch = () => {
    dispatch(setSearchItem(""))
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <div>
        <h1 className="text-2xl font-bold text-center mt-5">Welcome to Dashboard</h1>
      </div>
      <div className='flex justify-between items-center mt-4 mb-4'>
        <div className='d-flex'>
          <Input type="text" placeholder="Search..." onChange={handleSearchChange} value={search} />
          {search && <Button type='button' onClick={handleCloseSearch}>X</Button>}
        </div>
        <button className="add-button" onClick={handleOpenModal}>Add</button>
      </div>
      <div className='flex-1 flex items-center justify-center'>
        <DisplayUsers />
      </div>
      {openModal && <UsersModal isOpen={handleOpenModal} onClose={handleCloseModal} />}
    </div>
  )
}

export default Dashboard
