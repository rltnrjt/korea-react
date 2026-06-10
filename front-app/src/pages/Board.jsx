import { useState } from 'react'
import boardData from '../assets/mock/boardData'
import Pagination from './Pagination'

const PAGE_SIZE = 10

function today() {
  return new Date().toISOString().slice(0, 10)
}

function Board() {
  const [list, setList] = useState([...boardData])
  const [currentPage, setCurrentPage] = useState(1)
  const [checkedIds, setCheckedIds] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const sorted = [...list].sort((a, b) => b.id - a.id)
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE)
  const pageData = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const allChecked = pageData.length > 0 && pageData.every((row) => checkedIds.includes(row.id))

  function toggleAll() {
    const pageIds = pageData.map((row) => row.id)
    if (allChecked) {
      setCheckedIds((prev) => prev.filter((id) => !pageIds.includes(id)))
    } else {
      setCheckedIds((prev) => [...new Set([...prev, ...pageIds])])
    }
  }

  function toggleOne(id) {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    )
  }

  function openModal() {
    setTitle('')
    setContent('')
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
  }

  function handleSave() {
    if (!title.trim()) return
    const newId = Math.max(...list.map((r) => r.id)) + 1
    const newItem = { id: newId, title: title.trim(), author: '사용자', views: 0, date: today() }
    setList((prev) => [newItem, ...prev])
    setCurrentPage(1)
    setModalOpen(false)
  }

  return (
    <div className="flex flex-col bg-[#F9FAFB] min-h-screen px-20 py-12" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[28px] font-bold text-[#1A1A1A]">게시판</h1>
        <div className="flex gap-2">
          <button
            onClick={openModal}
            className="px-4 py-2 bg-[#2563EB] text-white text-[14px] font-medium rounded-md cursor-pointer hover:bg-[#1D4ED8]"
          >
            글쓰기
          </button>
          <button className="px-4 py-2 bg-[#EF4444] text-white text-[14px] font-medium rounded-md cursor-pointer hover:bg-[#DC2626]">
            삭제
          </button>
        </div>
      </div>

      <div style={{ minHeight: '495px' }}>
        <div className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <th className="w-10 px-4 py-3 text-left">
                  <input type="checkbox" checked={allChecked} onChange={toggleAll} className="cursor-pointer" />
                </th>
                <th className="w-16 px-4 py-3 text-[13px] font-semibold text-[#6B7280] text-left">번호</th>
                <th className="px-4 py-3 text-[13px] font-semibold text-[#6B7280] text-left">글제목</th>
                <th className="w-28 px-4 py-3 text-[13px] font-semibold text-[#6B7280] text-left">글쓴이</th>
                <th className="w-24 px-4 py-3 text-[13px] font-semibold text-[#6B7280] text-right">조회수</th>
                <th className="w-36 px-4 py-3 text-[13px] font-semibold text-[#6B7280] text-right">작성일자</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((row) => (
                <tr key={row.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={checkedIds.includes(row.id)}
                      onChange={() => toggleOne(row.id)}
                      className="cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#6B7280]">{row.id}</td>
                  <td className="px-4 py-3 text-[14px] text-[#1A1A1A] cursor-pointer hover:underline">{row.title}</td>
                  <td className="px-4 py-3 text-[14px] text-[#374151]">{row.author}</td>
                  <td className="px-4 py-3 text-[14px] text-[#374151] text-right">{row.views}</td>
                  <td className="px-4 py-3 text-[14px] text-[#374151] text-right">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      {/* 글쓰기 모달 */}
      {modalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-[10px] w-140 flex flex-col"
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
              <span className="text-[17px] font-semibold text-[#1A1A1A]">게시글 쓰기</span>
              <button onClick={closeModal} className="text-[#9CA3AF] hover:text-[#374151] cursor-pointer text-[20px] leading-none bg-transparent border-none">
                ✕
              </button>
            </div>

            {/* 모달 바디 */}
            <div className="px-6 py-5 flex flex-col gap-4">
              {/* 제목 */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className="text-[13px] font-medium text-[#374151]">제목</label>
                  <span className="text-[12px] text-[#9CA3AF]">{title.length} / 50</span>
                </div>
                <input
                  type="text"
                  placeholder="제목을 입력하세요"
                  value={title}
                  maxLength={50}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-md text-[14px] text-[#1A1A1A] outline-none placeholder:text-[#9CA3AF] focus:border-[#2563EB]"
                />
              </div>

              {/* 내용 */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className="text-[13px] font-medium text-[#374151]">내용</label>
                  <span className="text-[12px] text-[#9CA3AF]">{content.length} / 800</span>
                </div>
                <textarea
                  placeholder="내용을 입력하세요"
                  value={content}
                  maxLength={800}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-md text-[14px] text-[#1A1A1A] outline-none placeholder:text-[#9CA3AF] focus:border-[#2563EB] resize-none"
                />
              </div>
            </div>

            {/* 모달 푸터 */}
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#E5E7EB]">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-[14px] font-medium text-[#374151] border border-[#E5E7EB] rounded-md cursor-pointer hover:bg-[#F9FAFB] bg-white"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                disabled={!title.trim()}
                className="px-4 py-2 text-[14px] font-medium text-white rounded-md cursor-pointer transition-colors"
                style={{ backgroundColor: title.trim() ? '#2563EB' : '#93C5FD', cursor: title.trim() ? 'pointer' : 'not-allowed' }}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Board
