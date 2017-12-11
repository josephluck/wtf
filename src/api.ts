import axios from 'axios'
import * as Types from './types'
import * as Utils from './utils'
import * as fs from 'fs'
import * as path from 'path'

const API_BASE = 'http://api.openweathermap.org/data/2.5'
const url = (u: string, k: string) => `${API_BASE}/${u}&APPID=${k}`

export function getLatLong(): Promise<Types.LatLong> {
  return axios.get('http://freegeoip.net/json/').then(response => {
    return [response.data.latitude, response.data.longitude] as Types.LatLong
  })
}

export function storeApiKey(key: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (key) {
      try {
        fs.writeFileSync(path.normalize(`${__dirname}/key.txt`), key)
        const k = fs.readFileSync('./key.txt')
        if (k) {
          resolve(key.toString())
        } else {
          reject(Utils.err({
            code: 400,
            type: 'invalid_key',
          }))
        }
        resolve()
      } catch (e) {
        reject(Utils.err({
          code: 400,
          type: 'invalid_key',
        }))  
      }
    } else {
      reject(Utils.err({
        code: 400,
        type: 'invalid_key',
      }))
    }
  })
}

export function getApiKey(): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const key = fs.readFileSync(`${__dirname}/key.txt`)
      if (key) {
        resolve(key.toString())
      } else {
        reject(Utils.err({
          code: 400,
          type: 'no_api_key'
        }))
      }
    } catch (e) {
      reject(Utils.err({
        code: 400,
        type: 'no_api_key'
      }))
    }
  })
}

export function getWeather(latlong: Types.LatLong): Promise<Types.WeatherResponse> {
  return getApiKey()
    .then(key => {
      return axios
        .get(url(`/weather?lat=${latlong[0]}&lon=${latlong[1]}`, key))
        .then(resp => resp.data)
        .catch(err => {
          return Utils.err({
            code: 400,
            type: 'invalid_key'
          })
        })
    })
}