import { getRating } from '../mocks/mocks';
import { ReviewType } from '../store/slices/cities-slice';

function ReviewItem({ review }: { review: ReviewType }): JSX.Element {
  // Создаем объект Date из строки
  const reviewDate = new Date(review.date);

  // Форматируем дату для атрибута dateTime (YYYY-MM-DD)
  const dateTimeString = reviewDate.toISOString().split('T')[0];

  // Форматируем дату для отображения (Month YYYY)
  const displayDate = reviewDate.toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: getRating(review.rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime={dateTimeString}>
          {displayDate}
        </time>
      </div>
    </li>
  );
}

export default ReviewItem;
