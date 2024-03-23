import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { LuFileBox } from 'react-icons/lu';
import UserNavbar from './Navbar/UserNavbar';
import MiniNavBar from './Navbar/MiniNavBar';
import MiniNavbarFooter from './Navbar/MiniNavbarFooter';
import { FaAddressCard } from "react-icons/fa6";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/style.css';
 
function OrderDetails() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const authrole = localStorage.getItem('authrole');
    if(authrole!='user'){
      navigate('*')
    }
    const orderId = searchParams.get('orderId');
    const productId = searchParams.get('productId');
    const isMobile = useMediaQuery({ query: '(max-width: 980px)' });
    const selectedTheme = localStorage.getItem("selectedTheme");
    const [showButton, setShowButton] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [product, setProduct] = useState({});
    const [averageRating, setAverageRating] = useState(0);
    const [transactionDetails, setTransactionDetails] = useState(null);
    const [order, setOrder] = useState(null);
    const [showCancelOverlay, setShowCancelOverlay] = useState(false);
    const navigate = useNavigate();
    

    useEffect(() => {
    
        const fetchOrderDetails = async () => {
          try {
            const res = await axios.post(`https://shophubbackend.onrender.com/api/order/getOrderDetails/${orderId}`);
            setOrderDetails(res.data);
          } catch (error) {
            console.error('Error fetching order details:', error);
          }
        };
    
        fetchOrderDetails();
    }, [orderId]);
    
    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const res = await axios.post(`https://shophubbackend.onrender.com/api/products/display/${productId}`);
            setProduct(res.data);
          } catch (error) {
            console.error('Error fetching product:', error);
          }
        };
    
        fetchProduct();
    }, [productId]);

    useEffect(() => {
        const fetchAverageRating = async () => {
          try {
            const res = await axios.get(`https://shophubbackend.onrender.com/api/review/averagerating/${productId}`);
            if (res.data) {
              setAverageRating(res.data.averageRating);
            }
          } catch (error) {
            console.error('Error fetching average rating:', error);
          }
        };
    
        fetchAverageRating();
    }, [productId]);

    const rateProduct = () => {
        navigate(`/review?productId=${product._id}`);
    };

    useEffect(() => {
      const fetchTransactionDetails = async () => {
        try {
          console.log("order id : ", orderId);
          const res = await axios.get(`https://shophubbackend.onrender.com/api/transaction/getTransactionDetails/${orderId}`);
    
          if (res.data) {
            
            const transactionDate = new Date(res.data.date);
            const formattedDate = `${transactionDate.toLocaleString('en-US', { weekday: 'long' })}, ${transactionDate.getDate()} ${transactionDate.toLocaleString('en-US', { month: 'long' })} ${transactionDate.getFullYear()}`;
            res.data.date = formattedDate;
    
            setTransactionDetails(res.data);
          }
        } catch (error) {
          console.error('Error fetching transaction details:', error);
        }
      };
    
      fetchTransactionDetails();
    }, [orderId]);

    const handleMakePayment = async () => {

      const res = await axios.get(`https://shophubbackend.onrender.com/api/transaction/getTransactionDetails/${orderId}`);
      const status= res.data.status;
      //console.log("Order status:",status);
      if (status=== 'unpaid') {
        navigate(`/payment?orderId=${orderId}&productId=${productId}`);
        //console.log('Payment logic goes here');
      } else {
        toast.error('Payment has already been made for this order.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000 // Close the notification after 3 seconds
        });
      }
    };

    const returnorcancel = async () => {

      const res = await axios.post(`https://shophubbackend.onrender.com/api/order/getOrderDetails/${orderId}`);
      const status= res.data.status;
      console.log("Order status:",status);
      if (status=== 'delivered') {

        const deliveryDateStr = res.data.deliverydate;
        const deliveryDate = new Date(deliveryDateStr);
        console.log("delivery date : ",deliveryDate);
        const currentDate = new Date();

        console.log("today : ",currentDate)
        const differenceInDays = Math.floor((currentDate - deliveryDate) / (1000 * 60 * 60 * 24));
        
        console.log("dif : ",differenceInDays)
    
        if (differenceInDays <= 7) {
          navigate(`/ordereturn?orderId=${orderId}`);
        }
        
      } else {
        setShowCancelOverlay(true);
      }
    };

    const handleCancelOrder = () => {
      
      setShowCancelOverlay(false);

    };

    const handleCheck = async () => {
      const res = await axios.get(`https://shophubbackend.onrender.com/api/transaction/getTransactionDetails/${orderId}`);
      const pay= res.data.mode;
      console.log('role : ',pay)
      if(pay==='cod'){
        setShowButton(true);
        
      }
      else{
        setShowButton(false);
      }
    }

    useEffect(() => {
      handleCheck();
  },[])

  const handleCardClick = (productId) => {
    console.log(productId)
    navigate(`/productdetails?productId=${productId}`);
    };


  return (
    <div className='order-details-div' data-theme={selectedTheme} style={{minHeight:'100vh'}}>
        <div >
          {isMobile ? <MiniNavBar /> : <UserNavbar />} 
        </div>
        <div>
  <h2 className='mt-5'>
    <LuFileBox size={40} color='red' /> Order Details
  </h2>
  <div className='container'>
  <div className="row mt-5">
    <div className="col-md-4 text-left pr-3">
      <h2 className='order-details-h2 mt-4'>
      <FaAddressCard size={32}/> Delivery Address</h2>
      {orderDetails && (
        <div className='order-details-add-div ms-5 mt-5'>
          <p className='order-det-p'>{orderDetails.name}</p>
          <p>{orderDetails.address} , {orderDetails.place}</p>
          <p>{orderDetails.mobile1}</p>
        </div>
      )}
    </div>
    <div className="col-md-4 mt-3">
    <h2 className='order-details-h2'><span className="icon">&#128736;</span> Product info</h2>
      <div className="d-flex">
        <img src={`${product.image}`} onClick={() => handleCardClick(product._id)} className='order-detail-img ms-5 mt-5' alt="Product" />
        <div className="d-flex flex-column text-left ml-3">
          <p className='order-detail-names ms-3 mt-5' onClick={() => handleCardClick(product._id)}>{product.productName}</p>
          <p className='order-detail-name ms-3'> {averageRating} ★</p>
          <p className='order-detail-sel ms-3'>Seller: {product.sellerName}</p>
          <button className='rateing-button ms-3' onClick={rateProduct}>Rate Product</button>
        </div>
      </div>
    </div>
    <div className="col-md-4 text-left mt-1 ml-3">
      <h2 className='order-details-h2'><span className="icon">&#128640;</span> Payment info</h2>
      <div>
        {transactionDetails ? (
          <div>
            <p className='ms-5 mt-5 order-detail-sel'>Payment Mode: {transactionDetails.mode}</p>
            <p className='ms-5 order-detail-sel'>Amount: ₹ {transactionDetails.amount}</p>
            <p className='ms-5 order-detail-sel'>Date: {transactionDetails.date}</p>

            {showButton && (
              <button
                onClick={handleMakePayment}
                className="btn btn-success"
                style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '10px' }}
              >
                Make Payment
              </button>
            )}
          </div>
        ) : (
          <p>Loading transaction details...</p>
        )}
      </div>
    </div>
  </div>

  {/* <button
    onClick={returnorcancel}
    className="btn btn-danger mt-4"
    style={{fontWeight: 'bold' }}
  >
    Revoke Order
  </button> */}

  {showCancelOverlay && (
    <div className="overlay">
      <div className="overlay-content">
        <h2>Cancel Order</h2>
        <p>Are you sure you want to cancel this order?</p>
        <div>
          <label htmlFor="reason">Select a reason:</label>
          <select id="reason" className="form-control">
            <option value="item_not_needed">Item is not needed</option>
            <option value="found_better_deal">Found a better deal</option>
            <option value="delayed_delivery">Delayed delivery</option>
            <option value="other">Other (please specify)</option>
          </select>
          <div>
            <textarea
              id="reasonDetails"
              placeholder="Additional details (optional)"
              className="form-control"
            ></textarea>
          </div>
        </div>
        <button onClick={handleCancelOrder} className="btn btn-danger">Yes, Cancel</button>
        <button onClick={() => setShowCancelOverlay(false)} className="btn btn-secondary">No, Go Back</button>
      </div>
    </div>
  )}
</div>
</div>
<div>
        {isMobile && <MiniNavbarFooter />}      
      </div>
    </div>
  )
}

export default OrderDetails