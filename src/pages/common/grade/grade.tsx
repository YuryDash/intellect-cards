import { RatingEmptyStarIcon, RatingFullStarIcon } from '@/assets'

type GradeProps = {
  grade: number
}
export const Grade = ({ grade }: GradeProps) => {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {grade >= 1 ? <RatingFullStarIcon /> : <RatingEmptyStarIcon />}
      {grade >= 2 ? <RatingFullStarIcon /> : <RatingEmptyStarIcon />}
      {grade >= 3 ? <RatingFullStarIcon /> : <RatingEmptyStarIcon />}
      {grade >= 4 ? <RatingFullStarIcon /> : <RatingEmptyStarIcon />}
      {grade >= 5 ? <RatingFullStarIcon /> : <RatingEmptyStarIcon />}
      {/*<img src={grade >= 2 ? starFullIcon : starIcon} alt={'star'} />*/}
      {/*<img src={grade >= 3 ? starFullIcon : starIcon} alt={'star'} />*/}
      {/*<img src={grade >= 4 ? starFullIcon : starIcon} alt={'star'} />*/}
      {/*<img src={grade >= 5 ? starFullIcon : starIcon} alt={'star'} />*/}
    </div>
  )
}
