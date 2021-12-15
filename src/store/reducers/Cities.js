import { createSlice } from "@reduxjs/toolkit";

const cities = createSlice({
    name: 'cities',
    initialState: {
        localLocation: [],
        locations: []
    },
    reducers: {
        addCity(state, action) {
            state.locations = [...state.locations, action.payload]
            localStorage.setItem('locations', JSON.stringify(state.locations))
        },
        deleteCity(state, action) {
            state.locations = state.locations.filter(el => el.name !== action.payload)
            localStorage.setItem('locations', JSON.stringify(state.locations))
        },
        setLocalCity(state, action) {
            state.localLocation.push(action.payload)
        }
    }
})

export const {addCity, setLocalCity, deleteCity} = cities.actions
export default cities.reducer