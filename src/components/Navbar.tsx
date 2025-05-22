import { NavLink } from 'react-router';
import { BACKEND_URL } from '../config';
import { isLoggedIn, logout, useAppDispatch, useAppSelector } from '../store';

const LOGO_URL = 'https://10xers.co/images/Logo.png';
const LOGOUT_URL = `${BACKEND_URL}/user/logout`;
const Navbar = () => {
  const isUserLoggedIn = useAppSelector(isLoggedIn);
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    dispatch(logout());
    await fetch(LOGOUT_URL, { method: 'POST', credentials: 'include' });
    window.alert('logout success');
  };
  return (
    <>
      <nav className='border-gray-200 bg-white dark:bg-gray-900'>
        <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4'>
          <NavLink to='/' className='flex items-center space-x-3 rtl:space-x-reverse'>
            <img src={LOGO_URL} className='h-8' alt='Flowbite Logo' />
          </NavLink>
          <div className='hidden w-full md:block md:w-auto' id='navbar-default'>
            <ul className='mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900'>
              <li>
                <NavLink
                  to='/'
                  className='block rounded-sm bg-blue-700 px-3 py-2 text-white md:bg-transparent md:p-0 md:text-blue-700 dark:text-white md:dark:text-blue-500'
                  aria-current='page'
                >
                  Home
                </NavLink>
              </li>
              {isUserLoggedIn && (
                <li>
                  <NavLink
                    to='/dashboard'
                    className='block rounded-sm px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500'
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
              {isUserLoggedIn && (
                <li>
                  <NavLink
                    to='/'
                    className='block rounded-sm px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500'
                    onClick={handleLogout}
                  >
                    Logout
                  </NavLink>
                </li>
              )}
              {!isUserLoggedIn && (
                <li>
                  <NavLink
                    to='/login'
                    className='block rounded-sm px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500'
                  >
                    Login/Signup
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
