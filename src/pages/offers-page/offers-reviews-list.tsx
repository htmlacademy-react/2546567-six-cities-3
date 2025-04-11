import ReviewItem from '../../components/review-casd';
import { REVIRWS_MOCK } from '../../mocks/mocks';

function OfferReviewsList(): JSX.Element {
  return (
    <ul className="reviews__list">
      {REVIRWS_MOCK.map((item) => (
        <ReviewItem review={item} key={item.id} />
      ))}
    </ul>
  );
}
export default OfferReviewsList;
