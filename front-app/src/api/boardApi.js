import axios from 'axios'
import useAuthStore from '../store/authStore'

const instance = axios.create()

instance.interceptors.request.use((config) => {
  const user = useAuthStore.getState().user
  if (user?.accessToken) {
    config.headers.Authorization = `${user.tokenType} ${user.accessToken}`
  }
  return config
})

export function getBoardList(page = 0, size = 10) {
  return instance.get('/api/v1/boards', { params: { page, size } })
}

export function getBoardDetail(boardId) {
  return instance.get(`/api/v1/boards/${boardId}`)
}

export function createBoard(data) {
  return instance.post('/api/v1/boards', data)
}

export function updateBoard(boardId, data) {
  return instance.patch(`/api/v1/boards/${boardId}`, data)
}

export function deleteBoards(boardIds) {
  return instance.delete('/api/v1/boards', { params: { boardIds: boardIds.join(',') } })
}
