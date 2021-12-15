import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './card.css'
import { toggleAddCityPopupOpen } from '../../store/reducers/Modals'

export const CardAdd = () => {
    const popupIsOpen = useSelector(state => state.modals.addCityPopupOpen)
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(toggleAddCityPopupOpen(!popupIsOpen))
    }

    return (
        <div className="card">
            <h2>Add City</h2>
            <button className="btn-add" onClick={handleClick}>+</button>
        </div>
    )
}