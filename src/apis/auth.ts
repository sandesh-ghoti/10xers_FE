import { StatusCodes } from 'http-status-codes';
import { BACKEND_URL } from '../config';

const LOGIN_URL = `${BACKEND_URL}/user/login`;
const SIGNUP_URL = `${BACKEND_URL}/user/register`;

export async function loginApi(email: string, password: string) {
  const response = await fetch(LOGIN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (response.status !== StatusCodes.OK) {
    throw new Error(data.message);
  }
  return data.data;
}

export async function signupApi(email: string, password: string) {
  const response = await fetch(SIGNUP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (response.status !== StatusCodes.CREATED) {
    throw new Error(data.message);
  }
  return data;
}
