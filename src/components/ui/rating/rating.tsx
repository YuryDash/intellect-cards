import { RatingFullStarIcon, RatingStarIcon } from '@/icons'

type GradeProps = {
  ratingValue: number
}
export const Rating = ({ ratingValue }: GradeProps) => {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {ratingValue >= 1 ? <RatingFullStarIcon /> : <RatingStarIcon />}
      {ratingValue >= 2 ? <RatingFullStarIcon /> : <RatingStarIcon />}
      {ratingValue >= 3 ? <RatingFullStarIcon /> : <RatingStarIcon />}
      {ratingValue >= 4 ? <RatingFullStarIcon /> : <RatingStarIcon />}
      {ratingValue >= 5 ? <RatingFullStarIcon /> : <RatingStarIcon />}
    </div>
  )
}
