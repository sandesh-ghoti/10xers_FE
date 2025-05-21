import { Navigate, Outlet } from 'react-router';
import { useAppSelector, user } from '../store';

const AuthUser = () => {
  const user1 = useAppSelector(user);
  return user1.email ? <Outlet /> : <Navigate to='/login' />;
};

export default AuthUser;
