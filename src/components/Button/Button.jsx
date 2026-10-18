import './Button.css'

function Button({ text, variant = 'primary', isDisabled = false, onClick }) {
  return (
    <button className={`button button--${variant}`} disabled={isDisabled} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
