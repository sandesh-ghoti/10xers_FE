import { ItemCardList } from '../components/ItemCardList';
import { BACKEND_URL } from '../config';
import type { IProduct } from '../constant';
import { useFetch } from '../customHooks/useFetch';
const GET_ALL_PRODUCT = `${BACKEND_URL}/product/get`;
const Home = () => {
  const { isLoading, data, error } = useFetch<IProduct[]>(GET_ALL_PRODUCT);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return <ItemCardList title='Available near you' list={data || []} />;
};

export default Home;
