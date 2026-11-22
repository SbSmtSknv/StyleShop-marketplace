import { Link } from 'react-router-dom'
import './UserCard.css'

function UserCard({ user }) {
  return (
    <article className="user-card">
      <div className="user-card__avatar" aria-hidden="true">
        {user.name.charAt(0).toUpperCase()}
      </div>
      <div className="user-card__content">
        <h3>{user.name}</h3>
        <p><span>@{user.username}</span></p>
        <dl>
          <div><dt>Email</dt><dd>{user.email}</dd></div>
          <div><dt>Телефон</dt><dd>{user.phone}</dd></div>
          <div><dt>Компания</dt><dd>{user.company?.name}</dd></div>
        </dl>
        <Link className="user-card__link" to={`/users/${user.id}`}>
          Открыть профиль
        </Link>
      </div>
    </article>
  )
}

export default UserCard
