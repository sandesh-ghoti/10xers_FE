import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { BACKEND_URL } from '../config';
import { login, useAppDispatch } from '../store';

const LOGIN_URL = `${BACKEND_URL}/user/login`;
const SIGNUP_URL = `${BACKEND_URL}/user/register`;

interface IProps {
  children?: React.ReactNode;
  isSignup?: boolean;
}

const Authentication: React.FC<IProps> = ({ isSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      if (isSignup) {
        const response = await fetch(SIGNUP_URL, {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        console.log(data);
        navigate('/login');
      } else {
        const response = await fetch(LOGIN_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        console.log(data);
        dispatch(login(data.data));
        navigate('/');
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <h2 className='mb-4 text-2xl font-bold'>Welcome 10xers</h2>
      <div className='w-64'>
        <input
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='email'
          className='mb-4 w-full rounded border bg-gray-100 px-4 py-2 focus:outline-none dark:bg-gray-700'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          className='mb-4 w-full rounded border bg-gray-100 px-4 py-2 focus:outline-none dark:bg-gray-700'
        />
        {error && <p className='mb-4 text-sm text-red-500'>{error}</p>}
        <button
          onClick={handleLogin}
          className={`w-full rounded bg-blue-500 px-4 py-2 font-bold text-white focus:outline-none ${
            loading ? 'cursor-not-allowed opacity-50' : ''
          }`}
          disabled={loading}
        >
          {isSignup ? 'Sign Up' : 'Login'}
        </button>
        <p className='mt-4 text-center text-sm'>
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <NavLink to={isSignup ? '/login' : '/signup'} className='text-blue-500 hover:underline'>
            {isSignup ? 'Login' : 'Sign Up'}
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Authentication;
