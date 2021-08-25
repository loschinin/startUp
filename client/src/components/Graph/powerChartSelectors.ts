import { selector } from 'recoil'
import { Types } from './types'
import { BASE_URL } from '../../constants'

export const getPowerChartData = selector({
  key: 'getPowerChartData',
  get: () => {
    return getDataFromAPI()
  },
})
const getDataFromAPI = () =>
  new Promise((resolve) =>
    fetch(`${BASE_URL}power_network.json`).then((response) => {
      if (response.status !== 200) {
        // eslint-disable-next-line no-console
        console.log(`Houston, we have a problem! ${response.status}`)
        return
      }
      response.json().then((data) => {
        const d = data.results[0] as Types.DataObject
        resolve(d)
      })
    })
  )
