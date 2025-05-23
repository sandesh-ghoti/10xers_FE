import { useState } from 'react';
import { useNavigate } from 'react-router';
import { createProductApi, updateProductApi } from '../apis/product';
import type { IProduct } from '../constant';

interface IProps {
  isUpdate?: boolean;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  product: IProduct | null | undefined;
}
const initialState: IProduct = {
  id: undefined,
  brand: '',
  modelName: '',
  description: '',
  price: 0,
  admin: 0,
};
const Modal: React.FC<IProps> = ({ isUpdate, showModal, setShowModal, product }) => {
  const [productInput, setProductInput] = useState(product || initialState);
  const [error, setError] = useState('');
  const navigte = useNavigate();
  const handle = async () => {
    try {
      if (
        !productInput ||
        !productInput.brand ||
        !productInput.modelName ||
        !productInput.description ||
        !productInput.price
      ) {
        throw new Error('Please fill all the fields');
      } else if (isUpdate && product && product.id) {
        const result = product && (await updateProductApi(product.id, productInput));
        if (result) {
          setShowModal(false);
          alert('Product updated successfully');
          navigte(`/dashboard`);
        }
      } else {
        const response = await createProductApi({
          brand: productInput.brand,
          modelName: productInput.modelName,
          description: productInput.description,
          price: productInput.price,
        });
        if (response) {
          setShowModal(false);
          alert('Product created successfully');
          navigte(`/details/${response.id}`);
        }
      }
    } catch (error: Error | any) {
      console.log('error at modal', error);
      setError(error.message);
    }
  };
  return (
    <>
      <div
        id='crud-modal'
        data-testid='crud-modal'
        tabIndex={-1}
        aria-hidden='true'
        className={`${showModal ? 'flex' : 'hidden'} fixed top-0 right-0 left-0 z-50 h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-950 opacity-95 md:inset-0`}
      >
        <div className='relative max-h-full w-full max-w-md p-4'>
          <div className='relative rounded-lg bg-white shadow-sm dark:bg-gray-700'>
            <div className='flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5 dark:border-gray-600'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                {isUpdate ? 'Update Product' : 'Create New Product'}
              </h3>
              <button
                type='button'
                className='ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
                data-modal-toggle='crud-modal'
                onClick={() => setShowModal(!showModal)}
              >
                <svg
                  className='h-3 w-3'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 14'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                  />
                </svg>
                <span className='sr-only'>Close modal</span>
              </button>
            </div>
            {error && <p className='text-red-500'>{error}</p>}
            <form
              className='p-4 md:p-5'
              onSubmit={(e) => {
                e.preventDefault();
                handle();
              }}
            >
              <div className='mb-4 grid grid-cols-2 gap-4'>
                <div className='col-span-2'>
                  <label
                    htmlFor='brand'
                    className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Brand
                  </label>
                  <input
                    type='text'
                    name='brand'
                    id='brand'
                    data-testid='brand'
                    className='focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400'
                    placeholder='Type brand name'
                    value={productInput?.brand}
                    onChange={(e) => setProductInput({ ...productInput, brand: e.target.value })}
                  />
                </div>
                <div className='col-span-2'>
                  <label
                    htmlFor='model'
                    className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Model Name
                  </label>
                  <input
                    type='text'
                    name='model'
                    id='model'
                    data-testid='model'
                    className='focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400'
                    placeholder='Type Model name'
                    value={productInput?.modelName}
                    onChange={(e) =>
                      setProductInput({ ...productInput, modelName: e.target.value })
                    }
                  />
                </div>
                <div className='col-span-2 sm:col-span-1'>
                  <label
                    htmlFor='price'
                    className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Price
                  </label>
                  <input
                    type='number'
                    name='price'
                    id='price'
                    data-testid='price'
                    className='focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400'
                    placeholder='Rs.2999'
                    value={productInput?.price}
                    onChange={(e) =>
                      setProductInput({ ...productInput, price: Number(e.target.value) })
                    }
                  />
                </div>
                <div className='col-span-2'>
                  <label
                    htmlFor='description'
                    className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Phone Description
                  </label>
                  <textarea
                    id='description'
                    data-testid='description'
                    rows={4}
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                    placeholder='Write product description here'
                    value={productInput?.description}
                    onChange={(e) =>
                      setProductInput({ ...productInput, description: e.target.value })
                    }
                  ></textarea>
                </div>
              </div>
              <button
                type='submit'
                name='submit'
                className='inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                <svg
                  className='-ms-1 me-1 h-5 w-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                {isUpdate ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
