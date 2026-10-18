import './Modal.css'

function Modal({ isOpen, title, onClose, children }) {
  if (isOpen === false) return null

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section className="modal" role="dialog" aria-modal="true" aria-label={title} onClick={(event) => event.stopPropagation()}>
        <button className="modal__close" type="button" onClick={onClose} aria-label="Закрыть">×</button>
        <h2>{title}</h2>
        {children}
      </section>
    </div>
  )
}

export default Modal
