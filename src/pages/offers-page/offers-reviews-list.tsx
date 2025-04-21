import ReviewItem from '../../components/review-card';
import { REVIEWS_MOCK } from '../../mocks/mocks';

function OfferReviewsList(): JSX.Element {
  return (
    <ul className="reviews__list">
      {REVIEWS_MOCK.map((item) => (
        <ReviewItem review={item} key={item.id} />
      ))}
    </ul>
  );
}
export default OfferReviewsList;
