import './SectionHeader.css'

function SectionHeader({ title, subtitle, align = 'left' }) {
  return (
    <div className={`section-header section-header--${align}`}>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  )
}

export default SectionHeader
