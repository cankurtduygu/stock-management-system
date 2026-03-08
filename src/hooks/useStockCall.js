import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  // brandSuccess,
  // firmSuccess,
  fetchFail,
  fetchStart,
  fetchSuccess,
} from '../features/stockSlice';
import { selectAuthToken } from '../features/authSlice';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const useStockCall = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectAuthToken);

  //   const getFirms = async () => {
  //     try {
  //       dispatch(fetchStart());
  //       const { data } = await axios(`${BASE_URL}firms`, {
  //         headers: {
  //           Authorization: `Token ${token}`,
  //         },
  //       });
  //       console.log(data.data);
  //       dispatch(firmSuccess(data.data));
  //     } catch (error) {
  //       dispatch(fetchFail(error));
  //       console.log(error);
  //     }
  //   };

  //   const getBrands = async () => {
  //     try {
  //       dispatch(fetchStart());
  //       const { data } = await axios(`${BASE_URL}brands`, {
  //         headers: {
  //           Authorization: `Token ${token}`,
  //         },
  //       });
  //       console.log(data.data);
  //       dispatch(brandSuccess(data.data));
  //     } catch (error) {
  //       dispatch(fetchFail(error));
  //       console.log(error);
  //     }
  //   };

  const getStockData = async (url) => {
    try {
      dispatch(fetchStart());
      const { data } = await axios(`${BASE_URL}${url}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      //   console.log(data.data);
      // throw new Error('test error handling')
      dispatch(fetchSuccess({ url, data: data.data }));
    } catch (error) {
      dispatch(fetchFail(error.message));
      console.log(error);
    }
  };

  const getStockDataById = async (url, id) => {
    try {
      dispatch(fetchStart());
      const { data } = await axios(`${BASE_URL}${url}/${id}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(data.data);
      return { ...data.data };
    } catch (errore) {
      dispatch(fetchFail(error));
      console.log(error);
    }
  };

  return { getStockData, getStockDataById };
};

export default useStockCall;
