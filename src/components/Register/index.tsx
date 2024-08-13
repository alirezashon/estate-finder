import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        alert('ثبت‌نام با موفقیت انجام شد.')
        navigate('/login')
      } else {
        alert('خطایی رخ داد. لطفاً دوباره تلاش کنید.')
      }
    } catch (error) {
      console.error('Error during registration:', error)
    }
  }

  return (
    <div>
      <h2>ثبت‌نام</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>نام کاربری</label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>رمز عبور</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>ثبت‌نام</button>
      </form>
    </div>
  )
}

export default Register
