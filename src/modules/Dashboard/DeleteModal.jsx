import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { deleteUsers } from './slice/DashboardSlice';

const DeleteModal = ({ isOpen, onClose, id }) => {
  const dispatch = useDispatch();
  const handleDeleteUser = () => {
    dispatch(deleteUsers(id))
    onClose()
  }
  return (
    <>
      <Modal isOpen={isOpen} toggle={onClose}>
        <ModalHeader>Delete User</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this user?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleDeleteUser}>
            OK
          </Button>{' '}
          <Button color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default DeleteModal
