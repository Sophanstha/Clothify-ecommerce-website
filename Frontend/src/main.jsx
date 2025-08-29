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

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home/>} />
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>   
      <Route path='/profile' element ={<Profile/>}/>
      <Route path='/collection/all' element={<Collection/>} />
      <Route path='/product/:id' element={<BestSeller/>}/>
      <Route path='/checkout' element={<Checkout/>}/>
      <Route path='/confrimOrder' element={<ConfirmOrder/>}/>
      <Route path='/order/:id' element={<OrderDetail/>}/>
      <Route path='/admin' element={<Adminlayout/>}>
      <Route index element={<AdminHomePage/>}/>
      <Route path='user' element={<User/>}/>
      <Route  path='product' element={<ProductManagment/>}/>
      <Route  path='product/:id' element={<EditProductPage/>}/>
      <Route path='order' element={<OrderManagment/>}/>
      </Route>
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
 <RouterProvider router={route} />
  </StrictMode>

)
