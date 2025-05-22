import { useState } from 'react';
import { useNavigate } from 'react-router';
import createIcon from '../assets/create.svg';
import { ItemCardList } from '../components/ItemCardList';
import Modal from '../components/Modal';
import { BACKEND_URL } from '../config';
import type { IProduct } from '../constant';
import { useFetch } from '../customHooks/useFetch';
import { isLoggedIn, useAppSelector } from '../store';
const GET_ALL_PRODUCT_BY_ADMIN = `${BACKEND_URL}/product/admin`;
const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const isUserLoggedIn = useAppSelector(isLoggedIn);
  const navigate = useNavigate();
  const { isLoading, data, error } = useFetch<IProduct[]>(GET_ALL_PRODUCT_BY_ADMIN);
  if (!isUserLoggedIn) navigate('/login');
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className='relative'>
      <ItemCardList title='Dashboard' list={data || []} />
      <button
        onClick={() => setShowModal(true)}
        className='absolute top-1 right-1 items-center rounded-full bg-blue-700 px-3 py-3 text-white hover:cursor-pointer dark:bg-blue-600'
        aria-current='page'
      >
        <img src={createIcon} className='h-6 w-6 text-white' alt='create' />
      </button>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        product={undefined}
        isUpdate={false}
      />
    </div>
  );
};

export default Dashboard;
