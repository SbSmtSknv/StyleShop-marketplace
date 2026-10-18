import './Badge.css'

function Badge({ label, colorScheme = 'green' }) {
  return <span className={`badge badge--${colorScheme}`}>{label}</span>
}

export default Badge
