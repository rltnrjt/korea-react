import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import useAuthStore from '../store/authStore'

function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const menuClass = (path) =>
    `text-[15px] font-medium no-underline pb-[2px] ${
      location.pathname === path
        ? 'text-[#2563EB] border-b-2 border-[#2563EB]'
        : 'text-[#1A1A1A]'
    }`

  function handleLogout() {
    logout()
    setDropdownOpen(false)
    navigate('/')
  }

  return (
    <header className="flex items-center w-full h-16 px-10 bg-white border-b border-[#E5E7EB]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <nav className="flex items-center gap-8">
        <Link to="/" className="text-[18px] font-bold text-[#1A1A1A] no-underline">MyApp</Link>
        <Link to="/board" className={menuClass('/board')}>게시판</Link>
        <Link to="/member" className={menuClass('/member')}>회원정보</Link>
      </nav>

      <div className="flex-1" />

      {user ? (
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="flex items-center gap-1.5 px-4 py-2 text-[14px] font-medium text-[#1A1A1A] bg-transparent border border-[#E5E7EB] rounded-md cursor-pointer hover:bg-[#F3F4F6]"
          >
            {user.name}
            <span className="text-[10px]">▼</span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-1 w-36 bg-white border border-[#E5E7EB] rounded-md shadow-md z-50">
              <button
                onClick={() => { navigate('/member'); setDropdownOpen(false) }}
                className="w-full text-left px-4 py-2.5 text-[14px] text-[#1A1A1A] hover:bg-[#F3F4F6] bg-transparent border-none cursor-pointer"
              >
                회원정보
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 text-[14px] text-[#1A1A1A] hover:bg-[#F3F4F6] bg-transparent border-none cursor-pointer"
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/login"
          className="flex items-center justify-center px-6 py-2.5 bg-[#2563EB] rounded-md text-[14px] font-medium text-white no-underline"
        >
          로그인
        </Link>
      )}
    </header>
  )
}

export default Header
