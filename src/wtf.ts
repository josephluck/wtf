#! /usr/bin/env node

import * as spin from 'ora'
import * as Types from './types'
import * as api from './api'
import * as messages from './messages'
import * as utils from './utils'
import { argv } from 'yargs'

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

function handleError(e: Types.WtfErr) {
  if (e.type === 'no_api_key') {
    console.error('No API key stored. Grab one from http://openweathermap.org/appid and enter it using "wtf --key my-api-key"')
  } else {
    console.error(`WTF! Something went wrong`)
  }
}

async function go() {
  const spinner = spin()
  if (argv.key) {
    await api.storeApiKey(argv.key).catch(err => {
      spinner.stop()
      handleError(err)
    })
  }
  spinner.start('WTF is taking so long?!')
  return api.getWeather(await api.getLatLong())
    .then(weather => {
      spinner.stop()
      currentWeather(weather)
    })
    .catch(err => {
      spinner.stop()
      handleError(err)
    })
}

go()
