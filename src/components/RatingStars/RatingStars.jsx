import './RatingStars.css'

function RatingStars({ score, reviewsCount }) {
  const roundedScore = Math.max(0, Math.min(5, Math.round(score)))

  return (
    <div className="rating" aria-label={`Рейтинг ${roundedScore} из 5`}>
      <span>{'★'.repeat(roundedScore)}{'☆'.repeat(5 - roundedScore)}</span>
      <small>({reviewsCount})</small>
    </div>
  )
}

export default RatingStars
