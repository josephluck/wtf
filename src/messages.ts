import colors from 'chalk'
import * as dates from 'date-fns'
import * as Types from './types'
import * as utils from './utils'

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
  teeshirt: '👕',
  skiis: '⛷️',
}

export function iceIceBaby(): string {
  return utils.random([
    `Don't even bother heading out today. It's 'effing freezing.`,
    `You ain't no polar bear, bro. Stay indoors.`,
    `Your outies gonna turn in to an innie today...`,
    `Grab your ${emojis.skiis}, you're gonna need 'em`,
  ])
}

export function nippy(): string {
  return utils.random([
    `It's a 'lil nippy today.`,
    `Grab your coat and scarf today.`,
    `It's looking a 'lil brisk today.`,
  ])
}

export function meh(): string {
  return utils.random([
    `Meh. Just meh...`,
    `Okay, I 'spose.`,
    `Neither here nor there today.`,
  ])
}

export function warmish(): string {
  return utils.random([
    `Luke warm today. Hey Luke!`,
    `Probably t-shirt & shorts.`,
    `Get 'dem legs out.`,
  ])
}

export function hot(): string {
  return utils.random([
    `Get your tan on bro.`,
    `Factor 35, yo.`,
    `Get 'dem ${emojis.sunnies} out!`,
  ])
}

export function moltenLava(): string {
  return utils.random([
    `OWCH, MY 'EFFIN EYES ARE MELTING!`,
    `You'll look like a lobster if you head out today.`,
    `GET THAT 'EFFIN AC ON NOW!`,
  ])
}

export function feels(feels: Types.Feels): string {
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

export function highsAndLows(temps: Types.Main): string {
  return `Highs of ${utils.kelvinToCelcius(temps.temp_max)}°C, lows of ${utils.kelvinToCelcius(temps.temp_min)}°C.`
}

export function title () {
  return colors.whiteBright.underline.bold(`What's the forecast?`)
}

export function subheading(location: string) {
  const now = dates.format(new Date(), 'h:ma, dddd do MMMM YYYY')
  return colors.italic.grey(`${location}, ${now}`)
}