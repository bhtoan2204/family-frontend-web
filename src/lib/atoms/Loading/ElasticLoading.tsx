import React from 'react';

const ElasticDotLoading = () => {
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-[#007A5A] rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-[#007A5A] rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-[#007A5A] rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default ElasticDotLoading;