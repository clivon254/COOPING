import React from 'react';

// Inner Steps component
const Steps = ({ status }) => {

  // Define the order statuses in their sequential order
  const statuses = [
    'Order Placed',
    'Processing',
    'Out For Delivery',
    'Delivered'
  ];

  // Find the index of the current status
  const currentIndex = statuses.findIndex(

    stepStatus => stepStatus.toLowerCase() === status.toLowerCase()

  );

  return (

    <div className="w-full ">

      <div className="flex items-center  mb-4 relative overflow-hidden">

        {/* Base horizontal line that spans all steps */}
        <div className="absolute h-1 bg-gray-300 left-0 right-0 top-3" />

        {/* Colored overlay line for completed steps */}
        <div
          className="absolute h-1 bg-blue-500 left-0 top-3"
          style={{
            width: currentIndex === 0
              ? '0%'
              : `${(currentIndex / (statuses.length - 1)) * 100}%`
          }}
        />

        {statuses.map((stepStatus, index) => (

          <div key={stepStatus} className="flex flex-col items-center relative flex-1">
           
            {/* Status circle */}
            <div
              className={`w-6 h-6 flex items-center justify-center rounded-full z-20 ${
                index < currentIndex
                  ? 'bg-blue-500 text-white' // completed
                  : index === currentIndex
                    ? 'bg-blue-500 text-white' // current
                    : 'bg-gray-300 text-gray-500' // future
              }`}
            >
              {index < currentIndex ? (
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <span className="text-xs">{index + 1}</span>
              )}
            </div>

            {/* Status label */}
            <div className={`mt-2 text-[0.59rem] sm:text-xs  font-semibold text-center ${
              index <= currentIndex ? 'text-blue-600 font-medium' : 'text-gray-500'
            }`}>
              {stepStatus}
            </div>

          </div>

        ))}

      </div>

    </div>

  );
};

// Main component with error handling
const OrderSteps = ({ orderr }) => {

  // Add error handling to extract the status
  if (!orderr || !orderr.status) 
  {

    // Provide a default status if missing
    return (

      <div className="p-6 bg-white rounded-lg shadow-sm">

        <Steps status="Order Placed" />

        {!orderr && <div className="text-red-500 text-sm mt-2">Warning: No order data provided</div>}
        
        {orderr && !orderr.status && <div className="text-red-500 text-sm mt-2">Warning: Order status is missing</div>}

      </div>

    );

  }

  return (

      <Steps status={orderr.status} />

  );

};

export default OrderSteps;