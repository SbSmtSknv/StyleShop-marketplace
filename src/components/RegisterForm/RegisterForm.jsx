import { useState } from 'react'
import './RegisterForm.css'

const INITIAL_FORM = {
  name: '',
  email: '',
  password: '',
  age: '',
  country: '',
  gender: '',
  skills: [],
  about: '',
}

function RegisterForm() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const isFieldValid = (fieldName, value) => {
    if (fieldName === 'name') return value.trim() !== ''
    if (fieldName === 'email') return value.trim() !== ''
    if (fieldName === 'password') return value.length >= 6
    if (fieldName === 'age') return value !== '' && Number(value) >= 18
    if (fieldName === 'country') return value !== ''
    if (fieldName === 'gender') return value !== ''
    if (fieldName === 'skills') return value.length > 0
    return true
  }

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target
    const nextValue = type === 'checkbox'
      ? (checked
        ? [...form.skills, value]
        : form.skills.filter((skill) => skill !== value))
      : value

    setForm((currentForm) => ({
      ...currentForm,
      [name]: nextValue,
    }))

    setErrors((currentErrors) => {
      if (!isFieldValid(name, nextValue)) return currentErrors
      const nextErrors = { ...currentErrors }
      delete nextErrors[name]
      return nextErrors
    })

    setIsSubmitted(false)
  }

  const validateForm = () => {
    const nextErrors = {}

    if (!isFieldValid('name', form.name)) nextErrors.name = 'Введите имя покупателя.'
    if (!isFieldValid('email', form.email)) nextErrors.email = 'Введите email для аккаунта.'
    if (!isFieldValid('password', form.password)) nextErrors.password = 'Пароль должен содержать минимум 6 символов.'
    if (!isFieldValid('age', form.age)) nextErrors.age = 'Возраст должен быть не меньше 18 лет.'
    if (!isFieldValid('country', form.country)) nextErrors.country = 'Выберите страну доставки.'
    if (!isFieldValid('gender', form.gender)) nextErrors.gender = 'Выберите пол.'
    if (!isFieldValid('skills', form.skills)) nextErrors.skills = 'Выберите хотя бы одно предпочтение в стиле.'

    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = validateForm()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      setIsSubmitted(true)
    } else {
      setIsSubmitted(false)
    }
  }

  const handleReset = () => {
    setForm(INITIAL_FORM)
    setErrors({})
    setIsSubmitted(false)
  }

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit} noValidate>
        <div className="register-form__grid">
          <label className="register-form__field">
            <span>Имя покупателя</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Как к вам обращаться?"
            />
            {errors.name && <small className="register-form__error">{errors.name}</small>}
          </label>

          <label className="register-form__field">
            <span>Email для заказов</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
            {errors.email && <small className="register-form__error">{errors.email}</small>}
          </label>

          <label className="register-form__field">
            <span>Пароль</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Минимум 6 символов"
            />
            {errors.password && <small className="register-form__error">{errors.password}</small>}
          </label>

          <label className="register-form__field">
            <span>Возраст</span>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              min="18"
              placeholder="18"
            />
            {errors.age && <small className="register-form__error">{errors.age}</small>}
          </label>
        </div>

        <label className="register-form__field">
          <span>Страна доставки</span>
          <select name="country" value={form.country} onChange={handleChange}>
            <option value="">Выберите страну</option>
            <option value="Казахстан">Казахстан</option>
            <option value="Россия">Россия</option>
            <option value="Кыргызстан">Кыргызстан</option>
            <option value="Узбекистан">Узбекистан</option>
            <option value="Другая страна">Другая страна</option>
          </select>
          {errors.country && <small className="register-form__error">{errors.country}</small>}
        </label>

        <fieldset className="register-form__fieldset">
          <legend>Пол</legend>
          <div className="register-form__options">
            <label>
              <input
                type="radio"
                name="gender"
                value="Мужской"
                checked={form.gender === 'Мужской'}
                onChange={handleChange}
              />
              Мужской
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Женский"
                checked={form.gender === 'Женский'}
                onChange={handleChange}
              />
              Женский
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Другое"
                checked={form.gender === 'Другое'}
                onChange={handleChange}
              />
              Другое
            </label>
          </div>
          {errors.gender && <small className="register-form__error">{errors.gender}</small>}
        </fieldset>

        <fieldset className="register-form__fieldset">
          <legend>Предпочтения в стиле</legend>
          <div className="register-form__options">
            {['Базовый гардероб', 'Уличный стиль', 'Офис / Smart Casual', 'Спорт и актив'].map((skill) => (
              <label key={skill}>
                <input
                  type="checkbox"
                  name="skills"
                  value={skill}
                  checked={form.skills.includes(skill)}
                  onChange={handleChange}
                />
                {skill}
              </label>
            ))}
          </div>
          {errors.skills && <small className="register-form__error">{errors.skills}</small>}
        </fieldset>

        <label className="register-form__field">
        <span>О себе / любимые образы</span>
          <textarea
            name="about"
            value={form.about}
            onChange={handleChange}
            rows="5"
            placeholder="Расскажите о стиле, который вам нравится"
          />
        </label>

        <div className="register-form__actions">
          <button className="register-form__submit" type="submit">Зарегистрироваться</button>
          <button className="register-form__reset" type="button" onClick={handleReset}>Сбросить</button>
        </div>
      </form>

      {isSubmitted && (
        <div className="register-form__success" role="status">
          <strong>Форма успешно отправлена</strong>

          <div className="register-form__data">
            <h3>Данные пользователя</h3>
            <dl>
              <div><dt>Имя покупателя</dt><dd>{form.name}</dd></div>
              <div><dt>Email</dt><dd>{form.email}</dd></div>
              <div><dt>Возраст</dt><dd>{form.age}</dd></div>
              <div><dt>Страна доставки</dt><dd>{form.country}</dd></div>
              <div><dt>Пол</dt><dd>{form.gender}</dd></div>
              <div><dt>Предпочтения</dt><dd>{form.skills.join(', ')}</dd></div>
              {form.about && <div><dt>Любимые образы</dt><dd>{form.about}</dd></div>}
            </dl>
          </div>

          <button className="register-form__reset" type="button" onClick={handleReset}>
            Очистить форму
          </button>
        </div>
      )}
    </div>
  )
}

export default RegisterForm
