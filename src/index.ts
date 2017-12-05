import axios from 'axios'
import * as spin from 'ora'
import * as colors from 'colors'

type LatLong = [number, number]
interface Coord {
  lon: number
  lat: number
}
interface Weather {
  id: number
  main: string
  description: string
  icon: string
}
interface Main {
  temp: number
  pressure: number
  humidity: number
  temp_min: number
  temp_max: number
}
interface Wind {
  spped: number
  deg: number
}
interface Clouds {
  all: number
}
interface Sys {
  type: number
  id: number
  message: number
  country: string
  sunrise: number
  sunset: number
}
interface WeatherResponse {
  coord: Coord
  weather: Weather[]
  base: string
  main: Main
  visibility: number
  wind: Wind
  clouds: Clouds
  dt: number
  sys: Sys
  id: number
  name: string
  cod: number
}
type Feels =
  | 'ice_ice_baby'
  | 'nippy'
  | 'meh'
  | 'warmish'
  | 'hot'
  | 'MOLTEN_LAVA'

// { coord: { lon: -0.12, lat: 51.5 },
// weather:
//  [ { id: 803,
//      main: 'Clouds',
//      description: 'broken clouds',
//      icon: '04d' } ],
// base: 'stations',
// main:
//  { temp: 280.45,
//    pressure: 1036,
//    humidity: 81,
//    temp_min: 280.15,
//    temp_max: 281.15 },
// visibility: 10000,
// wind: { speed: 2.6, deg: 250 },
// clouds: { all: 75 },
// dt: 1512465600,
// sys:
//  { type: 1,
//    id: 5088,
//    message: 0.008,
//    country: 'GB',
//    sunrise: 1512460184,
//    sunset: 1512489161 },
// id: 2634341,
// name: 'City of Westminster',
// cod: 200 }

const API_KEY = '6290d4c8aed34915c84cba9277058746'
const API_BASE = 'http://api.openweathermap.org/data/2.5/weather'
const url = (u: string) => `${API_BASE}/${u}&APPID=${API_KEY}`

function getWeather(location: LatLong): Promise<WeatherResponse> {
  return axios
    .get(url(`?lat=${location[0]}&lon=${location[1]}`))
    .then(resp => resp.data)
    .catch(err => {
      console.error(err.response)
      return err
    })
}

function kelvinToCelcius(kelvin: number): number {
  return kelvin - 273.15
}

function getFeels(kelvin: number): Feels {
  const celcius = kelvinToCelcius(kelvin)
  if (celcius < 0) {
    return 'ice_ice_baby'
  } else if (celcius < 10) {
    return 'nippy'
  } else if (celcius < 15) {
    return 'meh'
  } else if (celcius < 20) {
    return 'warmish'
  } else if (celcius < 30) {
    return 'hot'
  } else {
    return 'MOLTEN_LAVA'
  }
}

function getLocation(): Promise<LatLong> {
  return axios.get('http://freegeoip.net/json/').then(response => {
    return [response.data.latitude, response.data.longitude] as LatLong
  })
}

function formatWeather(weather: WeatherResponse): string {
  return `
    The weather in ${weather.name} is ${getFeels(weather.main.temp)}
  `
}

async function wtf() {
  const spinner = spin()
  spinner.start(colors.cyan('Getting zee weather'))
  return getWeather(await getLocation())
    .then(weather => {
      spinner.stop()
      console.log(formatWeather(weather))
    })
    .catch(() => {
      spinner.stop()
    })
}

wtf()
