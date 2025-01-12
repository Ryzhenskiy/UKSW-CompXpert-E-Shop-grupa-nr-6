import React from 'react';

// Komponent do wyświetlania gwiazdek
const StarRating = ({ rating }) => {
  const stars = Array(5)
    .fill(0)
    .map((_, index) => (
      <span
        key={index}
        className={`${
          index < rating ? 'text-yellow-500' : 'text-gray-300'
        } text-lg`}
      >
        ★
      </span>
    ));
  return <div className="flex">{stars}</div>;
};

// Komponent recenzji
const ReviewCard = ({ review }) => {
  const { userName, reviewText, rating, userEmail, createdAt } = review;

  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-md bg-white my-2">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-gray-800">{userName}</h3>
        <span className="text-sm text-gray-500">{userEmail}</span>
      </div>
      <StarRating rating={rating} />
      <p className="text-gray-700 mt-2">{reviewText}</p>
      <div className="text-right text-sm text-gray-500 mt-4">
        {new Date(createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default ReviewCard;
