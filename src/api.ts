import axios from 'axios'
import * as Types from './types'

const API_KEY = '6290d4c8aed34915c84cba9277058746'
const API_BASE = 'http://api.openweathermap.org/data/2.5'
const url = (u: string) => `${API_BASE}/${u}&APPID=${API_KEY}`

export function getLatLong(): Promise<Types.LatLong> {
  return axios.get('http://freegeoip.net/json/').then(response => {
    return [response.data.latitude, response.data.longitude] as Types.LatLong
  })
}

export function getWeather(latlong: Types.LatLong): Promise<Types.WeatherResponse> {
  return axios
    .get(url(`/weather?lat=${latlong[0]}&lon=${latlong[1]}`))
    .then(resp => resp.data)
    .catch(console.error)
}