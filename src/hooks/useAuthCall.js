import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fillAuth, cleanAuth, selectAuthToken } from '@/features/authSlice';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectAuthToken);

  const signIn = async (userCredentials) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}auth/login`,
        userCredentials
      );
      // console.log(data);

      dispatch(fillAuth(data));

      toast.success('Login Successfull!', {
        description: `Welcome back, ${data.user.username}`,
      });

      navigate('/stock');
    } catch (error) {
      // console.log("error:", error);
      toast.error('Login Faild', {
        description:
          error.response?.data?.message ||
          error?.message ||
          'Please check your credentials',
      });
    }
  };

  const signUp = async (userCredentials) => {
    try {
      const { data } = await axios.post(`${BASE_URL}users`, userCredentials);
      // console.log(data);

      dispatch(fillAuth(data));

      toast.success('Login Successfull!', {
        description: `Welcome back, ${data.data.username}`,
      });

      navigate('/stock');
    } catch (error) {
      // console.log("error:", error);
      toast.error('Login Faild', {
        description:
          error.response?.data?.message ||
          error?.message ||
          'Please check your credentials',
      });
    }
  };

  const signOut = async () => {
    await new Promise((res) => setTimeout(res, 200)); // Simulate a delay for better UX
    try {
      await axios(`${BASE_URL}auth/logout`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      dispatch(cleanAuth());
      navigate('/');
    } catch (error) {
      toast.error('Login Faild', {
        description:
          error.response?.data?.message ||
          error?.message ||
          'Please check your credentials',
      });
    }
  };

  return { signIn, signUp, signOut };
};

export default useAuthCall;
