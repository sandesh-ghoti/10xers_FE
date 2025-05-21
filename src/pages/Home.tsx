import { NavLink } from 'react-router';

type Props = {};

const Home = (props: Props) => {
  return (
    <div>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/login'>Login</NavLink>
      <NavLink to='/signup'>Signup</NavLink>
      <NavLink to='/dashboard'>Dashboard</NavLink>
    </div>
  );
};

export default Home;
