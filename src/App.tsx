import { Outlet } from 'react-router';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <div className='relative flex min-h-screen w-screen justify-center bg-white text-black dark:bg-gray-800 dark:text-white'>
        <div className='max-container mx-auto w-full'>
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
