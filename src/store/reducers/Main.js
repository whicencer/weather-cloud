import { createSlice } from "@reduxjs/toolkit";

const main = createSlice({
    name: 'main',
    initialState: {
        isFetching: false
    },
    reducers: {
        toggleFetching(state, action) {
            state.isFetching = action.payload
        }
    }
})

export const {toggleFetching} = main.actions
export default main.reducer