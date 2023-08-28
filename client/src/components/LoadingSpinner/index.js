import React from 'react';

const LoadingSpinner = ({ isLoading }) => {
  return (
    <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isLoading ? 'block' : 'hidden'}`}>
      <div className="spinner border-t-4 border-gray-500 border-solid rounded-full h-12 w-12 animate-spin"></div>
    </div>
  );
};

<<<<<<< HEAD
export default LoadingSpinner;
=======
export default LoadingSpinner;
>>>>>>> 15b5148d92dcaf1eaad758042814589019349d5c
