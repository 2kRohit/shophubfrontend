import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import UserNavbar from './Navbar/UserNavbar';
import MiniNavBar from './Navbar/MiniNavBar';
import MiniNavbarFooter from './Navbar/MiniNavbarFooter';
import '../Styles/style.css'

function Order() {

    const navigate = useNavigate();
    const authrole = localStorage.getItem('authrole');
    if(authrole!='user'){
      navigate('*')
    }
    const isMobile = useMediaQuery({ query: '(max-width: 980px)' });
    const selectedTheme = localStorage.getItem("selectedTheme");
  const [orderHistory, setOrderHistory] = useState([]);
  const [showUser, setShowUser] = useState(false);
  const [showUser1, setShowUser1] = useState(false);

  useEffect(() => {
    fetchOrderHistory();
    handleCheck();
  }, []);

  const fetchOrderHistory = async () => {
    try {
      const res = await axios.post(`https://shophubbackend.onrender.com/api/order/getorderbyuserid/${localStorage.getItem('authid')}`);
      setOrderHistory(res.data);
    } catch (error) {
      console.error('Error fetching order history:', error);
    }
  };

  function getDayName(date) {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek[date.getDay()];
  }
  
  function getMonthName(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[date.getMonth()];
  }

  const orderDetail = (orderId, productId ) => {
    /*console.log("order id  : ", orderId)
    console.log("product id : ",productId)*/
    navigate(`/orderdetails?orderId=${orderId}&productId=${productId}`);
  };

  const handleCheck = async () => {
    const res = await axios.get(`https://shophubbackend.onrender.com/api/user/userdetail/${localStorage.getItem('authid')}`);
    const role= res.data.trade;
    console.log('role : ',role)
    if(role==='sell'){
      setShowUser1(true);
      
    } 
    else{
      setShowUser(true);
    }
  }

  const handleCardClick = (productId) => {
    console.log(productId)
    navigate(`/productdetails?productId=${productId}`);
    };


  return (
     <div className='order-div' data-theme={selectedTheme} style={{minHeight:'100vh'}}>
        <div >
          {isMobile ? <MiniNavBar /> : <UserNavbar />} 
        </div>
        <div className="container">
      <h1>Order History</h1>
      <div className="table-responsive">
  <table className="table">
    <thead>
      <tr className='OrderHistroytr'>
        <th className='OrderHistroyth'>Order Id</th>
        <th className='OrderHistroyth'></th>
        <th className='OrderHistroyth'>Product</th>
        <th className='OrderHistroyth'>Date</th>
        <th className='OrderHistroyth'>Payment Status</th>
        <th className='OrderHistroyth'>Order Status</th>
        <th className='OrderHistroyth'>Price</th>
      </tr>
    </thead>
    <tbody>
      {orderHistory.map((order, index) => {
        const orderDate = new Date(order.date);
        const formattedDate = `${getDayName(orderDate)}, ${orderDate.getDate()} ${getMonthName(orderDate)}, ${orderDate.getFullYear()}`;
        return (
          <tr key={index} className='OrderHistroytr'>
            <td className='OrderHistroytd'>
              <a className='order-table-a' onClick={() => orderDetail(order.orderId, order.product.productId)}>{order.orderId}</a>
            </td>
            <td className='OrderHistroytd2'>
              <img src={`${order.product.image}`} alt={order.product.productName} onClick={() => handleCardClick(order.product.productId)}/>
            </td>
            <td className='OrderHistroytd3'  onClick={() => handleCardClick(order.product.productId)}>
              {order.product.productName}
            </td>
            <td className='OrderHistroytd'>{formattedDate}</td>
            <td className='OrderHistroytd'>{order.payment}</td>
            <td className='OrderHistroytd'>{order.status}</td>
            <td className='OrderHistroytd'>₹{order.total}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>
    </div>
    <div>
        {isMobile && <MiniNavbarFooter />}      
      </div>
    </div>
  )
}

export default Order