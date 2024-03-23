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
import { toast } from 'react-toastify';


function OrderUpdate() {

    const [orders, setOrders] = useState([]);
    const [newStatus, setNewStatus] = useState('');
    const sellerId = localStorage.getItem('authid');
    const navigate=useNavigate()
    const authrole = localStorage.getItem('authrole');
    if(authrole!='seller'){
      navigate('*')
    }
    
  
    useEffect(() => {
      fetchOrders();
    }, []);
  
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`https://shophubbackend.onrender.com/api/order/orderdis/${sellerId}`);
        setOrders(res.data.orders);
        console.log("data : ",res.data)
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };
  
    const handleUpdateStatus = async (orderId) => {
      if (newStatus)
       {
        console.log('status : ',newStatus)
        console.log('order id : ',orderId)
        try {
          await axios.put(`https://shophubbackend.onrender.com/api/order/statusUpdate/${orderId}`, { status: newStatus });
          toast.success('Order status updated successfully');
          fetchOrders();
          setNewStatus('');
        } catch (error) {
          console.error('Error updating order status:', error);
          toast.error('Error updating order status');
        }
      } else {
        toast.warning('Please select a new status');
      }
    };

    const logout = () => {
      localStorage.removeItem('authid')
      navigate('/')      
  }

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
              <div className='admin-option-active ms-5 d-flex' onClick={()=>{navigate('/updateorder')}}>
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
              <div className='admin-option4 ms-5' onClick={()=>{navigate('/sellervieworder')}}>
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
        <div className='d-flex justify-content-center align-items-center main-form-div' /*style={{width:'100%'}}*/>
          <div className='table-responsive mx-auto my-auto ' style={{ maxHeight: '500px', overflowY: 'auto'}}>
    <table className='verifier_product_table' style={{marginLeft:'330px'}}>
      <thead>
          <tr className='verifierproduct_tr'>
              <th className='verifierproduct_th'>Order Id</th>
            <th className='verifierproduct_th'>Current Status</th>
            <th className='verifierproduct_th1'>New Status</th>
            <th className='verifierproduct_th'>Delivery Date</th>
            <th className='verifierproduct_th'></th>
          </tr>
        </thead>
        <tbody>
        
        {Array.isArray(orders) && orders.map(order => (
                <tr key={order._id} className='verifier_table_tr'>
                  <td className='verifier_product_td'>{order._id}</td>
                  <td className='verifier_product_td'>{order.status}</td>
                
                  <td className='verifier_product_td1'>
                  <section id="pattern3">
                <input 
                  type="radio" 
                  id="g3_1" 
                  name="newstatus"
                  value="pickup"
                  checked={newStatus === 'pickup'}
                  onChange={(e) => setNewStatus(e.target.value)}
                />
                <label for="g3_1" style={{paddingLeft:'10px'}}>    Pending Pickup</label>
                <br/>

                <input //className='radioinput' 
                  type="radio" 
                  id="g3_2" 
                  name="newstatus"
                  value="transit"
                  checked={newStatus === 'transit'}
                  onChange={(e) => setNewStatus(e.target.value)}
                />
                <label for="g3_2" style={{paddingLeft:'10px'}}>  In Transit</label>
                <br/>

                <input
                  type="radio" 
                  id="g3_3" 
                  name="newstatus"
                  value="outofdelivery"
                  checked={newStatus === 'outofdelivery'}
                  onChange={(e) => setNewStatus(e.target.value)}
                />
                <label for="g3_3" style={{paddingLeft:'10px'}}>  Out for Delivery</label>
                <br/>

                <input
                  type="radio" 
                  id="g3_4" 
                  name="newstatus"
                  value="delivered"
                  checked={newStatus === 'delivered'}
                  onChange={(e) => setNewStatus(e.target.value)}
                />
                <label for="g3_4" style={{paddingLeft:'10px'}}>  Delivered</label>
                <br/>

                </section>
              </td>

              <td className='verifier_product_tdate'>
                  <label className='datelabel' htmlFor="dateofbirth"></label>
                  <input className='datelabel' type="date" name="dateofbirth" id="dateofbirth" />
              </td>
              
                  <td className='verifier_product   _td'>
                    <button className="button-24" role="button" onClick={() => handleUpdateStatus(order._id)}>Update</button>
                  </td>
                </tr>
                
              ))}
            </tbody>
        
      </table>
      
          </div>
      </div>
    </div>
  )
}

export default OrderUpdate