import React from 'react';

export const commonModalClasses =
  "dark:bg-secondary bg-white drop-shadow-lg rounded p-6 space-y-6";

export const commonInputClasses =
  "w-full bg-transparent outline-none dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary transition dark:text-white text-primary";

const MyComponent = () => {
  return (
    <div className={`modal ${commonModalClasses}`} style={{ backgroundColor: 'rgba(61, 32, 142, 0.91)' }}>
      <input type="text" className={commonInputClasses} placeholder="Enter something..." />
    </div>
  );
};

export default MyComponent;
