import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import { FaTag } from 'react-icons/fa';
import { GrUserManager } from "react-icons/gr";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ViewOrder() {

    const [orderHistory, setOrderHistory] = useState([]);
    const navigate=useNavigate()
    const authrole = localStorage.getItem('authrole');
    if(authrole!='admin'){
      navigate('*')
    }

    const logout = () => {
      localStorage.removeItem('authid')
      navigate('/')
    };
       
      useEffect(() => {
        fetchOrderHistory();
      }, []);
    
      const fetchOrderHistory = async () => {
        try {
          const res = await axios.post('https://shophubbackend.onrender.com/api/order/viewOrder');
          setOrderHistory(res.data);
        } catch (error) {
          console.error('Error fetching order history:', error);
        }
      };
    
      const handleAction = async (orderId) => {
        console.log("button clicked")
        if (orderId) {
            try{
              console.log('order id: ',orderId)
              const updateOrderResponse = await axios.put(`https://shophubbackend.onrender.com/api/order/confirmOrders/${orderId}`);
              if (updateOrderResponse.status === 200) {
                toast.success("order approved successfully!");
                console.log('Order status updated to confirmed.');
                window.location.reload(); 
              }
            }
            catch (error) {
              toast.error("can't approve!");
              console.error('Error order confirm:', error);
            }
          }
        }

        const orderDetail = (orderId ) => {
          /*console.log("order id  : ", orderId)
          console.log("product id : ",productId)*/
          navigate(`/vieworderdetails?orderId=${orderId}`);
          console.log('order id ',orderId)
        };

        const [searchQuery, setSearchQuery] = useState('');

        const handleSearch = (value) => {
          setSearchQuery(value);
        };
      
        const filteredOrders = orderHistory.filter(order => {
          const { orderId = '', userid = '', productid = '' } = order;
          const searchValue = searchQuery.toLowerCase();
          return orderId.toLowerCase().includes(searchValue) || 
                 userid.toLowerCase().includes(searchValue) ||
                 productid.toLowerCase().includes(searchValue);
        });
      

  return (
    <div className='admin-home'>
        <div className='admin-nav'>
          <a href='/adminhome'>
            <img src='/logo2.png' alt='ShopHub Logo' className='admin-nav-logo' />
          </a>
          <div className='mt-3'>
            <div className='admin-option'>
              <div className='admin-option2 ms-5 d-flex' onClick={()=>{navigate('/adminhome')}}>
                <p className='option-p mt-3'>
                  <AiOutlineHome style={{fontSize:'25'}} className='me-3'/>HOME
                </p>
              </div>
            </div>
            <div className='admin-option'>
              <div className='admin-option2 ms-5 d-flex' onClick={()=>{navigate('/manageuser')}}>
                <p className='option-p mt-3'>
                  <FaUsers style={{fontSize: '25'}} className='me-3'/>MANAGE USER
                </p>
              </div>
            </div>
            <div className='admin-option'>
              <div className='admin-option2 ms-5 d-flex' onClick={()=>{navigate('/manageseller')}}>
                <p className='option-p mt-3'>
                  <GrUserManager style={{fontSize: '25'}} className='me-3'/>MANAGE SELLER
                </p>
              </div>
            </div>
            <div className='admin-option'>
              <div className='admin-option3 ms-5' onClick={()=>{navigate('/manageproduct')}}>
                <p className='option-p mt-3'>
                  <FaTag style={{fontSize: '15'}} className='me-3'/>MANAGE PRODUCT
                </p>
              </div>
            </div>
            <div className='admin-option'>
              <div className='admin-option-active ms-5' onClick={()=>{navigate('/vieworder')}}>
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
        <div className='table-responsive mx-auto my-auto' style={{ maxHeight: '500px', overflowY: 'auto', overflowX: 'auto'}}>
        <div className='order-search-box'>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="order-search-input"
        />
        <button className="order-search-button">Search</button>

      </div>
      <table className='verifierproduct_table'>
        <thead>
          <tr className='verifierproduct_tr'>
            <th className='verifierproduct_th'>Order Id</th>
            <th className='verifierproduct_th'>User Id</th>
            <th className='verifierproduct_th'>Product Id</th>
            <th className='verifierproduct_th'>Price</th>
            <th className='verifierproduct_th'>Status</th>
            <th className='verifierproduct_th'>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <tr key={index} className='verifier_table_tr'>
              <td className='verifierproduct_td'>
                <a className='order-table-a' onClick={() => orderDetail(order.orderId)}>{order.orderId}</a>
              </td>
              <td className='verifierproduct_td'>{order.userid}</td>
              <td className='verifierproduct_td'>{order.productid._id}</td>
              <td className='verifierproduct_td'>₹{order.total}</td>
              <td className='verifierproduct_td'>{order.status}</td>
              <td>
                {order.status === 'pending' ? (
                  <button className="button-124" role="button" onClick={() => handleAction(order.orderid)}>APPROVE</button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

</div>
        </div>
        <ToastContainer />
    </div>
  )
}

export default ViewOrder