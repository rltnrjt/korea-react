import axios from 'axios'

const instance = axios.create()

export function login(userId, passwd) {
  const params = new URLSearchParams()
  params.append('userId', userId)
  params.append('passwd', passwd)
  return instance.post('/api/v1/login', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
}
