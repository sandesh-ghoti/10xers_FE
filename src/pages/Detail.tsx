import { useState } from 'react';
import { useParams } from 'react-router';
import editSvg from '../assets/edit.svg';
import phoneUrl from '../assets/phone.jpg';
import Modal from '../components/Modal';
import { BACKEND_URL } from '../config';
import type { IProduct } from '../constant';
import { useFetch } from '../customHooks/useFetch';
import { isLoggedIn, useAppSelector, user } from '../store';
const GET_PRODUCT = `${BACKEND_URL}/product/get`;

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const isUserLoggedIn = useAppSelector(isLoggedIn);
  const userData = useAppSelector(user);
  const { isLoading, data, error } = useFetch<IProduct>(`${GET_PRODUCT}/${id}`);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <section>
      <div
        className={
          'bg-opacity-70 relative mx-auto mt-6 grid h-full w-full grid-cols-3 items-center gap-4 overflow-hidden bg-slate-900 p-8 xl:grid-cols-4'
        }
      >
        <img
          src={phoneUrl}
          alt={data?.modelName}
          className='my-auto aspect-square h-96 w-sm rounded-md object-cover shadow-md shadow-slate-400'
        />
        <div className='col-span-2 my-auto flex flex-col xl:col-span-3'>
          <h1 className='my-2 text-xl font-bold text-slate-100 capitalize md:text-2xl lg:text-3xl'>
            {data?.brand} {data?.modelName}
          </h1>
          <div className='my-1 flex flex-row flex-wrap gap-2 max-md:gap-1 max-md:text-sm'>
            <h4 className='font-bold text-slate-100'>Price:</h4> <span>Rs.{data?.price}</span>
          </div>
          <p className='my-2 text-sm text-zinc-200'>{data?.description}</p>
        </div>
        {isUserLoggedIn && userData?.id === data?.admin && (
          <button
            onClick={() => {
              setIsUpdate(true);
              setIsOpen(true);
            }}
            className='absolute top-1 right-1 items-center rounded-full bg-blue-700 px-3 py-3 text-white hover:cursor-pointer dark:bg-blue-600'
            aria-current='page'
          >
            <img src={editSvg} className='h-6 w-6 text-white' alt='edit' />
          </button>
        )}
      </div>
      <Modal isUpdate={isUpdate} product={data} showModal={isOpen} setShowModal={setIsOpen} />
    </section>
  );
};
export default Detail;
