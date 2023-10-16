import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));
const AdminLayout = Loadable(lazy(() => import('../layouts/Admin/full/FullLayout')));

/* ****Pages***** */
const Products = Loadable(lazy(() => import('../views/products/Products')));
const RegisterPage = Loadable(lazy(() => import('../views/books/RegisterPage')));
const Icons = Loadable(lazy(() => import('../views/icons/Icons')));
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')));
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const ForgotPassword = Loadable(lazy(() => import('../views/authentication/Forgetpassword')));
const AuthResetPassword = Loadable(lazy(() => import('../views/authentication/ResetPassword')));
const BoookDetailsPage = Loadable(
  lazy(() => import('../views/books/BookDetails/BoookDetailsPage')),
);
const Profile = Loadable(lazy(() => import('../views/ProfilePage/Profile')));
const HomePage = Loadable(lazy(() => import('../views/Home/HomePage')));
const AboutUs = Loadable(lazy(() => import('../views/AboutUs/AboutUs')));
const Customers = Loadable(lazy(() => import('../views/customers/Customer')));
const ARContent = Loadable(lazy(() => import('../views/AR Content/ARContent')));
const OTPVerification = Loadable(lazy(() => import('../views/OTPVerfication/OTPVerification')));
const AdminProfile=Loadable(lazy(() => import('../views/ProfilePage/AdminProfile')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/auth/login" /> },
      { path: '/home', exact: true, element: <HomePage /> },
      { path: '/products', exact: true, element: <Products /> },
      { path: '/customers', exact: true, element: <Customers /> },
      { path: '/arcontent', exact: true, element: <ARContent /> },
      { path: '/registerbook', exact: true, element: <RegisterPage /> },
      { path: '/aboutus', exact: true, element: <AboutUs /> },
      { path: '/bookdetails', exact: true, element: <BoookDetailsPage /> },
      { path: '/profile', exact: true, element: <Profile /> },
      { path: '/icons', exact: true, element: <Icons /> },
      { path: '/ui/typography', exact: true, element: <TypographyPage /> },
      { path: '/ui/shadow', exact: true, element: <Shadow /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/forgotpassword', element: <ForgotPassword /> },
      { path: '/auth/resetpassword/:id/:token', element: <AuthResetPassword /> },
      { path: '/auth/otpverification', element: <OTPVerification /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {path: '/admin/home', exact: true, element: <HomePage /> },
      {path: '/admin/aboutus', exact: true, element: <AboutUs /> },
      {path: '/admin/profile', exact: true, element: <AdminProfile /> },
    ]
  },
  
];

export default Router;
