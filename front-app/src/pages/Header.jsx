import { Link, useLocation } from 'react-router'

function Header() {
  const location = useLocation()

  const menuClass = (path) =>
    `text-[15px] font-medium no-underline pb-[2px] ${
      location.pathname === path
        ? 'text-[#2563EB] border-b-2 border-[#2563EB]'
        : 'text-[#1A1A1A]'
    }`

  return (
    <header className="flex items-center w-full h-16 px-10 bg-white border-b border-[#E5E7EB]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <nav className="flex items-center gap-8">
        <Link to="/" className="text-[18px] font-bold text-[#1A1A1A] no-underline">MyApp</Link>
        <Link to="/board" className={menuClass('/board')}>게시판</Link>
        <Link to="/member" className={menuClass('/member')}>회원정보</Link>
      </nav>

      <div className="flex-1" />

      <Link
        to="/login"
        className="flex items-center justify-center px-6 py-2.5 bg-[#2563EB] rounded-md text-[14px] font-medium text-white no-underline"
      >
        로그인
      </Link>
    </header>
  )
}

export default Header
