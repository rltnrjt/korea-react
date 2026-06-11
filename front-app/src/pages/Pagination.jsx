function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-center gap-1 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="w-8 h-8 flex items-center justify-center rounded text-[#6B7280] disabled:opacity-30 hover:bg-[#F3F4F6] cursor-pointer disabled:cursor-default"
      >
        {'<'}
      </button>

      {Array.from({ length: totalPages }, (_, i) => i).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 flex items-center justify-center rounded text-[14px] font-medium cursor-pointer
            ${page === currentPage
              ? 'bg-[#2563EB] text-white'
              : 'text-[#374151] hover:bg-[#F3F4F6]'
            }`}
        >
          {page + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className="w-8 h-8 flex items-center justify-center rounded text-[#6B7280] disabled:opacity-30 hover:bg-[#F3F4F6] cursor-pointer disabled:cursor-default"
      >
        {'>'}
      </button>
    </div>
  )
}

export default Pagination
