import { useState } from 'react'
import { useNavigate } from 'react-router'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [keepLogin, setKeepLogin] = useState(false)
  const [ipSecurity, setIpSecurity] = useState(true)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  const isActive = email.length > 0 && password.length > 0

  function handleLogin() {
    if (!isActive) return
    navigate('/')
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-white pt-15" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="w-125">

        <h1
          className="text-center font-black mb-6"
          style={{ fontSize: '52px', color: '#03C75A', letterSpacing: '-2px' }}
        >
          로그인
        </h1>

        <div className="px-6">
          {/* 아이디 필드 */}
          <div
            className="px-4 py-3 bg-white"
            style={{
              borderRadius: '4px 4px 0 0',
              border: `2px solid ${emailFocused ? '#03C75A' : '#DADDE0'}`,
            }}
          >
            <input
              type="text"
              placeholder="아이디 또는 전화번호"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              className="w-full text-[14px] text-[#1E1E1E] outline-none bg-transparent placeholder:text-[#999999]"
            />
          </div>

          {/* 비밀번호 필드 */}
          <div
            className="px-4 py-4 bg-white"
            style={{
              borderRadius: '0 0 4px 4px',
              borderLeft: `1px solid ${passwordFocused ? '#03C75A' : '#DADDE0'}`,
              borderRight: `1px solid ${passwordFocused ? '#03C75A' : '#DADDE0'}`,
              borderBottom: `1px solid ${passwordFocused ? '#03C75A' : '#DADDE0'}`,
            }}
          >
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              className="w-full text-[14px] text-[#1E1E1E] outline-none bg-transparent placeholder:text-[#999999]"
            />
          </div>

          {/* 옵션 행 */}
          <div className="flex items-center justify-between py-4">
            {/* 로그인 상태 유지 */}
            <button
              onClick={() => setKeepLogin((v) => !v)}
              className="flex items-center gap-1.5 cursor-pointer bg-transparent border-none p-0"
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{
                  border: `1.5px solid ${keepLogin ? '#03C75A' : '#DADDE0'}`,
                  backgroundColor: keepLogin ? '#03C75A' : 'transparent',
                }}
              >
                {keepLogin && <span className="text-white text-[11px] leading-none">✓</span>}
              </div>
              <span className="text-[13px] text-[#1E1E1E]">로그인 상태 유지</span>
            </button>

            {/* IP 보안 토글 */}
            <button
              onClick={() => setIpSecurity((v) => !v)}
              className="flex items-center gap-1.5 cursor-pointer bg-transparent border-none p-0"
            >
              <span className="text-[13px] font-medium text-[#1E1E1E]">IP보안</span>
              <div
                className="relative flex items-center"
                style={{
                  width: '40px', height: '22px', borderRadius: '11px',
                  backgroundColor: ipSecurity ? '#03C75A' : '#C6C6C6',
                  padding: '2px',
                  transition: 'background-color 0.2s',
                }}
              >
                <div
                  className="w-4.5 h-4.5 rounded-full bg-white"
                  style={{
                    marginLeft: ipSecurity ? 'auto' : '0',
                    transition: 'margin 0.2s',
                  }}
                />
              </div>
              <span
                className="text-[11px] font-bold"
                style={{ color: ipSecurity ? '#03C75A' : '#999999' }}
              >
                {ipSecurity ? 'ON' : 'OFF'}
              </span>
            </button>
          </div>
        </div>

        {/* 로그인 버튼 */}
        <div className="px-6">
          <button
            onClick={handleLogin}
            className="w-full h-13 rounded-sm text-[17px] font-bold text-white transition-colors"
            style={{
              backgroundColor: isActive ? '#03C75A' : '#C6C6C6',
              cursor: isActive ? 'pointer' : 'not-allowed',
            }}
          >
            로그인
          </button>
        </div>

        {/* 하단 링크 */}
        <div className="flex items-center justify-center gap-3 py-5 px-6">
          <button className="text-[13px] text-[#999999] bg-transparent border-none cursor-pointer hover:text-[#03C75A]">
            비밀번호 찾기
          </button>
          <div className="w-px h-3 bg-[#DADDE0]" />
          <button className="text-[13px] text-[#999999] bg-transparent border-none cursor-pointer hover:text-[#03C75A]">
            아이디 찾기
          </button>
          <div className="w-px h-3 bg-[#DADDE0]" />
          <button onClick={() => navigate('/signup')} className="text-[13px] text-[#999999] bg-transparent border-none cursor-pointer hover:text-[#03C75A]">
            회원가입
          </button>
        </div>

      </div>
    </div>
  )
}

export default Login
