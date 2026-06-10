import { useState } from 'react'
import { useNavigate } from 'react-router'
import DaumPostcodeEmbed from 'react-daum-postcode'
import { checkUserId, signup } from '../api/signupApi'

const PRIMARY = '#5B3FD9'
const BG_PAGE = '#F5F0FF'
const BG_WHITE = '#FFFFFF'
const BG_INPUT = '#F0EBFF'
const BORDER_INPUT = '#D8D0F0'
const TEXT_PRIMARY = '#1A1A2E'
const TEXT_SECONDARY = '#6B7280'
const TEXT_WHITE = '#FFFFFF'
const LINK_COLOR = '#7C5CFC'
const ERROR_COLOR = '#E53E3E'
const SUCCESS_COLOR = '#38A169'
const FONT = 'Noto Sans KR, sans-serif'

const inputStyle = {
  backgroundColor: BG_INPUT,
  borderRadius: '8px',
  height: '46px',
  padding: '0 16px',
  border: 'none',
  width: '100%',
  fontSize: '14px',
  color: TEXT_PRIMARY,
  outline: 'none',
  fontFamily: FONT,
  boxSizing: 'border-box',
}

const selectStyle = {
  backgroundColor: BG_INPUT,
  borderRadius: '8px',
  height: '46px',
  padding: '0 12px',
  border: 'none',
  fontSize: '14px',
  color: TEXT_PRIMARY,
  outline: 'none',
  fontFamily: FONT,
  cursor: 'pointer',
}

const labelStyle = {
  fontSize: '14px',
  fontWeight: '500',
  color: TEXT_PRIMARY,
  fontFamily: FONT,
}

const btnPrimary = {
  backgroundColor: PRIMARY,
  color: TEXT_WHITE,
  borderRadius: '8px',
  height: '46px',
  padding: '0 20px',
  border: 'none',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  fontFamily: FONT,
}

const errorStyle = {
  fontSize: '12px',
  color: ERROR_COLOR,
  fontFamily: FONT,
  marginTop: '4px',
}

const years = Array.from({ length: 100 }, (_, i) => 2024 - i)
const months = Array.from({ length: 12 }, (_, i) => i + 1)
const days = Array.from({ length: 31 }, (_, i) => i + 1)

function FieldGroup({ label, children, error }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={labelStyle}>{label}</label>
      {children}
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  )
}

function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    id: '',
    email: '',
    name: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    gender: '남성',
    password: '',
    passwordConfirm: '',
    phonePrefix: '010',
    phone: '',
    address: '',
    postalCode: '',
    addressDetail: '',
  })
  const [errors, setErrors] = useState({})
  const [showPostcode, setShowPostcode] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [idChecked, setIdChecked] = useState(false)
  const [idCheckMessage, setIdCheckMessage] = useState(null)

  function handleChange(field, value) {
    if (field === 'id') {
      setIdChecked(false)
      setIdCheckMessage(null)
    }
    setForm((prev) => ({ ...prev, [field]: value }))
    if (submitted) validate({ ...form, [field]: value }, field === 'id' ? false : idChecked)
  }

  function validate(data = form, checkedId = idChecked) {
    const errs = {}
    if (!data.id) errs.id = '아이디를 입력하세요.'
    else if (!checkedId) errs.id = '아이디 중복확인을 해주세요.'
    if (!data.email) errs.email = '이메일을 입력하세요.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = '올바른 이메일 형식이 아닙니다.'
    if (!data.name) errs.name = '이름을 입력하세요.'
    if (!data.birthYear || !data.birthMonth || !data.birthDay) errs.birth = '생년월일을 선택하세요.'
    if (!data.password) errs.password = '패스워드를 입력하세요.'
    else if (data.password.length < 8) errs.password = '패스워드는 8자 이상이어야 합니다.'
    if (!data.passwordConfirm) errs.passwordConfirm = '패스워드 확인을 입력하세요.'
    else if (data.password !== data.passwordConfirm) errs.passwordConfirm = '패스워드가 일치하지 않습니다.'
    if (!data.phone) errs.phone = '핸드폰 번호를 입력하세요.'
    if (!data.address) errs.address = '주소를 입력하세요.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleCheckId() {
    if (!form.id) {
      setErrors((prev) => ({ ...prev, id: '아이디를 입력하세요.' }))
      return
    }
    try {
      const res = await checkUserId(form.id)
      if (res.data.available) {
        setIdChecked(true)
        setIdCheckMessage({ text: '사용 가능한 아이디입니다.', color: SUCCESS_COLOR })
        setErrors((prev) => ({ ...prev, id: null }))
      } else {
        setIdChecked(false)
        setIdCheckMessage({ text: '이미 사용 중인 아이디입니다.', color: ERROR_COLOR })
      }
    } catch {
      setIdChecked(false)
      setIdCheckMessage({ text: '중복확인 중 오류가 발생했습니다.', color: ERROR_COLOR })
    }
  }

  const passwordMatchMessage = () => {
    if (!form.passwordConfirm) return null
    if (form.password === form.passwordConfirm) return { text: '패스워드가 일치합니다.', color: SUCCESS_COLOR }
    return { text: '패스워드가 일치하지 않습니다.', color: ERROR_COLOR }
  }

  function handleAddressComplete(data) {
    setForm((prev) => ({ ...prev, address: data.address, postalCode: data.zonecode }))
    setShowPostcode(false)
    if (submitted) setErrors((prev) => ({ ...prev, address: null }))
  }

  async function handleSubmit() {
    setSubmitted(true)
    if (!idChecked) {
      alert('아이디 중복확인을 해주세요.')
      return
    }
    if (!validate()) return

    const birthDate = `${form.birthYear}-${String(form.birthMonth).padStart(2, '0')}-${String(form.birthDay).padStart(2, '0')}`
    const phone = `${form.phonePrefix}-${form.phone}`

    try {
      await signup({
        userId: form.id,
        email: form.email,
        passwd: form.password,
        name: form.name,
        gender: form.gender === '남성' ? '남자' : '여자',
        birthDate,
        phone,
        postalCode: form.postalCode,
        address: form.address,
        addressDetail: form.addressDetail,
      })
      alert('회원가입이 완료되었습니다.')
      navigate('/login')
    } catch (e) {
      const msg = e.response?.data?.message || '회원가입에 실패했습니다. 다시 시도해주세요.'
      alert(msg)
    }
  }

  function genderBtn(value, radius) {
    const selected = form.gender === value
    return {
      flex: 1,
      height: '46px',
      borderRadius: radius,
      border: selected ? 'none' : `1px solid ${BORDER_INPUT}`,
      backgroundColor: selected ? PRIMARY : BG_WHITE,
      color: selected ? TEXT_WHITE : TEXT_PRIMARY,
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      fontFamily: FONT,
    }
  }

  const pwMatch = passwordMatchMessage()

  return (
    <div style={{ backgroundColor: BG_PAGE, minHeight: '100vh', padding: '48px 0', fontFamily: FONT }}>
      <div style={{ maxWidth: '520px', margin: '0 auto', backgroundColor: BG_WHITE, borderRadius: '12px', padding: '48px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

        <h1 style={{ fontSize: '24px', fontWeight: '700', color: TEXT_PRIMARY, margin: 0, fontFamily: FONT }}>회원가입</h1>

        {/* 아이디 */}
        <FieldGroup label="아이디" error={errors.id}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="아이디를 입력하세요"
              value={form.id}
              onChange={(e) => handleChange('id', e.target.value)}
              style={inputStyle}
            />
            <button style={btnPrimary} onClick={handleCheckId}>중복확인</button>
          </div>
          {idCheckMessage && (
            <p style={{ fontSize: '12px', color: idCheckMessage.color, fontFamily: FONT, marginTop: '4px' }}>
              {idCheckMessage.text}
            </p>
          )}
        </FieldGroup>

        {/* 이메일 */}
        <FieldGroup label="이메일" error={errors.email}>
          <input
            type="email"
            placeholder="이메일을 입력하세요"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            style={inputStyle}
          />
        </FieldGroup>

        {/* 이름 */}
        <FieldGroup label="이름" error={errors.name}>
          <input
            type="text"
            placeholder="이름을 입력하세요"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            style={inputStyle}
          />
        </FieldGroup>

        {/* 생년월일 */}
        <FieldGroup label="생년월일" error={errors.birth}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <select value={form.birthYear} onChange={(e) => handleChange('birthYear', e.target.value)} style={{ ...selectStyle, width: '80px' }}>
              <option value="">년</option>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            <select value={form.birthMonth} onChange={(e) => handleChange('birthMonth', e.target.value)} style={{ ...selectStyle, width: '72px' }}>
              <option value="">월</option>
              {months.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <select value={form.birthDay} onChange={(e) => handleChange('birthDay', e.target.value)} style={{ ...selectStyle, width: '72px' }}>
              <option value="">일</option>
              {days.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </FieldGroup>

        {/* 성별 */}
        <FieldGroup label="성별">
          <div style={{ display: 'flex' }}>
            <button onClick={() => handleChange('gender', '남성')} style={genderBtn('남성', '8px 0 0 8px')}>남성</button>
            <button onClick={() => handleChange('gender', '여성')} style={genderBtn('여성', '0 8px 8px 0')}>여성</button>
          </div>
        </FieldGroup>

        {/* 패스워드 */}
        <FieldGroup label="패스워드" error={errors.password}>
          <input
            type="password"
            placeholder="8자 이상 입력"
            value={form.password}
            onChange={(e) => handleChange('password', e.target.value)}
            style={inputStyle}
          />
        </FieldGroup>

        {/* 패스워드 확인 */}
        <FieldGroup label="패스워드 확인">
          <input
            type="password"
            placeholder="패스워드를 다시 입력하세요"
            value={form.passwordConfirm}
            onChange={(e) => handleChange('passwordConfirm', e.target.value)}
            style={inputStyle}
          />
          {pwMatch && (
            <p style={{ fontSize: '12px', color: pwMatch.color, fontFamily: FONT, marginTop: '4px' }}>
              {pwMatch.text}
            </p>
          )}
        </FieldGroup>

        {/* 핸드폰 번호 */}
        <FieldGroup label="핸드폰 번호" error={errors.phone}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <select value={form.phonePrefix} onChange={(e) => handleChange('phonePrefix', e.target.value)} style={selectStyle}>
              <option value="010">010</option>
              <option value="011">011</option>
              <option value="016">016</option>
              <option value="017">017</option>
              <option value="019">019</option>
            </select>
            <input
              type="text"
              placeholder="번호를 입력하세요"
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              style={inputStyle}
            />
          </div>
        </FieldGroup>

        {/* 주소 */}
        <FieldGroup label="주소" error={errors.address}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="우편번호"
              value={form.postalCode}
              readOnly
              style={{ ...inputStyle, width: '140px', flexShrink: 0 }}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="주소 검색 후 입력"
              value={form.address}
              readOnly
              style={inputStyle}
            />
            <button style={btnPrimary} onClick={() => setShowPostcode((v) => !v)}>주소 찾기</button>
          </div>
          {showPostcode && (
            <div style={{ border: `1px solid ${BORDER_INPUT}`, borderRadius: '8px', overflow: 'hidden', marginTop: '8px' }}>
              <DaumPostcodeEmbed onComplete={handleAddressComplete} />
            </div>
          )}
        </FieldGroup>

        {/* 상세주소 */}
        <FieldGroup label="상세주소">
          <input
            type="text"
            placeholder="상세주소를 입력하세요"
            value={form.addressDetail}
            onChange={(e) => handleChange('addressDetail', e.target.value)}
            style={inputStyle}
          />
        </FieldGroup>

        {/* 회원가입 버튼 */}
        <button
          onClick={handleSubmit}
          style={{ backgroundColor: PRIMARY, color: TEXT_WHITE, borderRadius: '8px', height: '52px', border: 'none', fontSize: '16px', fontWeight: '700', cursor: 'pointer', fontFamily: FONT }}
        >
          회원가입
        </button>

        {/* 로그인 링크 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
          <span style={{ fontSize: '13px', color: TEXT_SECONDARY, fontFamily: FONT }}>이미 계정이 있으신가요?</span>
          <button
            onClick={() => navigate('/login')}
            style={{ fontSize: '13px', fontWeight: '600', color: LINK_COLOR, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: FONT }}
          >
            로그인
          </button>
        </div>

      </div>
    </div>
  )
}

export default Signup
