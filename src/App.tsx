import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { BACKEND_URL } from './config';
import { useFetch } from './customHooks/useFetch';

function App() {
  const { isLoading, data, error, message } = useFetch(BACKEND_URL + '/product', { method: 'GET' });
  useEffect(() => {
    console.log('isLoading', isLoading);
    console.log('data', data);
    console.log('error', error);
    console.log('message', message);
  }, [isLoading, data, error, message]);
  return (
    <>
      <div className='relative flex min-h-screen w-screen justify-center bg-white text-black dark:bg-gray-800 dark:text-white'>
        <div className='max-container mx-auto w-full'>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
