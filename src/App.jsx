import { createBrowserRouter } from 'react-router-dom';
import { Button } from './components/ui/button';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import { RouterProvider } from 'react-router-dom';
import SignIn from './pages/SignIn';

const router = createBrowserRouter([
  { path: '/', element: <Home />, errorElement: <Error /> },
  { path: 'sign-in', element: <SignIn /> },
  { path: 'sign-up', element: <SignUp /> },
  // {path:"stock",
  //   element:<ProtectedRoute />,
  //    errorElement:<Error />,
  //    children: [
  //     {
  //       element: <DashboardLayout />,
  //       children: [
  //         {
  //           index: true,
  //           element: <div>Dashboard Home</div>,
  //         },
  //         {
  //           path: "brands",
  //           element: <div>Brands Page</div>,
  //         },
  //         {
  //           path: "firms",
  //           element: <div>Firms Page</div>,
  //         },
  //         {
  //           path: "products",
  //           element: <div>Products Page</div>,
  //         },
  //         {
  //           path: "purchases",
  //           element: <div>Purchases Page</div>,
  //         },
  //         {
  //           path: "sales",
  //           element: <div>Sales Page</div>,
  //         },
  //       ],
  //     },
  //    ]
  //   },
]);

function App() {
  return (
    <>
      {/* <h1>app</h1> */}

      <RouterProvider router={router} />
    </>
  );
}

export default App;

function ProtectedRoute() {
  // const currentUser = useSelecetor(selectCurrentUser);
}
