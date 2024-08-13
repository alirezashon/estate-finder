import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('authToken', data.accessToken)
        alert('ورود با موفقیت انجام شد.')
        navigate('/')
      } else {
        alert('نام کاربری یا رمز عبور اشتباه است.')
      }
    } catch (error) {
      console.error('Error during login:', error)
    }
  }

  return (
    <div>
      <h2>ورود</h2>
      <form onSubmit={handleLogin}>
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
        <button type='submit'>ورود</button>
      </form>
    </div>
  )
}

export default Login
