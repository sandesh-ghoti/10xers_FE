import * as React from 'react';
import { useNavigate } from 'react-router';
import phoneUrl from '../assets/phone.jpg';
import type { IProduct } from '../constant';
export const Card: React.FC<IProduct> = (details: IProduct) => {
  const navigate = useNavigate();
  const onclick = () => {
    console.log(details);
    navigate(`/details/${details.id}`);
  };
  return (
    <div
      className='max-w-sm rounded-lg border border-gray-200 bg-white shadow-sm hover:cursor-pointer dark:border-gray-700 dark:bg-gray-800'
      onClick={onclick}
    >
      <img className='rounded-t-lg' src={phoneUrl} alt={details.modelName} />
      <div className='p-5'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 capitalize dark:text-white'>
          {details.brand} {details.modelName}
        </h5>
        {details.price && (
          <p className='mb-3 font-bold text-gray-700 dark:text-gray-300'>Rs.{details.price}</p>
        )}
        <div className='inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
          Checkout
          <svg
            className='ms-2 h-3.5 w-3.5 rtl:rotate-180'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 14 10'
          >
            <path
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M1 5h12m0 0L9 1m4 4L9 9'
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
