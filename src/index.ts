import axios from 'axios'
import * as spin from 'ora'
import colors from 'chalk'
import * as dates from 'date-fns'

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

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

function random<A>(arr: A[]): A {
  return arr[Math.floor(Math.random() * arr.length)]
}

function iceIceBaby(): string {
  return random([
    `Don't even bother heading out today. It's 'effing freezing.`,
    `You ain't no polar bear, bro. Stay indoors, stay safe.`,
    `Your outies gonna turn in to an innie today...`,
  ])
}

function nippy(): string {
  return random([
    `It's a 'lil nippy today.`,
    `Grab your coat and scarf today.`,
    `It's looking a 'lil brisk today.`,
  ])
}

function meh(): string {
  return random([
    `Meh. Just meh...`,
    `Okay, I 'spose.`,
    `Neither here nor there today.`,
  ])
}

function warmish(): string {
  return random([
    `Luke warm today. Hey Luke!`,
    `Probably t-shirt & shorts.`,
    `Get 'dem legs out.`,
  ])
}

function hot(): string {
  return random([
    `Get your tan on bro.`,
    `Factor 35, yo.`,
    `Get 'dem sunnies out! ${emojis.sunnies}`,
  ])
}

function moltenLava(): string {
  return random([
    `OWCH, MY 'EFFIN EYES ARE MELTING!`,
    `You'll look like a lobster if you head out today.`,
    `GET THAT 'EFFIN AC ON NOW!`,
  ])
}

function feelsToMessage(feels: Feels): string {
  switch (feels) {
    case 'ice_ice_baby':
      return iceIceBaby()
    case 'nippy':
      return nippy()
    case 'meh':
      return meh()
    case 'warmish':
      return warmish()
    case 'hot':
      return hot()
    case 'MOLTEN_LAVA':
      return moltenLava()
    default:
      return ''
  }
}

function highsAndLowsMessage(temps: WeatherResponse['main']): string {
  return `Highs of ${kelvinToCelcius(temps.temp_max)}°C, lows of ${kelvinToCelcius(temps.temp_min)}°C.`
}

const title = colors.whiteBright.underline.bold(`What's the forecast?`)

function subheading(location: string) {
  const now = dates.format(new Date(), 'h:ma, dddd do MMMM YYYY')
  return colors.italic.grey(`${location}, ${now}`)
}

function getWeather(latlong: LatLong): Promise<WeatherResponse> {
  return axios
    .get(url(`?lat=${latlong[0]}&lon=${latlong[1]}`))
    .then(resp => resp.data)
    .catch(console.error)
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

function logWeatherMessage(wttr: WeatherResponse) {
  const weather = [
    `${capitalizeFirstLetter(wttr.weather[0].description)}.`,
    feelsToMessage(getFeels(wttr.main.temp)),
    highsAndLowsMessage(wttr.main),
  ].join(' ')
  const now = subheading(wttr.name)
  console.log(title)
  console.log(now)
  console.log(weather)
}

async function go() {
  const spinner = spin()
  spinner.start('WTF is taking so long?!')
  return getWeather(await getLocation())
    .then(weather => {
      spinner.stop()
      logWeatherMessage(weather)
    })
    .catch(spinner.stop)
}

go()
