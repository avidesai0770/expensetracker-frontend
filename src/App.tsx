import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';

import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Expense from './pages/Expense/Expense';
import Home from './pages/Home/Home';
import Category from './pages/Category/Category';
import PublicRoute from './routes/publicRoute';
import PrivateRoute from './routes/privateRoute';
import MainLayout from './layouts/mainLayout';
import Profile from './pages/profile/Profile';
import Income from './pages/Income/Income';
import Transactions from './pages/transactions/Transactions';



function App() {


  return (
    <>
      <ToastContainer />
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />

          {/* Private Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Home />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/category"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Category />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/expense"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Expense />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/income"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Income />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Profile />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Transactions />
                </MainLayout>
              </PrivateRoute>
            }
          />

          {/* Default route */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Home />
                </MainLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
