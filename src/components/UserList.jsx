import UserCard from './UserCard'
import './UserList.css'

function UserList({ users }) {
  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard user={user} key={user.id} />
      ))}
    </div>
  )
}

export default UserList
