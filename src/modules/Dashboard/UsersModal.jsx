import { Formik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import * as Yup from "yup";
import { addUsers, editUser } from './slice/DashboardSlice';


const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required"),
  company: Yup.object().shape({
    name: Yup.string().required("Company's name is required."),
  }),
})

const UsersModal = ({ isOpen, onClose, editInfo }) => {
  const dispatch = useDispatch();
  const { usersList } = useSelector((state) => state.dashboard);
  return (
    <>
      <Formik
        initialValues={{
          id: editInfo?.id || usersList.length + 1,
          name: editInfo?.name || "",
          email: editInfo?.email || "",
          company: editInfo?.company || { name: "" }, // Initial company object
          address: editInfo?.address || { city: "" }, // Initial address object
        }}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          if (editInfo) {
            dispatch(editUser(values))
          } else {
            dispatch(addUsers(values));
          }
          resetForm()
          onClose()
        }}
      >
        {({ handleSubmit, handleBlur, handleChange, values, errors, touched }) => (
          <Modal isOpen={isOpen} toggle={onClose}>
            <ModalHeader>Users Detail</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit} id="userForm">
                <div>
                  <label>Name</label>
                  <Input
                    type="text"
                    value={values.name}
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.name && touched.name && (
                    <div className="text-danger">{errors.name}</div>
                  )}
                </div>
                <div>
                  <label>Email</label>
                  <Input
                    type="email"
                    value={values.email}
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </div>
                <div>
                  <label>Company's name</label>
                  <Input
                    type="text"
                    value={values.company.name} // Access the company name
                    name="company.name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.company?.name && touched.company?.name && (
                    <div className="text-danger">{errors.company?.name}</div>
                  )}
                </div>
                <div>
                  <label>Address</label>
                  <Input
                    type="text"
                    value={values.address.city} // Access the city inside the address object
                    name="address.city"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.address?.city && touched.address?.city && (
                    <div className="text-danger">{errors.address?.city}</div>
                  )}
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit" form="userForm">
                Submit
              </Button>
              <Button color="secondary" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </Formik>

    </>
  )
}

export default UsersModal
