import React, { useState } from 'react'
import styles from './register.module.css'

const generateUserId = () => {
  return Math.random().toString(36).substr(2, 9)
}

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/users')
      const users = await response.json()

      if (users.some((user: any) => user.username === username)) {
        setError('نام کاربری قبلاً ثبت شده است')
        return
      }

      const newUser = {
        userId: generateUserId(),
        username,
        password,
      }

      const postResponse = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })

      if (!postResponse.ok) {
        throw new Error('Error registering user')
      }

      window.location.href = '/login'
    } catch (err) {
      setError('خطا در ثبت نام')
    }
  }

  return (
    <div className={styles.container}>
      <h2>ثبت نام</h2>
      <input
        className={styles.input}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder='Username'
      />
      <input
        className={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type='password'
        placeholder='Password'
      />
      <button className={styles.button} onClick={handleRegister}>
        ثبت نام{' '}
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}

export default Register
