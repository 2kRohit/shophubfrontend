import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/signup';
import Home from './components/Home';
import UserNavbar from './components/User/Navbar/UserNavbar';
import MiniNavBar from './components/User/Navbar/MiniNavBar';
import MiniNavbarFooter from './components/User/Navbar/MiniNavbarFooter';
import UserHome from './components/User/UserHome';
import Profile from './components/User/Profile';
import AddProduct from './components/User/AddProduct';
import UserHomeBody from './components/User/UserHomeBody';
import ProductDetails from './components/ProductDetails';
import Review from './components/User/Review';
import Order from './components/User/Order';
import ShippingAddress from './components/User/ShippingAddress';
import Cart from './components/User/Cart';
import Checkout from './components/User/Checkout';
import CreditCardForm from './components/User/CreditCardForm';
//import Wishlist from './components/User/Wishlist';
import Wishlists from './components/User/Wishlists';
import OrderDetails from './components/User/OrderDetails';
import Payment from './components/User/Payment';
import SearchProduct from './components/SearchProduct';
import Category from './components/Category';
import ProductType from './components/ProductType';
import Latest from './components/Latest';

import DarkMode from './components/DarkMode';

import AdminHome from './components/Admin/AdminHome';
import ManageProduct from './components/Admin/ManageProduct';
import ManageUsers from './components/Admin/ManageUsers';
import ManageSellers from './components/Admin/ManageSellers';
import ViewOrder from './components/Admin/ViewOrder';

import SellerHome from './components/Seller/SellerHome';
import OrderUpdate from './components/Seller/OrderUpdate';
import ProductMnagement from './components/Seller/ProductMnagement';
import ViewProduct from './components/Seller/ViewProduct';
import OrderView from './components/Seller/OrderView';
import ViewOrderDetails from './components/Admin/ViewOrderDetails';
import SellerViewOrder from './components/Seller/SellerViewOrder';
import SellerOrderDetails from './components/Seller/SellerOrderDetails';

import NotFound from './components/NotFound';
import Sample from './components/Admin/Sample';
import EdtProduct from './components/Seller/EdtProduct';



function App() {
  const selectedTheme = localStorage.getItem("selectedTheme");
  return (
    <div className="App"  data-theme={selectedTheme}>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/usernavbar' element={<UserNavbar/>}/>
          <Route path='/mininavbar' element={<MiniNavBar/>}/>
          <Route path='/navbarfooter' element={<MiniNavbarFooter/>}/>
          <Route path='/userhome' element={<UserHome/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/addproduct' element={<AddProduct/>}/>
          <Route path='/userhomebody' element={<UserHomeBody/>}/>
          <Route path='/productdetails' element={<ProductDetails/>}/>
          <Route path='/review' element={<Review/>}/>
          <Route path='/order' element={<Order/>}/>
          <Route path='/shippingaddress' element={<ShippingAddress/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/creditcardform' element={<CreditCardForm/>}/>
          {/* <Review path='/wishlist' element={<Wishlist/>}/> */}
          <Route path='/wishlists' element={<Wishlists/>}/>
          <Route path='/orderdetails' element={<OrderDetails/>}/>
          <Route path='/payment' element={<Payment/>}/>
          <Route path='/searchproduct' element={<SearchProduct/>}/>
          <Route path='/category' element={<Category/>}/>
          <Route path='/productype' element={<ProductType/>}/>
          <Route path='/latest' element={<Latest/>}/>

          <Route path='/adminhome' element={<AdminHome/>}/>
          <Route path='/manageproduct' element={<ManageProduct/>}/>
          <Route path='/manageuser' element={<ManageUsers/>}/>
          <Route path='/manageseller' element={<ManageSellers/>}/>
          <Route path='/vieworder' element={<ViewOrder/>}/>

          <Route path='/sellerhome' element={<SellerHome/>}/>
          <Route path='/updateorder' element={<OrderUpdate/>}/>
          <Route path='/productmanagement' element={<ProductMnagement/>}/>
          <Route path='/viewproduct' element={<ViewProduct/>}/>
          <Route path='/editproduct' element={<EdtProduct/>}/>
          <Route path='/orderview' element={<OrderView/>}/>
          <Route path='/vieworderdetails' element={<ViewOrderDetails/>}/>
          <Route path='/sellervieworder' element={<SellerViewOrder/>}/>
          <Route path='/sellerorderdetails' element={<SellerOrderDetails/>}/>

          <Route path='/darkmode' element={<DarkMode/>}/>
          <Route path='/Sample' element={<Sample/>}/>

          <Route path='*' element={<NotFound />} />       

        </Routes>
      </Router>
    </div>
  );
}

export default App;
