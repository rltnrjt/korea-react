import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { getBoardDetail, updateBoard, deleteBoards } from '../api/boardApi'
import useAuthStore from '../store/authStore'

function BoardDetail() {
  const { boardId } = useParams()
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const [detail, setDetail] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')

  useEffect(() => {
    getBoardDetail(boardId).then((res) => {
      const data = res.data.data
      setDetail(data)
      setTitle(data.title)
      setContents(data.contents)
    })
  }, [boardId])

  function handleUpdate() {
    updateBoard(boardId, { title, contents }).then(() => {
      setDetail((prev) => ({ ...prev, title, contents }))
      setEditMode(false)
    })
  }

  function handleCancelEdit() {
    setTitle(detail.title)
    setContents(detail.contents)
    setEditMode(false)
  }

  function handleDelete() {
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    deleteBoards([boardId])
      .then(() => navigate('/board'))
      .catch((err) => {
        alert(err.response?.data?.message || '삭제에 실패했습니다.')
      })
  }

  if (!detail) return null

  return (
    <div className="flex flex-col bg-[#F9FAFB] min-h-screen px-20 py-12" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="bg-white rounded-lg border border-[#E5E7EB] p-8 max-w-3xl w-full mx-auto">

        {editMode ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-[22px] font-bold text-[#1A1A1A] border-b border-[#2563EB] outline-none pb-2 mb-4 bg-transparent"
          />
        ) : (
          <h1 className="text-[22px] font-bold text-[#1A1A1A] pb-2 mb-4 border-b border-[#E5E7EB]">{detail.title}</h1>
        )}

        <div className="flex gap-6 text-[13px] text-[#6B7280] mb-6">
          <span>글쓴이: <span className="text-[#374151] font-medium">{detail.writer}</span></span>
          <span>조회수: <span className="text-[#374151] font-medium">{detail.readCount}</span></span>
          <span>등록일: <span className="text-[#374151] font-medium">{detail.createAt?.slice(0, 10)}</span></span>
        </div>

        {editMode ? (
          <textarea
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            rows={12}
            className="w-full px-3 py-2 border border-[#E5E7EB] rounded-md text-[14px] text-[#1A1A1A] outline-none focus:border-[#2563EB] resize-none"
          />
        ) : (
          <div className="text-[14px] text-[#1A1A1A] leading-relaxed min-h-50 whitespace-pre-wrap">{detail.contents}</div>
        )}

        <div className="flex justify-end gap-2 mt-8">
          {editMode ? (
            <>
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 text-[14px] font-medium text-[#374151] border border-[#E5E7EB] rounded-md cursor-pointer hover:bg-[#F9FAFB] bg-white"
              >
                취소
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 text-[14px] font-medium text-white bg-[#16A34A] rounded-md cursor-pointer hover:bg-[#15803D]"
              >
                저장
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/board')}
                className="px-4 py-2 text-[14px] font-medium text-[#374151] border border-[#E5E7EB] rounded-md cursor-pointer hover:bg-[#F9FAFB] bg-white"
              >
                목록
              </button>
              {user && (
                <>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 text-[14px] font-medium text-white bg-[#EF4444] rounded-md cursor-pointer hover:bg-[#DC2626]"
                  >
                    삭제
                  </button>
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-4 py-2 text-[14px] font-medium text-white bg-[#16A34A] rounded-md cursor-pointer hover:bg-[#15803D]"
                  >
                    수정
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default BoardDetail
