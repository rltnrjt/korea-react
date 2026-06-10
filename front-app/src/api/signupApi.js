import axios from 'axios'

const instance = axios.create()

export function checkUserId(userId) {
  return instance.get('/api/v1/users/check-id', { params: { userId } })
}

export function signup(data) {
  return instance.post('/api/v1/users/signup', data)
}
