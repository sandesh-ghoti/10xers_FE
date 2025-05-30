import { useEffect, useState } from 'react';
import { ItemCardList } from '../components/ItemCardList';
import { BACKEND_URL } from '../config';
import type { IProduct } from '../constant';
import { useFetch } from '../customHooks/useFetch';
const GET_ALL_PRODUCT = `${BACKEND_URL}/product/get`;
const Home = () => {
  const { isLoading, data, error } = useFetch<IProduct[]>(GET_ALL_PRODUCT);
  const [updatedData, setUpdatedData] = useState(data);
  const [isIncreasingOrder, setIncresingOrder] = useState(false);
  const toggleSorting = () => {
    setIncresingOrder(!isIncreasingOrder);
  };
  useEffect(() => {
    if (isIncreasingOrder && data) {
      setUpdatedData(data?.sort((a, b) => a.price - b.price));
    } else {
      data && setUpdatedData(data?.sort((a, b) => b.price - a.price));
    }
  }, [isIncreasingOrder]);
  useEffect(() => {
    setUpdatedData(data);
  }, [data]);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      <button type='button' onClick={() => toggleSorting()}>
        Sorting
      </button>
      <ItemCardList title='Available near you' list={updatedData || []} />
    </div>
  );
};

export default Home;
