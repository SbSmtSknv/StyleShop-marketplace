import './HeroSection.css'
import Button from '../Button/Button'
import heroImage from '../../assets/Gemini_Generated_Image_ltgv4fltgv4fltgv.jpg'

function HeroSection({ heading, subheading, buttonText, onButtonClick }) {
  return (
    <section className="hero-section">
      <div>
        <p className="eyebrow">StyleShop / новая коллекция</p>
        <h1>{heading}</h1>
        <p>{subheading}</p>
        <Button text={buttonText} variant="primary" onClick={onButtonClick} />
      </div>
      <div className="hero-section__image">
        <img src={heroImage} alt="Новая коллекция StyleShop" />
      </div>
    </section>
  )
}

export default HeroSection
