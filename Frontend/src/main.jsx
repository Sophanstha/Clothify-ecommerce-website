import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import Collection from './pages/Collection.jsx'
import BestSeller from './component/Product/BestSeller.jsx'
import Checkout from './pages/Checkout.jsx'
import ConfirmOrder from './pages/ConfirmOrder.jsx'
import OrderDetail from './pages/OrderDetail.jsx'
import Adminlayout from './component/Admin/Adminlayout.jsx'
import AdminHomePage from './component/Layout/AdminHomePage.jsx'
import User from './component/Layout/User.jsx'
import ProductManagment from './component/Layout/ProductManagment.jsx'
import EditProductPage from './component/Layout/EditProductPage.jsx'
import OrderManagment from './component/Layout/OrderManagment.jsx'
import ProtectedRoute from './component/Common/ProtectedRoute.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import {Provider} from "react-redux"
import store from './redux/store.jsx'

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home/>} />
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>   
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/reset-password/:token' element={<ResetPassword/>}/>
      <Route path='/collection/all' element={<Collection/>} />
      <Route path='/product/:id' element={<BestSeller/>}/>
      
      {/* Protected Customer Routes */}
      <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
      <Route path='/checkout' element={<ProtectedRoute><Checkout/></ProtectedRoute>}/>
      <Route path='/confrimOrder' element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>}/>
      <Route path='/order/:id' element={<ProtectedRoute><OrderDetail/></ProtectedRoute>}/>

      {/* Protected Admin Routes */}
      <Route path='/admin' element={<ProtectedRoute roleRequired='admin'><Adminlayout/></ProtectedRoute>}>
        <Route index element={<AdminHomePage/>}/>
        <Route path='user' element={<User/>}/>
        <Route path='product' element={<ProductManagment/>}/>
        <Route path='product/:id' element={<EditProductPage/>}/>
        <Route path='order' element={<OrderManagment/>}/>
      </Route>
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
 <RouterProvider router={route} />

  </Provider>
  

)
