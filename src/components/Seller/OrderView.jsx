import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { FaTag } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import { IoIosListBox } from "react-icons/io";
import { BsDatabaseFillAdd } from 'react-icons/bs';
import '../Styles/style.css'

function OrderView() {

    const sellerId = localStorage.getItem('authid');
    const [showLogoutOverlay, setShowLogoutOverlay] = useState(false);
    const [orderHistory, setOrderHistory] = useState([]);
    const navigate=useNavigate()
    const authrole = localStorage.getItem('authrole');
    if(authrole!='seller'){
      navigate('*')
    }

    const logout = () => {
      localStorage.removeItem('authid')
      navigate('/')      
  }

      useEffect(() => {
        fetchOrderHistory();
      }, []);
    
      const fetchOrderHistory = async () => {
        try {
          const res = await axios.get(`https://shophubbackend.onrender.com/api/order/orders/${sellerId}`);
          setOrderHistory(res.data);
        } catch (error) {
          console.error('Error fetching order history:', error);
        }
      };

      const orderDetail = (orderId) => {
        console.log("order id  : ", orderId)
        //console.log("product id : ",productId)
        navigate(`/sellerorderdetails?orderId=${orderId}`);
        console.log('order id ',orderId)
      };
    
  return (
    <div className='admin-home'>
    <div className='admin-nav'>
      <a href='/sellerhome'>
        <img src='/logo2.png' alt='ShopHub Logo' className='admin-nav-logo' />
      </a>
      <div className='mt-3'>
        <div className='admin-option'>
          <div className='admin-option1 ms-5 d-flex' onClick={()=>{navigate('/sellerhome')}}>
            <p className='option-p mt-3'>
              <AiOutlineHome style={{fontSize:'25'}} className='me-3'/>HOME
            </p>
          </div>
        </div>
        <div className='admin-option'>
          <div className='admin-option2 ms-5' onClick={() => { navigate('/addproduct') }}>
            <p className='option-p mt-3'>
              <BsDatabaseFillAdd style={{ fontSize: '15' }} className='me-3' />ADD PRODUCT
            </p>
          </div>
        </div>
        <div className='admin-option'>
          <div className='admin-option2 ms-5 d-flex' onClick={()=>{navigate('/updateorder')}}>
            <p className='option-p mt-3'>
              <IoIosListBox style={{fontSize: '25'}} className='me-3'/>UPDATE ORDER
            </p>
          </div>
        </div>
        <div className='admin-option'>
          <div className='admin-option3 ms-5' onClick={()=>{navigate('/productmanagement')}}>
            <p className='option-p mt-3'>
              <FaTag style={{fontSize: '15'}} className='me-3'/>MANAGE PRODUCT
            </p>
          </div>
        </div>
        <div className='admin-option'>
          <div className='admin-option-active ms-5' onClick={()=>{navigate('/sellervieworder')}}>
            <p className='option-p mt-3'>
              <FaEye style={{fontSize: '25'}} className='me-3'/>VIEW ORDER
            </p>
          </div>
        </div>
        <div className='admin-option'>
          <div className='admin-option5 ms-5' onClick={logout}>
            <p className='option-p mt-3'>
              <BiLogOut style={{fontSize: '25'}} className='me-3'/>LOGOUT
            </p>
          </div>
        </div>
      </div>
    </div>
      <div className='d-flex align-items-center'>
      <div className='table-responsive mx-auto my-auto' style={{ maxHeight: '500px', overflowY: 'auto', overflowX: 'auto'}}>
  <table className='verifier_product_table3'>
    <thead>
        <tr className='verifierproduct_tr'>
            
          <th className='verifierproduct_th'>Order Id</th>
          <th className='verifierproduct_th'>User Id</th>
          <th className='verifierproduct_th'>Product Id</th>
          <th className='verifierproduct_th'>Total</th>
          <th className='verifierproduct_th text-center'>Quantity</th>
          <th className='verifierproduct_th'>Status</th>     
        </tr>
      </thead>
      <tbody>
      {orderHistory.map((order, index) => (
            <tr key={index} className='verifier_table_tr'>
            <td className='verifier_product_td'>
              <a className='order-table-a' onClick={() => orderDetail(order._id)}>{order._id}</a>
            </td>
            <td className='verifier_product_td'>{order.userid}</td>
            <td className='verifier_product_td'>{order.productid}</td>
            <td className='verifier_product_td'>₹{order.total}</td>
            <td className='verifier_product_td'>{order.quantity}</td>
            <td className='verifier_product_td'>{order.status}</td>
          </tr>

          
      ))}
      </tbody>
    </table>
    </div>
        </div>
    </div>
  )
}

export default OrderView

