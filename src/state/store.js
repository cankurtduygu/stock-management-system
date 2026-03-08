import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/features/authSlice';
import stockReducer from '@/features/stockSlice';
import themeReducer from '@/features/themeSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'stock-smart',
  storage,
  whitelist: ['auth', 'theme'], // sadece auth ve theme reducer'larını persist etmek istiyoruz
};

const rootReducer = {
  //persist kullandigimizda burasi rootReducer in ifade ettigi yer oluyor.
  auth: authReducer,
  theme: themeReducer,
  stock: stockReducer,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(rootReducer)
); //persisted ne demek: kalıcı, saklanan anlamına gelir. persistReducer, verilen reducer'ı persistConfig ile sarmalayarak kalıcı hale getirir. Bu sayede uygulama kapatılsa bile belirli reducer'ların durumu (state) saklanır ve uygulama tekrar açıldığında bu durum geri yüklenir. Yani persistedReducer, rootReducer'ın persistConfig ile yapılandırılmış halidir.rootReduceri combineReducers ile birleştiriyoruz çünkü birden fazla reducer'ımız var (auth, theme, stock) ve bunları tek bir rootReducer altında toplamak istiyoruz. combineReducers, her bir reducer'ı kendi anahtarı altında birleştirir ve tek bir reducer fonksiyonu döndürür. Bu sayede store oluştururken sadece persistedReducer'ı kullanarak tüm reducer'ları yönetebiliriz.

let store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.VITE_NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
export default store;
