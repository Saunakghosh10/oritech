import React, { useState } from 'react';

const RatingStars = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="focus:outline-none"
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => onRatingChange(star)}
        >
          <svg
            className={`w-8 h-8 ${
              star <= (hoverRating || rating)
                ? 'text-yellow-400'
                : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

const ServiceFeedback = ({ serviceCall, onSubmitFeedback }) => {
  const [feedback, setFeedback] = useState({
    rating: 0,
    serviceQuality: 0,
    engineerProfessionalism: 0,
    timelyCompletion: 0,
    comment: '',
    recommendation: '',
    followUpRequired: false
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitFeedback(feedback);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            Thank you for your feedback!
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Your feedback helps us improve our service quality.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Service Feedback</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Overall Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Overall Rating
          </label>
          <RatingStars
            rating={feedback.rating}
            onRatingChange={(rating) => setFeedback({ ...feedback, rating })}
          />
        </div>

        {/* Service Quality */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Quality
          </label>
          <RatingStars
            rating={feedback.serviceQuality}
            onRatingChange={(rating) =>
              setFeedback({ ...feedback, serviceQuality: rating })
            }
          />
        </div>

        {/* Engineer Professionalism */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Engineer Professionalism
          </label>
          <RatingStars
            rating={feedback.engineerProfessionalism}
            onRatingChange={(rating) =>
              setFeedback({ ...feedback, engineerProfessionalism: rating })
            }
          />
        </div>

        {/* Timely Completion */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timely Completion
          </label>
          <RatingStars
            rating={feedback.timelyCompletion}
            onRatingChange={(rating) =>
              setFeedback({ ...feedback, timelyCompletion: rating })
            }
          />
        </div>

        {/* Comments */}
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Additional Comments
          </label>
          <textarea
            id="comment"
            rows={4}
            value={feedback.comment}
            onChange={(e) =>
              setFeedback({ ...feedback, comment: e.target.value })
            }
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            placeholder="Please share your experience..."
          />
        </div>

        {/* Recommendation */}
        <div>
          <label htmlFor="recommendation" className="block text-sm font-medium text-gray-700 mb-2">
            Would you recommend our service?
          </label>
          <select
            id="recommendation"
            value={feedback.recommendation}
            onChange={(e) =>
              setFeedback({ ...feedback, recommendation: e.target.value })
            }
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="">Select an option</option>
            <option value="definitely">Definitely</option>
            <option value="maybe">Maybe</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Follow-up Required */}
        <div className="flex items-center">
          <input
            id="followUp"
            type="checkbox"
            checked={feedback.followUpRequired}
            onChange={(e) =>
              setFeedback({ ...feedback, followUpRequired: e.target.checked })
            }
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="followUp" className="ml-2 block text-sm text-gray-700">
            Follow-up required
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceFeedback;
