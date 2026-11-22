import { Link, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import './UserDetailsPage.css'

function UserDetailsPage() {
  const { id } = useParams()
  const userRequest = useFetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  const postsRequest = useFetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)

  return (
    <section className="user-details-page">
      <Link className="user-details-page__back" to="/users">← Назад к покупателям</Link>

      {userRequest.loading && (
        <div className="user-details-page__state" role="status">Загрузка...</div>
      )}

      {!userRequest.loading && userRequest.error && (
        <div className="user-details-page__state user-details-page__state--error" role="alert">
          <strong>Не удалось загрузить профиль</strong>
          <p>{userRequest.error}</p>
          <button type="button" onClick={userRequest.refetch}>Повторить запрос</button>
        </div>
      )}

      {!userRequest.loading && !userRequest.error && userRequest.data && (
        <>
          <article className="user-profile-card">
            <div className="user-profile-card__avatar">
              {userRequest.data.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="user-profile-card__eyebrow">ПРОФИЛЬ ПОКУПАТЕЛЯ</p>
              <h1>{userRequest.data.name}</h1>
              <p>@{userRequest.data.username}</p>
            </div>
            <dl>
              <div><dt>Email</dt><dd>{userRequest.data.email}</dd></div>
              <div><dt>Телефон</dt><dd>{userRequest.data.phone}</dd></div>
              <div><dt>Компания</dt><dd>{userRequest.data.company?.name}</dd></div>
              <div><dt>Веб-сайт</dt><dd>{userRequest.data.website}</dd></div>
              <div><dt>Адрес</dt><dd>{userRequest.data.address?.city}, {userRequest.data.address?.street}</dd></div>
            </dl>
          </article>

          <section className="user-posts">
            <h2>Посты покупателя</h2>
            {postsRequest.loading && <p role="status">Загрузка постов...</p>}
            {!postsRequest.loading && postsRequest.error && (
              <div className="user-details-page__state user-details-page__state--error" role="alert">
                <p>{postsRequest.error}</p>
                <button type="button" onClick={postsRequest.refetch}>Повторить запрос постов</button>
              </div>
            )}
            {!postsRequest.loading && !postsRequest.error && Array.isArray(postsRequest.data) && (
              postsRequest.data.length > 0
                ? (
                  <div className="user-posts__grid">
                    {postsRequest.data.map((post) => (
                      <article className="user-post" key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                      </article>
                    ))}
                  </div>
                )
                : <p>Посты не найдены.</p>
            )}
          </section>
        </>
      )}
    </section>
  )
}

export default UserDetailsPage
