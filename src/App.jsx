import { createBrowserRouter } from 'react-router-dom';
import { Button } from './components/ui/button';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import { RouterProvider } from 'react-router-dom';
import SignIn from './pages/SignIn';
import DashboardLayout from './components/shared/DashboardLayout';
import Error from './pages/Error';
import { Navigate, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { persistor } from './state/store';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './features/authSlice';
import { Toaster } from '@/components/ui/sonner';
import { useTheme } from '@/hooks/useTheme';
import { PersistGate } from 'redux-persist/integration/react';
import Firms from './pages/Firms';
import Brands from './pages/Brands';
import FirmDetail from './pages/FirmDetail';


const router = createBrowserRouter([
  { path: '/', element: <Home />, errorElement: <Error /> },
  {
    element: <PublicOnlyRoute />,
    children: [
      { path: 'sign-in', element: <SignIn /> },
      { path: 'sign-up', element: <SignUp /> },
    ],
  },

  {
    path: 'stock',
    element: <ProtectedRoute />,
    errorElement: <Error />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <div>Dashboard Home</div>,
          },
          {
            path: 'brands',
            element: <Brands />,
          },
          {
            path: 'firms',
            element: <Firms />,
          },
           {
            path: 'firms/:id',
            element: <FirmDetail />,
          },
          {
            path: 'products',
            element: <div>Products Page</div>,
          },
          {
            path: 'purchases',
            element: <div>Purchases Page</div>,
          },
          {
            path: 'sales',
            element: <div>Sales Page</div>,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        {/* PersistGate, uygulamanın state'ini tarayıcıda saklamak ve yeniden yüklemek için kullanılır. Bu sayede kullanıcı sayfayı yenilediğinde veya uygulamayı kapatıp açtığında state korunur. */}
          <ThemeSync />
          <RouterProvider router={router} />
          <Toaster richColors position="top-right" />{' '}
          {/* Buna detayli bak baska ne öyellikleri var*/}
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;

function PublicOnlyRoute() {
  //currentUser varsa login olduktan sonra sign-in sayfasina gelmesini istemeyiz. Bu nedenle currentUser varsa stock sayfasina yönlendirecegiz, yoksa Outlet ile çocuk componentleri render edecegiz.
  const currentUser = useSelector(selectCurrentUser);

  return currentUser ? <Navigate to="/stock" replace /> : <Outlet />;
}

function ProtectedRoute() {
  // console.log(user);
  // const currentUser = true;

  const currentUser = useSelector(selectCurrentUser); // Replace with actual authentication logic

  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}

function ThemeSync() {

  //Bu component, uygulamanın tema durumunu yönetmek ve senkronize etmek için kullanılır. useTheme hook'u ile temayı alır ve günceller. Şu anda herhangi bir görsel çıktı üretmez, sadece temayı yönetir. İleride tema değiştirme özellikleri eklenebilir veya uygulamanın farklı bölümlerinde temaya erişim sağlanabilir.
  useTheme();
  return null;
}
