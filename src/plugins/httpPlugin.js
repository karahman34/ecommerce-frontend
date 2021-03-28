import Axios from 'axios'

const baseURL = 'http://localhost:8000'
const apiBaseURL = `${baseURL}/api`

// Create new axios instance.
const http = Axios.create({
  baseURL: apiBaseURL,
  withCredentials: true
})

// Create new axios base url instance.
export const httpBase = Axios.create({
  baseURL,
  withCredentials: true
})

export default http
