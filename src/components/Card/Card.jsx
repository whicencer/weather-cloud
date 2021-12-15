import React from 'react'
import { useDispatch } from 'react-redux'
import './card.css'
import {getData} from '../../store/reducers/Modals'

export const Card = ({icon, degrees, weather, city}) => {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(getData(city))
    }
    return (
        <div className="card" onClick={handleClick}>
            <img src={icon} alt="icon" />
            <h2 className="card-degree">{degrees}</h2>
            <p className="card-weather">{weather}</p>
            <h3 className="card-city">{city}</h3>
        </div>
    )
}
