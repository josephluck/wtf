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

const API_KEY = '6290d4c8aed34915c84cba9277058746'
const API_BASE = 'http://api.openweathermap.org/data/2.5/weather'
const url = (u: string) => `${API_BASE}/${u}&APPID=${API_KEY}`

const emojis = {
  cloud: '☁️',
  fog: '🌁',
  sun_with_cloud: '⛅',
  sun: '☀️',
  rain_with_cloud: '🌧️',
  rain_with_sun_and_cloud: '🌦️',
  thunder: '⚡',
  snow: '❄️',
  wind: '💨',
  umbrella: '☂️',
  sunnies: '🕶️',
}

function random<A>(arr: A[]): A {
  return arr[Math.floor(Math.random() * arr.length)]
}

function iceIceBaby(location: string): string {
  return `Frostbite inducing ${emojis.snow}`
}

function nippy(location: string): string {
  return random([
    `It's a bit chilly in ${location} today`,
    `Grab your coat and jacket today if you're headed to ${location} today`,
    `${location} is looking a little brisk today`,
  ])
}

function meh(location: string): string {
  return 'A bit chilly'
}

function warmish(location: string): string {
  return 'A bit chilly'
}

function hot(location: string): string {
  return 'A bit chilly'
}

function moltenLava(location: string): string {
  return 'A bit chilly'
}

function feelsToMessage(feels: Feels, location: string): string {
  switch (feels) {
    case 'ice_ice_baby':
      return iceIceBaby(location)
    case 'nippy':
      return nippy(location)
    case 'meh':
      return meh(location)
    case 'warmish':
      return warmish(location)
    case 'hot':
      return hot(location)
    case 'MOLTEN_LAVA':
      return moltenLava(location)
    default:
      return ''
  }
}

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
  return feelsToMessage(getFeels(weather.main.temp), weather.name)
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
