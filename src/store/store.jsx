import { configureStore } from "@reduxjs/toolkit";
import DashboardSlice from "../modules/Dashboard/slice/DashboardSlice"

const store = configureStore({
  reducer: {
    dashboard: DashboardSlice,
  }
})

export default store