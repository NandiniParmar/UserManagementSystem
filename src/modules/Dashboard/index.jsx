import React, { useState } from 'react'
import DisplayUsers from './DisplayUsers'
import UsersModal from './UsersModal';
import { Button, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterByEmail, setFilterByName, setSearch } from './slice/DashboardSlice';


const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const { search, filterByName, usersList, filterByEmail } = useSelector((state) => state.dashboard)
  const dispatch = useDispatch();
  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value))
  }
  const handleCloseSearch = () => {
    dispatch(setSearch(""))
  }

  const handleFieldChange = (e) => {
    dispatch(setFilterByName(e.target.value))
  }

  const handleFieldEmailChange = (e) => {
    dispatch(setFilterByEmail(e.target.value))
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
        <div className='flex'>
          <select className="form-select" aria-label="Default select example" onChange={handleFieldChange} value={filterByName}>
            <option value="">All</option>
            {
              usersList.map((item) => (
                <>
                  <option value={item.name} key={item.id || item.name}>{item.name}</option>
                </>
              ))
            }

          </select>
          <select className="form-select" aria-label="Default select example" onChange={handleFieldEmailChange} value={filterByEmail}>
            <option value="">All</option>
            {
              usersList.map((item) => (
                <>
                  <option value={item.email} key={item.id || item.email}>{item.email}</option>
                </>
              ))
            }

          </select>
          <button className="add-button" onClick={handleOpenModal}>Add</button>
        </div>
      </div>
      <div className='flex-1'>
        <DisplayUsers />
      </div>
      {openModal && <UsersModal isOpen={handleOpenModal} onClose={handleCloseModal} />}
    </div>
  )
}

export default Dashboard
