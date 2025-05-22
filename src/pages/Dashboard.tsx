import { useNavigate } from 'react-router';
import { ItemCardList } from '../components/ItemCardList';
import { BACKEND_URL } from '../config';
import type { IProduct } from '../constant';
import { useFetch } from '../customHooks/useFetch';
import { isLoggedIn, useAppSelector } from '../store';

const GET_ALL_PRODUCT_BY_ADMIN = `${BACKEND_URL}/product/admin`;
const Dashboard = () => {
  const isUserLoggedIn = useAppSelector(isLoggedIn);
  const navigate = useNavigate();
  const { isLoading, data, error } = useFetch<IProduct[]>(GET_ALL_PRODUCT_BY_ADMIN);
  if (!isUserLoggedIn) navigate('/login');
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return <ItemCardList title='Dashboard' list={data || []} />;
};

export default Dashboard;
