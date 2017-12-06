import * as Types from './types'

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function random<A>(arr: A[]): A {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function kelvinToCelcius(kelvin: number): number {
  return kelvin - 273.15
}

export function kelvinToFeels(kelvin: number): Types.Feels {
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
