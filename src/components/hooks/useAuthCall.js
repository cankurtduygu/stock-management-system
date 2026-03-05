//Burasi bir custom Hookdur. Yani bir fonksiyon yazacagiz ve bu fonksiyon bize auth islemlerini yaparken kullanacagimiz fonksiyonlari verecek. Boylece her seferinde ayni kodlari yazmak zorunda kalmayacagiz.

import axios from "axios";
import { updateUserInfo } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useAuthCall = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signIn = async (userCredentials) => {
        // Buraya login islemi yaparken kullanacagimiz kodlari yazacagiz. Ornegin axios ile api'ye istek atmak, gelen cevaba gore store'u guncellemek, toast mesajlari gosterme gibi islemler burada olacak.
        try{
      const { data } = await axios.post(`${BASE_URL}auth/login`,userCredentials);
      console.log(data);

      dispatch(updateUserInfo(data)); // authSlice'daki updateUserInfo reducer'ini dispatch ederek kullanici bilgilerini ve token'ini store'a kaydediyoruz. Bu sayede diger componentlerde useSelector hook'u ile auth slice'indaki currentUser veya token bilgisine erisebiliriz.

      navigate('/stock'); // login islemi basarili olduktan sonra kullaniciyi stock sayfasina yonlendiriyoruz.


      toast.success("Login Successful", {
        description:`Welcome back, ${data.user.username}!`,
      });

    }catch (error) {
      // console.log("error:", error);
      toast.error("Login Faild", {
        description:
          error.response?.data?.message ||
          error?.message ||
          "Please check your credentials",
      });
    }
    }

    const signUp = async (userCredentials) => {
        try {
      const { data } = await axios.post(
        `${BASE_URL}users`,
        userCredentials,
      );
      // console.log(data);

      dispatch(updateUserInfo(data));

      toast.success("Login Successfull!", {
        description: `Welcome back, ${data.data.username}`,
      });

      navigate("/stock");
    } catch (error) {
      // console.log("error:", error);
      toast.error("Login Faild", {
        description:
          error.response?.data?.message ||
          error?.message ||
          "Please check your credentials",
      });
    }
        // Buraya register islemi yaparken kullanacagimiz kodlari yazacagiz. Ornegin axios ile api'ye istek atmak, gelen cevaba gore store'u guncellemek, toast mesajlari gosterme gibi islemler burada olacak.Bir kullanci olustururken apiye neden istek atyioruz? Cunku kullanici bilgilerini backend tarafinda da saklamamiz gerekiyor. Boylece kullanici sisteme girdiginde backend tarafinda kayitli olan bilgileri kontrol ederek kullanicinin kimligini dogrulayabiliriz. Ayrica kullanici olustururken backend tarafinda yapilan islemler (ornegin sifre hashing) gibi islemler de var. Bu islemleri frontend tarafinda yapmamiz guvenlik acisindan uygun olmaz. Bu nedenle kullanici olustururken api'ye istek atarak backend tarafinda gerekli islemlerin yapilmasini sagliyoruz.
    }

    const signOut = () => {

    }

    return { signIn, signUp, signOut };
}

export default useAuthCall;