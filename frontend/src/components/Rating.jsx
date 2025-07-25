import React from 'react';

const Rating = ({ value, color = 'text-yellow-400' }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          <i
            className={
              value >= star
                ? 'fas fa-star'
                : value >= star - 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
            style={{ color: '#f8e825' }}
          ></i>
        </span>
      ))}
    </div>
  );
};

export default Rating;