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
import { store } from './state/store';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './features/authSlice';
import { Toaster } from '@/components/ui/sonner';



const router = createBrowserRouter([
  { path: '/', element: <Home />, errorElement: <Error /> },
  { path: 'sign-in', element: <SignIn /> },
  { path: 'sign-up', element: <SignUp /> },
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
            element: <div>Brands Page</div>,
          },
          {
            path: 'firms',
            element: <div>Firms Page</div>,
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
      {/* <h1>app</h1> */}
      <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster richColors position='top-right' /> {/* Buna detayli bak baska ne öyellikleri var*/}
      </Provider>
      
    </>
  );
}

export default App;

function ProtectedRoute() {
  // console.log(user);
  // const currentUser = true;

  const currentUser = useSelector(selectCurrentUser); // Replace with actual authentication logic

  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}
