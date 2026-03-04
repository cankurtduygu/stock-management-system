import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: { // bu reducer store da state'i nasil guncelleyecegimizi belirler. updateUserInfo reducer'ini kullanarak currentUser ve token bilgilerini guncelleyebiliriz. Bu reducer, sign-in veya sign-up islemi sonrasinda kullanicinin bilgilerini ve token'ini store'a kaydetmek icin kullanilir. Reducer fonksiyonlari, state'i guncellemek icin kullanilir ve bu fonksiyonlar action'lar tarafindan tetiklenir. Ornegin, bir component'te sign-in islemi basarili oldugunda, updateUserInfo action'ini dispatch ederek kullanici bilgilerini ve token'ini store'a kaydedebiliriz.bunu biz store da nasil import edecegiz peki? store.js dosyasında authSlice.reducer'ini import ederek store'a ekleyecegiz. Ornegin, import authReducer from "@/features/authSlice"; seklinde import edebiliriz ve sonra configureStore fonksiyonunda reducer olarak auth: authReducer seklinde ekleyebiliriz. Boylece store'da auth slice'ini kullanarak currentUser ve token bilgilerini yönetebiliriz.
    updateUserInfo: (state, { payload }) => {
      console.log(payload);
      if (payload.user) { // sign-in isleminde user bilgisi 'payload.user' olarak gelir
        const { email, username, isAdmin, firstName, lastName } = payload.user;
        state.currentUser = { email, username, isAdmin, firstName, lastName };
      } else { // sign-up isleminde user bilgisi 'payload.data' olarak gelir
        const { email, username, isAdmin, firstName, lastName } = payload.data;
        state.currentUser = { email, username, isAdmin, firstName, lastName };
      }
      state.token = payload.token;
    },
  },
});

export const { updateUserInfo } = authSlice.actions; //recuderi export ediyoruz.

export const selectCurrentUser = (state) => state.auth.currentUser; //bu fn leri de export ediyoruz ki componentlerde kullanabilelim. state.auth.currentUser ile auth slice'indaki currentUser'a erisebiliyoruz.
export const selectAuthToken = (state) => state.auth.token; // bu fn ile de token'a erisebiliyoruz.Bu fn ler nereden geliyor? Redux store'daki state'i parametre olarak alır ve auth slice'indaki currentUser veya token'a erisebiliriz.Burda state.auth.currentUser veya state.auth.token diyerek auth slice'indaki currentUser veya token'a erisebiliriz. Bunlar ne zaman kullanilir? Componentlerde useSelector hook'u ile bu selector fn lerini kullanarak auth slice'indaki currentUser veya token'a erisebiliriz. Ornegin, const currentUser = useSelector(selectCurrentUser); seklinde kullanabiliriz. Bu sayede componentlerimizde auth slice'indaki currentUser veya token bilgisine erisebiliriz.

export default authSlice.reducer;