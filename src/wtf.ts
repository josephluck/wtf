#! /usr/bin/env node

import * as spin from 'ora'
import * as Types from './types'
import * as api from './api'
import * as messages from './messages'
import * as utils from './utils'

function currentWeather(wttr: Types.WeatherResponse) {
  const weather = [
    `${utils.capitalizeFirstLetter(wttr.weather[0].description)}.`,
    messages.feels(utils.kelvinToFeels(wttr.main.temp)),
    messages.highsAndLows(wttr.main),
  ].join(' ')
  const now = messages.subheading(wttr.name)
  console.log(messages.title())
  console.log(now)
  console.log(weather)
}

async function go() {
  const spinner = spin()
  spinner.start('WTF is taking so long?!')
  return api.getWeather(await api.getLatLong())
    .then(weather => {
      spinner.stop()
      currentWeather(weather)
    })
    .catch(spinner.stop)
}

go()
