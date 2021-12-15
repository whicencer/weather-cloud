import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import '../modal.css'
import './add-city.css'
import { asyncAddCity, toggleAddCityPopupOpen } from '../../../store/reducers/Modals'

export const AddCity = () => {

    const [inputValue, changeInputValue] = useState('')

    const popupIsOpen = useSelector(state => state.modals.addCityPopupOpen)
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(toggleAddCityPopupOpen(!popupIsOpen))
    }
    const handleAddCity = (name) => {
        dispatch(asyncAddCity(name))
    }
    popupIsOpen ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto"
    return (
        <div className={popupIsOpen ? 'popup active' : 'popup'} onClick={handleClick}>
            <div className="popup-inner" onClick={e => e.stopPropagation()}>
                <span className="popup-close" onClick={handleClick}>x</span>
                <h2 className="popup-title">Add City</h2>
                <input value={inputValue} onChange={e => changeInputValue(e.target.value)} className="popup-input" placeholder="Enter city name [ex. London]" type="text" id="city" />
                <button className="popup-btn" onClick={() => handleAddCity(inputValue)}>Add City</button>
            </div>
        </div>
    )
}
