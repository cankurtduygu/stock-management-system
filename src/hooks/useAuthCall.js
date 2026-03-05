import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from '@/features/authSlice';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const token = useSelector(selectAuthToken);

  const signIn = async (userCredentials) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}auth/login`,
        userCredentials
      );
      // console.log(data);

      dispatch(updateUserInfo(data));

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

      dispatch(updateUserInfo(data));

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

  const singOut = async () => {
    // try {
    //   await axios(`${BASE_URL}users`, {
    //     headers: {
    //       Authorization: `Token ${token}`,
    //     },
    //   });
    //   dispatch(cleanAuth());
    //   navigate("/");
    // } catch (error) {
    //   toast.error("Login Faild", {
    //     description:
    //       error.response?.data?.message ||
    //       error?.message ||
    //       "Please check your credentials",
    //   });
    // }
  };

  return { signIn, signUp, singOut };
};

export default useAuthCall;
