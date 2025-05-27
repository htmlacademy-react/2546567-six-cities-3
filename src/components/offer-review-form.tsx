import { Fragment, ReactEventHandler, useCallback, useState } from 'react';
import { rating } from '../utils/const.ts';
import { useAppDispatch } from '../store/index.ts';
import { NewComment } from '../store/slices/cities-slice.ts';
import { sendComment } from '../store/middleware/cities-thunk.ts';

type HandleChange = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;

type OfferReviewProps = {
  id: string;
};

function OfferReviewForm({ id }: OfferReviewProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [review, setReview] = useState({ rating: 0, review: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange: HandleChange = useCallback(
    (event) => {
      const { name, value } = event.currentTarget;
      setReview({
        ...review,
        [name]: name === 'rating' ? Number(value) : value,
      });
    },
    [review]
  );

  const handleSubmit = useCallback(
    (evt: React.FormEvent) => {
      evt.preventDefault();

      if (
        review.review.length < 50 ||
        review.rating === 0 ||
        review.review.length > 300
      ) {
        return;
      }

      setIsSubmitting(true);

      const comment: NewComment = {
        offerId: id,
        comment: review.review,
        rating: Number(review.rating),
      };

      dispatch(sendComment(comment))
        .unwrap()
        .then(() => {
          setReview({ rating: 0, review: '' });
        })
        .catch(() => {
          throw new Error('failed to send comment');
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [dispatch, id, review.rating, review.review]
  );

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {rating.map(({ value, label }) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              checked={review.rating === value}
              id={`${value}-stars`}
              type="radio"
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={label}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={review.review}
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleChange}
        disabled={isSubmitting}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={
            review.review.length < 50 || review.rating === 0 || isSubmitting
          }
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default OfferReviewForm;
