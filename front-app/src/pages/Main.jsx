import { LayoutList, Users } from 'lucide-react'
import { Link } from 'react-router'

function Main() {
  return (
    <div className="flex flex-col bg-[#F9FAFB] min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>
      <section className="flex flex-col items-center gap-4 pt-20 pb-15">
        <h1 className="text-[40px] font-bold text-[#1A1A1A] text-center">환영합니다</h1>
        <p className="text-[18px] text-[#6B7280] text-center">게시판과 회원정보를 관리할 수 있는 플랫폼입니다</p>
      </section>

      <div className="flex gap-6 px-20 justify-center">
        <Link to="/board" className="flex flex-col gap-4 pt-8 pr-8 pb-10 pl-8 bg-white border border-[#E5E7EB] rounded-xl flex-1 no-underline hover:border-[#2563EB] hover:shadow-sm transition-all">
          <div className="flex items-center justify-center w-12 h-12 bg-[#EFF6FF] rounded-[10px]">
            <LayoutList size={24} color="#2563EB" />
          </div>
          <span className="text-[20px] font-semibold text-[#1A1A1A]">게시판</span>
          <p className="text-[14px] text-[#6B7280] leading-normal">공지사항, 자유게시판 등 다양한 게시판을 관리하세요.</p>
        </Link>

        <Link to="/member" className="flex flex-col gap-4 pt-8 pr-8 pb-10 pl-8 bg-white border border-[#E5E7EB] rounded-xl flex-1 no-underline hover:border-[#2563EB] hover:shadow-sm transition-all">
          <div className="flex items-center justify-center w-12 h-12 bg-[#EFF6FF] rounded-[10px]">
            <Users size={24} color="#2563EB" />
          </div>
          <span className="text-[20px] font-semibold text-[#1A1A1A]">회원정보</span>
          <p className="text-[14px] text-[#6B7280] leading-normal">회원 목록 조회, 정보 수정 및 권한을 관리하세요.</p>
        </Link>
      </div>
    </div>
  )
}

export default Main
