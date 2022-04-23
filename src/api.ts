import axios from 'axios'

import { lunchMoneyToken, lunchMoneyUrl } from './env'

export const CATEGORIES = '/categories'

const api = axios.create({
  baseURL: lunchMoneyUrl,
  headers: {
    Authorization: `Bearer ${lunchMoneyToken}`
  }
})

export default api
