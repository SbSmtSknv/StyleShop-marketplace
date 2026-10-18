import './Container.css'

function Container({ children, maxWidth = 1180 }) {
  return <div className="container" style={{ maxWidth }}>{children}</div>
}

export default Container
