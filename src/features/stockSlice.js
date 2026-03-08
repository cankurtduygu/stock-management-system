import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  firms: [],
  firmSingle: null,
  brands: [],
  categories: [],
  products: [],
  sales: [],
  purchases: [],
};

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    //data cekme islemi baslatildiginde loading true yap ve erroru null yap aslinda pendging yazmisiz
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // firmSuccess: (state, { payload }) => {
    //     state.loading = false;
    //     state.firms = payload
    // },
    // brandSuccess: (state, { payload }) => {
    //     state.loading = false;
    //     state.brands = payload
    // },

    //data cekme islemi basarili oldugunda loading false yap ve gelen datayi ilgili state'e at aslinda fulfilled yazmisiz
    fetchSuccess: (state, { payload: { url, data } }) => {
      console.log(url, data);
      state.loading = false;
      state[url] = data; //objelere ulasmanin iki yolu vardi burda köseli parantez ile ulastik
    },

    //data cekme islemi basarisiz oldugunda loading false yap ve errora gelen hatayi at aslinda rejected yazmisiz
    fetchFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  fetchStart,
  fetchFail,
  fetchSuccess,
  // firmSuccess,
  // brandSuccess
} = stockSlice.actions;

export const selectLoading = (state) => state.stock.loading;
export const selectError = (state) => state.stock.error;
export const selectFirms = (state) => state.stock.firms;//burada selectFirms adini verdik ama aslinda state.stock.firms a ulasiyoruz. Yani stockSlice'da tanimladigimiz firms state'ine ulasmak icin selectFirms selector'ini kullanacagiz. Bu selector, state'in stock altindaki firms verisini döndürecek. Bu sayede componentlerimizde useSelector(selectFirms) kullanarak firms verisine kolayca erişebiliriz.
export const selectFirmSingle = (state) => state.stock.firmSingle;
export const selectCategories = (state) => state.stock.categories;
export const selectBrands = (state) => state.stock.brands;
export const selectProducts = (state) => state.stock.products;
export const selectSales = (state) => state.stock.sales;
export const selectPurchases = (state) => state.stock.purchases;


export default stockSlice.reducer;
