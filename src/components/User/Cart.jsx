import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import { HiShoppingCart } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import UserNavbar from './Navbar/UserNavbar';
import MiniNavBar from './Navbar/MiniNavBar';
import MiniNavbarFooter from './Navbar/MiniNavbarFooter';
import ProgressBar from './ProgressBar'; 
import '../Styles/style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Cart() {

    const authid = localStorage.getItem('authid');
    const navigate=useNavigate()
    const isMobile = useMediaQuery({ query: '(max-width: 980px)' });
    const selectedTheme = localStorage.getItem("selectedTheme");
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [orderProducts, setOrderProducts] = useState([]); // List of products from order table
    const [productCount, setProductCount] = useState({});
    const authrole = localStorage.getItem('authrole');
    if(authrole!='user'){
      navigate('*')
    }

    const deleteProduct = async (productId) => {
        try {
          await axios.delete(`https://shophubbackend.onrender.com/api/cart/cart/${authid}/${productId}`);
          fetchproduct();
        } catch (error) {
          console.error('Error deleting product from cart:', error);
        }
      };

     useEffect(() => {
        const authid= localStorage.getItem('authid')
        if(!authid){
          navigate('/login')
        }
    },[])

    const [product,setproduct]= useState([])

    const fetchproduct=async()=>{
        const res=await axios.get(`https://shophubbackend.onrender.com/api/cart/getcartbyuserid/${localStorage.getItem('authid')}`)
      setproduct(res.data)
      console.log(res.data)
    }


    useEffect(() => {
        fetchproduct()
    },[])

    const handleCardClick = (productId) => {
    console.log(productId)
    navigate(`/productdetails?productId=${productId}`);
    };

  

  const initializeProductCount = (cartItems) => {
    const initialCount = {};
    cartItems.forEach((cart) => {
      initialCount[cart.productDetails._id] = 1;
    });
    setProductCount(initialCount);
  };

  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.includes(productId)
        ? prevSelectedProducts.filter((id) => id !== productId)
        : [...prevSelectedProducts, productId]
    );
  };

  const isProductSelected = (productId) => selectedProducts.includes(productId);

  const orderclick = async () => {
    const cartItems = product;
    const selectedProduct = cartItems.find((cartItem) =>
      isProductSelected(cartItem.productDetails._id)
    );
  
    if (!selectedProduct) {
      toast.warning("Please select a product to order.");
      return;
    }
  
    const authid = localStorage.getItem('authid');
    const productId = selectedProduct.productDetails._id;
  
    try {
      const res = await axios.get(`https://shophubbackend.onrender.com/api/cart/quantity/${authid}/${productId}`);
      const cartData = res.data;
  
      if (!cartData) {
        console.error(`Cart data not found for product: ${productId}`);
        return;
      }
  
      const order = {
        userid: authid,
        productid: productId,
        sellerid: selectedProduct.productDetails.sellerid,
        quantity: cartData.quantity,
        price: selectedProduct.productDetails.price,
        total: cartData.total,
      };
  
      console.log(`Quantity for product ${productId}: ${cartData.quantity}`);
      console.log('Selected Order:', order);
  
      const orderRes = await axios.post(`https://shophubbackend.onrender.com/api/order/place`, [order]);
      console.log('Order placed:', orderRes.data);
  
      navigate('/checkout');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };
  

  const handleCheckboxClick = (productId) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(productId)) {
        return prevSelectedRows.filter((id) => id !== productId);
      } else {
        return [...prevSelectedRows, productId];
      }
    });
  };

  const fetchOrderProducts = async () => {
    try {
      const res = await axios.get(`https://shophubbackend.onrender.com/api/order/user/${localStorage.getItem('authid')}`);
      setOrderProducts(res.data);
    } catch (error) {
      console.error('Error fetching order products:', error);
    }
  };

  useEffect(() => {
    fetchproduct();
    fetchOrderProducts();
  }, []);

  const isProductInOrder = (productId) => {
    return orderProducts.some((product) => product.productid === productId);
  };

  const incrementQuantity = async (productId,e,q,cq ) => {
    e.preventDefault();
    try {
      if(q<=cq){
        toast.warning(`Only ${q} items available`)
return
      }
      else {
      const authid = localStorage.getItem('authid');
      const res = await axios.get(`https://shophubbackend.onrender.com/api/cart/increment/${authid}/${productId}`);
      const updatedCart = res.data.cart;
      console.log("quantity : ", updatedCart.quantity);
      console.log("productid : ",productId)
      console.log("authid : ",authid)
      fetchproduct();}
    } catch (error) {
      console.error('Error incrementing quantity:', error);
    }
  };

  const decrementQuantity = async (productId,e ) => {
    e.preventDefault();
    try {
      const authid = localStorage.getItem('authid');
      const res = await axios.get(`https://shophubbackend.onrender.com/api/cart/decrement/${authid}/${productId}`);
      const updatedCart = res.data.cart;
      console.log("quantity : ", updatedCart.quantity);
      console.log("productid : ",productId)
      console.log("authid : ",authid)
      fetchproduct();
      
    } catch (error) {
      console.error('Error decrementing quantity:', error);
    }
  };

  const deleteOrders = async () => {
    try {
      await axios.delete(`https://shophubbackend.onrender.com/api/order/delete/${localStorage.getItem('authid')}`, {
        params: { status: 'waiting for confirmation' },
      });
      console.log('Orders with status "waiting for confirmation" deleted.');
    } catch (error) {
      console.error('Error deleting orders:', error);
    }
  };

  useEffect(() => {
    deleteOrders();
  }, []);


  return (
    <div className='Cart-div' data-theme={selectedTheme} style={{minHeight:'100vh'}}>
        <div>
          {isMobile ? <MiniNavBar /> : <UserNavbar />} 
        </div>
        <div className='container'>
            <div className='cardcart'>
            {/* <div class="progress-container">
            <div class="progress" id="progress"></div>
            <div class="text-wrap active">
                <div class="circle" style={{color:'white'}}>1</div>
                <p class="text-active">Customer</p>
            </div>
            <div class="text-wrap">
                <div class="empty-circle">2</div>
                <p class="text">Delivery</p>
            </div>
            <div class="text-wrap">
                <div class="empty-circle">3</div>
                <p class="text">Payment</p>
            </div>
            <div class="text-wrap">
                <div class="empty-circle">4</div>
                <p class="text">Review</p>
            </div>
        </div> */}
              <div>
                <div className='carthead mt-5'>
                  <h1>
                    <HiShoppingCart className='cartheadicon' size={52} color='red' />
                    My cart
                  </h1>
                </div>
                <div className='table-responsive'>
                  <table className='table cart_table ms-5 mt-5' data-theme={selectedTheme}>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Delete</th>
                      </tr>
                      </thead>
                      <tbody>
                        {product.map((cart, index) => (
                         <tr
                         key={index}
                         className={isProductSelected(cart.productDetails._id) ? 'selected-row' : ''}
                     >
                            <td className='cart_checkbox align-middle'>
                              <input
                                type='checkbox'
                                checked={isProductSelected(cart.productDetails._id)}
                                onChange={() => handleCheckboxChange(cart.productDetails._id)}
                              />
                            </td>
                            <td className='cart-img' onClick={() => handleCardClick(cart.productDetails._id)}>
                              <img
                                className='cart_image'
                                src={`${cart.productDetails.image}`}
                                alt={cart.productDetails.productName}
                              />
                            </td>
                            <td className='cart_name align-middle cart-cell' onClick={() => handleCardClick(cart.productDetails._id)}>
                              {cart.productDetails.productName}
                            </td>
                            <td className='cart_counter align-middle cart-cell'>
                              <button className='box_left-box' onClick={(e) => decrementQuantity(cart.productDetails._id, e)}>
                                -
                              </button>
                              <span className="box_center-box align-middle quantity">{cart.quantity}</span>
                              <button className='box_right-box' onClick={(e) => incrementQuantity(cart.productDetails._id, e,cart.productDetails.quantity,cart.quantity)}>
                                +
                              </button>
                            </td>
                            <td className='cart_price align-middle'>₹{cart.total}</td>
                            <td className='deleteicon align-middle'>
                              <MdDelete size={24} onClick={() => deleteProduct(cart.productDetails._id)} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button className="button-25" role="button" onClick={orderclick}>
                    Order
                  </button>
                </div>
              </div>
        </div>
        <div>
          {isMobile && <MiniNavbarFooter />}      
      </div>
      <ToastContainer />
    </div>
  )
}

export default Cart