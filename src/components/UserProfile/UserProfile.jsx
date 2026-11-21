import './UserProfile.css'

function UserProfile({ user }) {
  return (
    <div className="user-profile">
      <div>
        <strong>{user?.name}</strong>
        <small>{user?.role}</small>
      </div>
    </div>
  )
}

export default UserProfile
