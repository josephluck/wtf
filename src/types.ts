export type LatLong = [number, number]

export interface Coord {
  lon: number
  lat: number
}

export interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

export interface Main {
  temp: number
  pressure: number
  humidity: number
  temp_min: number
  temp_max: number
}

export interface Wind {
  spped: number
  deg: number
}

export interface Clouds {
  all: number
}

export interface Sys {
  type: number
  id: number
  message: number
  country: string
  sunrise: number
  sunset: number
}

export interface WeatherResponse {
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

export type Feels =
  | 'ice_ice_baby'
  | 'nippy'
  | 'meh'
  | 'warmish'
  | 'hot'
  | 'MOLTEN_LAVA'