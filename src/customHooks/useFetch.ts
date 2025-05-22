import { useEffect, useReducer } from 'react';
import type { errorMsgType } from '../constant';

interface ApiResponse<T> {
  success: boolean;
  message: errorMsgType;
  data: T;
  error: any;
}

interface IUseFetchState<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  message: string | null;
}

type Action<T> =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: T; message: string | null }
  | { type: 'FETCH_ERROR'; error: string };

function fetchReducer<T>(state: IUseFetchState<T>, action: Action<T>): IUseFetchState<T> {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null, message: null };
    case 'FETCH_SUCCESS':
      return { isLoading: false, data: action.payload, error: null, message: action.message };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
}

interface UseFetchResult<T> extends IUseFetchState<T> {
  refetch: () => void;
}

export function useFetch<T = unknown>(
  url: string,
  options: RequestInit = { credentials: 'include' },
): UseFetchResult<T> {
  const [state, dispatch] = useReducer(fetchReducer<T>, {
    data: null,
    error: null,
    isLoading: false,
    message: null,
  });
  const [reloadFlag, setReloadFlag] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_START' });

      try {
        const res = await fetch(url, { ...options, signal });
        const body: ApiResponse<T> = await res.json();

        if (body == null) {
          throw new Error('got null result');
        } else if (!(body instanceof Object) || !('success' in body)) {
          throw new Error('invalid response ' + JSON.stringify(body));
        } else if (!body.success) {
          const errMsg = Array.isArray(body.message)
            ? body.message.join(', ')
            : body.message instanceof Error
              ? body.message.message
              : body.message
                ? body.message
                : 'Unknown error';
          dispatch({ type: 'FETCH_ERROR', error: errMsg });
        } else {
          dispatch({
            type: 'FETCH_SUCCESS',
            payload: body.data,
            message: body.message?.toString() ?? null,
          });
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          dispatch({ type: 'FETCH_ERROR', error: err.message || 'Unknown error' });
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url, reloadFlag]);

  const refetch = () => setReloadFlag();

  return {
    ...state,
    refetch,
  };
}
