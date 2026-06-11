import { createBrowserRouter, Outlet } from 'react-router'
import Header from '../pages/Header'
import Main from '../pages/Main'
import Board from '../pages/Board'
import BoardDetail from '../pages/BoardDetail'
import Member from '../pages/Member'
import Login from '../pages/Login'
import Signup from '../pages/Signup'

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Main /> },
      { path: 'board', element: <Board /> },
      { path: 'board/:boardId', element: <BoardDetail /> },
      { path: 'member', element: <Member /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
])

export default router
