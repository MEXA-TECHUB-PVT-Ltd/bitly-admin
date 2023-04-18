import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const ManageUser = Loadable(lazy(() => import('views/ManageUsers')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/PrivacyPolicy')));
const TermsAndConditionssPage = Loadable(lazy(() => import('views/TermsAndConditions')));
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const AuthVerifyOTP3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/VerifyOTP3')));
const AuthResetPassword3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/ResetPassword3')));


// ==============================|| MAIN ROUTING ||============================== //
let MainRoutes = {}
if (localStorage.getItem('id')) {
    MainRoutes = {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <DashboardDefault />
            },
            {
                path: 'dashboard',
                children: [
                    {
                        path: 'default',
                        element: <DashboardDefault />
                    }
                ]
            },
            {
                children: [
                    {
                        path: 'terms-page',
                        element: <TermsAndConditionssPage />
                    }
                ]
            },
            {
                children: [
                    {
                        path: 'manage-user-page',
                        element: <ManageUser />
                    }
                ]
            },
            {
                path: 'privacy-page',
                element: <SamplePage />
            }
        ]
    }

} else {
    MainRoutes = {
        path: '/',
        element: <MinimalLayout />,
        children: [
            {
                path: '/',
                element: <AuthLogin3 />
            },
            {
                path: '/login',
                element: <AuthLogin3 />
            },
            {
                path: '/Verify_OTP',
                element: <AuthVerifyOTP3 />
            },
            {
                path: '/resetPassword',
                element: <AuthResetPassword3 />
            },

            {
                children: [
                    {
                        path: 'forget-passsword',
                        element: <AuthRegister3 />
                    }
                ]
            },
            {
                children: [
                    {
                        path: '/forgetPassword',
                        element: <AuthRegister3 />
                    }
                ]
            },
            {
                children: [
                    {
                        path: '/login',
                        element: <AuthLogin3 />
                    }
                ]
            }
        ]
    }
}

export default MainRoutes;
