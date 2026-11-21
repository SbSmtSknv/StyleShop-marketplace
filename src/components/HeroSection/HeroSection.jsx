import './HeroSection.css'
import Button from '../Button/Button'

function HeroSection({ heading, subheading, buttonText, onButtonClick }) {
  return (
    <section className="hero-section">
      <div>
        <p className="eyebrow">StyleShop / новая коллекция</p>
        <h1>{heading}</h1>
        <p>{subheading}</p>
        <Button text={buttonText} variant="primary" onClick={onButtonClick} />
      </div>
      <div className="hero-section__brand" aria-label="StyleShop">
        <span className="hero-section__brand-name">Style<span>Shop</span></span>
        <small>MODERN. CURATED. APPAREL.</small>
      </div>
    </section>
  )
}

export default HeroSection
