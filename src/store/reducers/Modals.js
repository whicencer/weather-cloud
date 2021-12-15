import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { weatherApi } from "../../api";
import { addCity } from "./Cities";
import { toggleFetching } from "./Main";

export const getData = createAsyncThunk(
    'modals/getData',
    async (city, {dispatch}) => {
        dispatch(toggleFetching(true))
        try {
            const response = await weatherApi.forWeek(city)
            dispatch(toggleDetailInfoPopupOpen(true))
            return {city, res: response}
        } catch (err) {
            alert(`Some error occured`)
        } finally {
            dispatch(toggleFetching(false))
        }
    }
)

export const asyncAddCity = createAsyncThunk(
    'modals/addCity',
    async (city, {dispatch}) => {
        dispatch(toggleFetching(true))
        try {
            const response = await weatherApi.byName(city)
            dispatch(addCity(response.data))
        } catch(err) {
            alert(`${city} city was not found`)
        } finally {
            dispatch(toggleFetching(false))
        }
    }
)

const modals = createSlice({
    name: 'modals',
    initialState: {
        addCityPopupOpen: false,
        detailInfoPopup: {
            isOpen: false,
            cityInfo: {}
        }
    },
    reducers: {
        toggleAddCityPopupOpen(state, action) {
            state.addCityPopupOpen = action.payload
        },
        toggleDetailInfoPopupOpen(state, action) {
            state.detailInfoPopup.isOpen = action.payload
        },
        setDetailInfoPopup(state, action) {
            state.detailInfoPopup.cityInfo = action.payload
        }
    },
    extraReducers: {
        [getData.fulfilled]: (state, action) => {
            state.detailInfoPopup.cityInfo = action.payload
        }
    }
})

export const {toggleAddCityPopupOpen, toggleDetailInfoPopupOpen, setDetailInfoPopup} = modals.actions
export default modals.reducer