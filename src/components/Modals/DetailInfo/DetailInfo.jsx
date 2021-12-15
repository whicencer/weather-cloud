import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { deleteCity } from '../../../store/reducers/Cities'
import { toggleDetailInfoPopupOpen } from '../../../store/reducers/Modals'
import './detail-info.css'

export const DetailInfo = () => {
    const dispatch = useDispatch()
    
    const cityInfo = useSelector(state => state.modals.detailInfoPopup.cityInfo)
    const popupIsOpen = useSelector(state => state.modals.detailInfoPopup.isOpen)

    const test = cityInfo.res && cityInfo.res.map((el,key) => {
        const date = new Date(el.dt_txt)
        const forecastDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}, ${date.getHours()}:00`
        const temp = Math.round(el.main.temp)
        const icon = el.weather[0].icon
        const weather = el.weather[0].main

        return <div key={key} className='card'>
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
            <h4 className="card-city">{forecastDate}</h4>
            <p className="card-degree">{temp}°</p>
            <p className="card-weather">{weather}</p>
        </div>
    })

    const handleClick = () => {
        dispatch(toggleDetailInfoPopupOpen(false))
    }
    const handleDeleteClick = () => {
        dispatch(deleteCity(cityInfo.city))
    }
    popupIsOpen ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto"
    return (
        <div className={popupIsOpen ? "popup active" : "popup"} onClick={handleClick}>
            <div className="popup-inner" onClick={e => e.stopPropagation()}>
                <span className="popup-close" onClick={handleClick}>x</span>
                <div className='detail-header'>
                    <h2 className="popup-title">{cityInfo.city} Forecast</h2>
                    <button className='btn' onClick={handleDeleteClick}>Delete</button>
                </div>
                <div className='detail-list'>
                    {test}
                </div>
            </div>
        </div>
    )
}
