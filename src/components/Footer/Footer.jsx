import './Footer.css'
import Logo from '../Logo/Logo'

function Footer({ copyrightText, socialLinks = [] }) {
  return (
    <footer className="footer">
      <Logo altText="Логотип StyleShop" width={42} height={42} />
      <span>{copyrightText}</span>
      <div className="footer__links">
        {socialLinks.map((socialLink) => (
          <a key={socialLink.platform} href={socialLink.url} aria-label={socialLink.platform}>
            {socialLink.icon || socialLink.platform}
          </a>
        ))}
      </div>
    </footer>
  )
}

export default Footer
