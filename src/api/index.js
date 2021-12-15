import * as axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5/"
})

export const weatherApi = {
    byCoord(lat, lon) {
        return instance.get(`weather?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=fec27e67f0ec6ce5544546b6c430c8c9`)
    },
    byName(name) {
        return instance.get(`weather?q=${name}&units=metric&lang=en&appid=fec27e67f0ec6ce5544546b6c430c8c9`)
    },
    forWeek(name) {
        return instance.get(`forecast?q=${name}&lang=en&units=metric&appid=fec27e67f0ec6ce5544546b6c430c8c9`)
            .then(response => response.data.list)
    }
}