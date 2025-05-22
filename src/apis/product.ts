import { StatusCodes } from 'http-status-codes';
import { BACKEND_URL } from '../config';
import type { IProduct } from '../constant';

//Create, Update and Delete operation for Product
const CREATE_PRODUCT_URL = `${BACKEND_URL}/product/create`;
const UPDATE_PRODUCT_URL = `${BACKEND_URL}/product`;
const DELETE_PRODUCT_URL = `${BACKEND_URL}/product`;

export async function createProductApi(product: Omit<IProduct, 'id' | 'admin'>) {
  const response = await fetch(CREATE_PRODUCT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(product),
  });
  const data = await response.json();
  if (response.status !== StatusCodes.CREATED) {
    throw new Error(data.message);
  }
  return data.data as IProduct;
}

export async function updateProductApi(id: number, product: IProduct) {
  const response = await fetch(UPDATE_PRODUCT_URL + '/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(product),
  });
  const data = await response.json();
  if (response.status !== StatusCodes.OK) {
    throw new Error(data.message);
  }
  return data.data as IProduct;
}

export async function deleteProductApi(id: number) {
  const response = await fetch(DELETE_PRODUCT_URL + '/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await response.json();
  if (response.status !== StatusCodes.OK) {
    throw new Error(data.message);
  }
  return true;
}
