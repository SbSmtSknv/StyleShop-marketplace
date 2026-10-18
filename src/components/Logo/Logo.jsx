import './Logo.css'

function Logo({ src, altText, width = 48, height = 48 }) {
  return (
    <div className="logo" style={{ width, height }} aria-label={altText}>
      {src ? <img src={src} alt={altText} /> : 'LOGO'}
    </div>
  )
}

export default Logo
