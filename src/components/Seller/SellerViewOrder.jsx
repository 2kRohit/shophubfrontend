import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BsDatabaseFillAdd } from 'react-icons/bs';
import { IoIosListBox } from "react-icons/io";
import { FaTag } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import '../Styles/style.css'

function SellerViewOrder() {

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
                console.log('Order status updated to confirmed.');
                window.location.reload(); 
              }
            }
            catch (error) {
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
          <a href='/sellerhome'>
            <img src='/logo2.png' alt='ShopHub Logo' className='admin-nav-logo' />
          </a>
          <div className='mt-3'>
            <div className='admin-option'>
              <div className='admin-option2 ms-5 d-flex' onClick={()=>{navigate('/sellerhome')}}>
                <p className='option-p mt-3'>
                  <AiOutlineHome style={{fontSize:'25'}} className='me-3'/>HOME
                </p>
              </div>
            </div>
            <div className='admin-option'>
              <div className='admin-option2 ms-5' onClick={() => {navigate('/addproduct') }}>
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
        <div className='table-responsive-seller' style={{ maxHeight: '500px', overflowY: 'auto', overflowX: 'auto'}}>
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
      <table className='verifier_product_table_seller'>
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
  )
}

export default SellerViewOrder