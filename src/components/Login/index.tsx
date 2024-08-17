import React, { useState } from 'react'
import styles from './login.module.css';

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const users = await response.json()

      const user = users.find(
        (user: any) => user.username === username && user.password === password
      )

      if (!user) {
        if (users.find((user: any) => user.username === username)) {
          setError('رمز عبور اشتباه است')
        } else {
          setError('نام کاربری موجود نیست')
        }
      } else {
        localStorage.setItem('user',JSON.stringify(user.userId))
        window.location.href = '/admin'
      }
    } catch (error) {
      setError('خطای شبکه. لطفاً دوباره تلاش کنید.')
    }
  }

  return (
    <div className={styles.container}>
    <h2>ورود</h2>
    <input
      className={styles.input}
      value={username}
      onChange={e => setUsername(e.target.value)}
      placeholder="Username"
    />
    <input
      className={styles.input}
      value={password}
      onChange={e => setPassword(e.target.value)}
      type="password"
      placeholder="Password"
    />
    <button className={styles.button} onClick={handleLogin}>
     ورود
    </button>
    {error && <p className={styles.error}>{error}</p>}
  </div>
  )
}

export default Login
