import React, { useState } from 'react';

const StarRating = ({ onHover, onRate, hover, rating }) => {
  return (
    <div className="flex flex-col">
      <div className="flex">
        {[...Array(5)].map((star, index) => {
          const currentRating = index + 1;

          return (
            <button
              key={index}
              type="button"
              className={`text-2xl mr-3 p-0 border-none focus:outline-none transition-colors duration-200 ${
                currentRating <= (hover || rating)
                  ? 'text-yellow-400'
                  : 'text-gray-400'
              }`}
              onClick={() => onRate(currentRating)}
              onMouseEnter={() => onHover(currentRating)}
              onMouseLeave={() => onHover(0)}
            >
              ★
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StarRating;
