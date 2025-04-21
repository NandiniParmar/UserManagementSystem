import { createSlice } from "@reduxjs/toolkit"
import { UsersData } from "../../../constants/constants";

const initialState = {
  usersList: UsersData,
  search: "",
  currentPage: 1,
  itemsPerPage: 5
}

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    addUsers: (state, action) => {
      state.usersList.push(action.payload)
    },
    deleteUsers: (state, action) => {
      state.usersList = state.usersList.filter((user) => user.id !== action.payload)
    },
    editUser: (state, action) => {
      state.usersList = state.usersList.map(user =>
        user.id === action.payload.id ? action.payload : user
      );
    },
    setSearchItem: (state, action) => {
      state.search = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => { }
})

export const { addUsers, deleteUsers, editUser, setSearchItem, setCurrentPage } = dashboardSlice.actions

export default dashboardSlice.reducer;
