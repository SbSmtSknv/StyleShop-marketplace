import './AuthForm.css'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

function AuthForm({ onClose }) {
  const { login } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    login({
      name: name.trim() || email.split('@')[0],
      avatarUrl: '',
      role: 'Покупатель',
      email: email.trim(),
    })
    onClose()
  }

  return (
    <div className="auth-panel" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <div className="auth-panel__header">
        <h2 id="auth-title">Вход в аккаунт</h2>
        <button className="auth-panel__close" type="button" onClick={onClose} aria-label="Закрыть форму входа">×</button>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>Имя<input type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Ваше имя" /></label>
        <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required /></label>
        <label>Пароль<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Введите пароль" minLength={4} required /></label>
        <button className="auth-form__submit" type="submit">Войти</button>
      </form>
    </div>
  )
}

export default AuthForm
