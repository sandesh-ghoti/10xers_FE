import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { loginApi, signupApi } from '../apis/auth';
import {
  errorMsg,
  login,
  removeErrorMsg,
  setErrorMsg,
  useAppDispatch,
  useAppSelector,
} from '../store';

interface IProps {
  children?: React.ReactNode;
  isSignup?: boolean;
}

const Authentication: React.FC<IProps> = ({ isSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const error = useAppSelector(errorMsg);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogin = async () => {
    setSuccessMsg('');
    dispatch(removeErrorMsg());
    setLoading(true);
    try {
      if (isSignup) {
        const res = await signupApi(email, password);
        if (res) {
          setSuccessMsg('success, please login now');
          navigate('/login');
        }
      } else {
        const res = await loginApi(email, password);
        if (res) {
          setSuccessMsg(res.message);
          dispatch(login(res.user));
          navigate('/');
        }
      }
    } catch (error: any) {
      console.error('got the issue at signup api', error);
      dispatch(setErrorMsg(error.message));
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
        {successMsg && <p className='mb-4 text-lg text-green-500'>{successMsg}</p>}
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
