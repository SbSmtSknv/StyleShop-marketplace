import './TestimonialCard.css'

function TestimonialCard({ authorName, authorRole, avatar, text, date }) {
  return (
    <article className="testimonial-card">
      <div className="avatar">{avatar || 'IMG'}</div>
      <p>“{text}”</p>
      <strong>{authorName}</strong>
      <small>{authorRole} · {date}</small>
    </article>
  )
}

export default TestimonialCard
