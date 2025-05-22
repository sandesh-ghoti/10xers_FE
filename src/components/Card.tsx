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
      className='w-full max-w-sm cursor-pointer bg-white dark:border-gray-700 dark:bg-gray-800'
      onClick={onclick}
    >
      <img
        className='aspect-square rounded-lg border border-gray-200 object-cover shadow'
        src={phoneUrl}
        alt={details.modelName}
      />
      <div className='h-full w-full px-5 py-2'>
        {details.price && (
          <div className='mt-2 flex items-center justify-between'>
            <h5 className='text-lg font-semibold tracking-tight text-gray-900 capitalize dark:text-white'>
              {details.brand} {details.modelName}
            </h5>
            <span className='text-2xl font-bold text-green-400 dark:text-green-500'>
              ${details.price}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
