import './App.css';
import { Card } from './components/Card/Card';
import { CardAdd } from './components/Card/CardAdd';
import { addCity, setLocalCity } from './store/reducers/Cities';
import { useDispatch } from 'react-redux';
import { weatherApi } from './api';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AddCity } from './components/Modals/AddCity/AddCity'
import {DetailInfo} from './components/Modals/DetailInfo/DetailInfo'
import { Loader } from './Loader/Loader';
import {toggleFetching} from './store/reducers/Main'

const App = () => {
  const dispatch = useDispatch()
  const cities = useSelector(state => state.cities.locations)
  const currentLocation = useSelector(state => state.cities.localLocation)
  const isFetching = useSelector(state => state.main.isFetching)

  useEffect(() => {
    // const locationsItems = JSON.parse(localStorage.getItem(''))
    dispatch(toggleFetching(true))
    navigator.geolocation.getCurrentPosition((pos) => {
      weatherApi.byCoord(pos.coords.latitude, pos.coords.longitude)
        .then(res => {
          dispatch(setLocalCity(res.data))
          dispatch(toggleFetching(false))
      })
    })
  }, [])

  useEffect(() => {
    const locations = JSON.parse(localStorage.getItem('locations')) || []
    locations.forEach(el => dispatch(addCity(el)))
  }, [])

  const geoLocationCity = currentLocation.map((el, key) => {
    return <Card
      key={key}
        icon={`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`}
        degrees={Math.round(el.main.temp)}
        weather={el.weather[0].main}
        city={el.name}
      />
  })

  const addedCity = cities.map((el, key) => {
    const temp = Math.round(el.main.temp)
    return <Card
      icon={`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`}
      degrees={`${temp}°`}
      weather={el.weather[0].main}
      city={el.name}
      key={key}
    />
  })

  return (
    <div className="App">
        <h1>Weather Cloud</h1>
        {
          isFetching
          ? <Loader />
          : <div className="cards">
            {geoLocationCity}
            {addedCity}
            <CardAdd />
            <AddCity />
            <DetailInfo />
          </div>
        }
      </div>
  );
}

export default App;
