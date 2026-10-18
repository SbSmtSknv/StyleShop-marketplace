import './UserProfile.css'

function UserProfile({ user }) {
  return (
    <div className="user-profile">
      <div className="avatar">{user?.avatarUrl ? <img src={user.avatarUrl} alt={user.name} /> : 'IMG'}</div>
      <div>
        <strong>{user?.name}</strong>
        <small>{user?.role}</small>
      </div>
    </div>
  )
}

export default UserProfile
