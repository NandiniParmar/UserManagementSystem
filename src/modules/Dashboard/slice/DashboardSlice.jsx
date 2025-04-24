import { createSlice } from "@reduxjs/toolkit"
import { UsersData } from "../../../constants/constants";

const initialState = {
  usersList: UsersData,
  currentPage: 1,
  itemsPerPage: 5,
  isLoading: true,
  search: "",
  filterByName: "",
  filterByEmail: "",
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
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setFilterByName: (state, action) => {
      state.filterByName = action.payload
    },
    setFilterByEmail: (state, action) => {
      state.filterByEmail = action.payload
    },
  },
  extraReducers: (builder) => { }
})

export const { addUsers, deleteUsers, editUser, setSearch, setCurrentPage, setLoading, setFilterByName, setFilterByEmail } = dashboardSlice.actions

export default dashboardSlice.reducer;
