import { useMemo, useState } from 'react'
import useFetch from '../hooks/useFetch'
import useDebounce from '../hooks/useDebounce'
import UserList from '../components/UserList'
import './UsersPage.css'

function UsersPage() {
  const { data, loading, error, refetch } = useFetch('https://jsonplaceholder.typicode.com/users')
  const [search, setSearch] = useState('')
  const [company, setCompany] = useState('All')
  const debouncedSearch = useDebounce(search, 500)

  const users = useMemo(() => (Array.isArray(data) ? data : []), [data])

  const companies = useMemo(() => (
    ['All', ...new Set(users.map((user) => user.company?.name).filter(Boolean))]
  ), [users])

  const filteredUsers = useMemo(() => (
    users.filter((user) => {
      const matchesSearch = user.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      const matchesCompany = company === 'All' || user.company?.name === company
      return matchesSearch && matchesCompany
    })
  ), [company, debouncedSearch, users])

  const clearSearch = () => {
    setSearch('')
    setCompany('All')
  }

  return (
    <section className="users-page">
      <header className="users-page__header">
        <p className="users-page__eyebrow">STYLESHOP COMMUNITY</p>
        <h1>Пользователи / Покупатели</h1>
        <p>Каталог зарегистрированных пользователей интернет-магазина.</p>
      </header>

      {loading && (
        <div className="users-page__state" role="status">Загрузка...</div>
      )}

      {!loading && error && (
        <div className="users-page__state users-page__state--error" role="alert">
          <strong>Не удалось загрузить покупателей</strong>
          <p>{error}</p>
          <button type="button" onClick={refetch}>Повторить запрос</button>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="users-toolbar">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Поиск по имени"
              aria-label="Поиск пользователей по имени"
            />
            <select
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              aria-label="Фильтр по компании"
            >
              {companies.map((item) => (
                <option value={item} key={item}>
                  {item === 'All' ? 'Все компании' : item}
                </option>
              ))}
            </select>
            <button type="button" onClick={clearSearch}>Очистить поиск</button>
            <button type="button" onClick={refetch}>Повторить запрос</button>
          </div>

          {filteredUsers.length > 0
            ? <UserList users={filteredUsers} />
            : (
              <div className="users-page__empty">
                Пользователи не найдены
              </div>
            )}
        </>
      )}
    </section>
  )
}

export default UsersPage
