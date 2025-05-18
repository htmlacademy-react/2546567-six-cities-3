import { useSelector } from 'react-redux';
import ReviewItem from '../../components/review-card';
import { RootState } from '../../store/index.ts';

function OfferReviewsList(): JSX.Element {
  const comments = useSelector((state: RootState) => state.cities.comments);

  return (
    <ul className="reviews__list">
      {comments.map((item) => (
        <ReviewItem review={item} key={item.id} />
      ))}
    </ul>
  );
}
export default OfferReviewsList;
