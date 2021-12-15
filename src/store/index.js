import { configureStore } from "@reduxjs/toolkit";
import Cities from "./reducers/Cities";
import Main from "./reducers/Main";
import Modals from "./reducers/Modals";

export default configureStore({
    reducer: {cities: Cities, modals: Modals, main: Main}
})