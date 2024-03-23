import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa';
import { FaRobot } from 'react-icons/fa';
import { FaTag } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import { GrUserManager } from "react-icons/gr";
import { FaCheckCircle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/style.css'

function ManageProduct() {

    const [products, setProducts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [showLogoutOverlay, setShowLogoutOverlay] = useState(false);
    const navigate=useNavigate()
    const authrole = localStorage.getItem('authrole');
    if(authrole!='admin'){
      navigate('*')
    }

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axios.get('https://shophubbackend.onrender.com/api/products/getproduct');
            setProducts(response.data);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchProducts();
      }, []);
  
      const logout = () => {
        localStorage.removeItem('authid')
        navigate('/')
      }
  
    
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleAction = async (productId, action) => {
      if (productId) {
        if (action === 'delete') {
          try{
            await axios.delete(`https://shophubbackend.onrender.com/api/products/deleteproduct/${productId}`);
            toast.success("Product Removed successful!");
            console.log('Deleting product:', productId);
            window.location.reload(); 
          }
          catch (error) {
            toast.error("Can't delete product!");
            console.error('Error deleting product:', error);
          }
        } else if (action === 'approve') {
          try{
            await axios.put(`https://shophubbackend.onrender.com/api/products/updateStatus/${productId}`);
            toast.success("Product Approved successful!");
            console.log('Approving product:', productId);
            window.location.reload(); 
          }
          catch(error) {
            toast.error("Can't approve product!");
            console.error('Error approveing product:', error);
          }
        } else if (action === 'decline') {
          const reason = prompt("Enter reason for declining:");
          if (reason !== null) {
            try {
              const updatedProduct = { status: 'rejected', reason };
              await axios.put(`https://shophubbackend.onrender.com/api/products/unupdate/${productId}`, updatedProduct);
              toast.success("Product declined successful!");
              window.location.reload(); 
            } catch (error) {
              toast.error("Can't decline product!");
              console.error('Error declining product:', error);
            }
          } else {
            console.log('No reason provided for decline');
          }
        }
      } else {
        console.log('No product selected');
      }
    };

  return (
<div className='admin-home'>
        <div className='admin-nav'>
          <a href='/adminhome'>
            <img src='/logo2.png' alt='ShopHub Logo' className='admin-nav-logo' />
          </a>
          <div className='mt-3'>
            <div className='admin-option'>
              <div className='admin-option1 ms-5 d-flex' onClick={()=>{navigate('/adminhome')}}>
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
              <div className='admin-option-active ms-5' onClick={()=>{navigate('/manageproduct')}}>
                <p className='option-p mt-3'>
                  <FaTag style={{fontSize: '15'}} className='me-3'/>MANAGE PRODUCT
                </p>
              </div>
            </div>
            <div className='admin-option'>
              <div className='admin-option4 ms-5' onClick={()=>{navigate('/vieworder')}}>
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
  <table className='admin_product_table1'>
    <thead>
      <tr className='verifierproduct_tr'>
        <th className='verifierproduct_th'>User Id</th>
        <th className='verifierproduct_th'>Product Name</th>
        <th className='verifierproduct_th'>Price</th>
        <th className='verifierproduct_th'>Product Type</th>
        <th className='verifierproduct_th'>Category</th>
        <th className='verifierproduct_th'>Quantity</th>
        <th className='verifierproduct_th'>Status</th>
        <th className='verifierproduct_th'>Reason</th>
        <th className='verifierproduct_th text-center' colSpan="2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {products && products.map((details, index) => (
        <tr className='verifier_table_tr' key={index}>
          <td className='verifierproduct_td'>{details.sellerid}</td>
          <td className='verifierproduct_td'>{details.productName}</td>
          <td className='verifierproduct_td'>{details.price}</td>
          <td className='verifierproduct_td'>{details.productType}</td>
          <td className='verifierproduct_td'>{details.category}</td>
          <td className='verifierproduct_td'>{details.quantity}</td>
          <td className='verifierproduct_td'>{details.status}</td>
          <td className='verifierproduct_td'>
            {details.status === 'rejected' && details.reason && (
              <div className="reason-message">
                <strong>{details.reason}</strong>
              </div>
            )}
          </td>
          <td className='verifierproduct_td'>
                  {details.status === 'unverified' ? (
                    <>
                      <button className="button-124" role="button" onClick={() => handleAction(details._id, 'approve')}>APPROVE</button>
                    </>
                  ) : (
                    <button className="button-126" role="button" onClick={() => handleAction(details._id, 'delete')}>DELETE</button>
                  )}
                </td>
                <td className='verifierproduct_td'>
                  {details.status === 'unverified' && (
                    <button className="button-126" role="button" onClick={() => handleAction(details._id, 'decline')}>DECLINE</button>
                  )}
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

export default ManageProduct