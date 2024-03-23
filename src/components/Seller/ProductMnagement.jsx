import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { AiOutlineHome} from 'react-icons/ai';
import { FaTag } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import { IoIosListBox } from "react-icons/io";
import { MdDelete } from 'react-icons/md';
import { BiEditAlt } from 'react-icons/bi';
import { BsDatabaseFillAdd } from 'react-icons/bs';

import '../Styles/style.css';

function ProductMnagement() {

  const navigate=useNavigate()
  const authrole = localStorage.getItem('authrole');
    if(authrole!='seller'){
      navigate('*')
    }

  const logout = () => {
    localStorage.removeItem('authid')
    navigate('/')      
}

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    const [product,setproduct]= useState([])

    const deleteProduct = async (productId) => {
    
      try {
        await axios.delete(`https://shophubbackend.onrender.com/api/products/deleteproduct/${productId}`);
        fetchproduct();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    };

    const editProduct = (productId) => {
      /*console.log(productId)*/
      navigate(`/editproduct?productId=${productId}`);
    };


    const fetchproduct=async()=>{
      const res=await axios.get(`https://shophubbackend.onrender.com/api/products/getproductbyuserid/${localStorage.getItem('authid')}`)
      setproduct(res.data)
      /*console.log(res.data)
      console.log(res.data.productName)*/
    }
  
    useEffect(() => {
      
    fetchproduct()
    }, [category])

  return (
    <div className='admin-home'>
  <div className='admin-nav'>
    <a href='/sellerhome'>
      <img src='/logo2.png' alt='ShopHub Logo' className='admin-nav-logo' />
    </a>
    <div className='mt-3'>
      <div className='admin-option'>
        <div className='admin-option1 ms-5 d-flex' onClick={() => { navigate('/sellerhome') }}>
          <p className='option-p mt-3'>
            <AiOutlineHome style={{ fontSize: '25' }} className='me-3' />HOME
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
        <div className='admin-option2 ms-5 d-flex' onClick={() => { navigate('/updateorder') }}>
          <p className='option-p mt-3'>
            <IoIosListBox style={{ fontSize: '25' }} className='me-3' />UPDATE ORDER
          </p>
        </div>
      </div>
      <div className='admin-option'>
        <div className='admin-option-active ms-5' onClick={() => { navigate('/productmanagement') }}>
          <p className='option-p mt-3'>
            <FaTag style={{ fontSize: '15' }} className='me-3' />MANAGE PRODUCT
          </p>
        </div>
      </div>
      <div className='admin-option'>
        <div className='admin-option4 ms-5' onClick={() => { navigate('/sellervieworder') }}>
          <p className='option-p mt-3'>
            <FaEye style={{ fontSize: '25' }} className='me-3' />VIEW ORDER
          </p>
        </div>
      </div>
      <div className='admin-option'>
        <div className='admin-option5 ms-5' onClick={logout}>
          <p className='option-p mt-3'>
            <BiLogOut style={{ fontSize: '25' }} className='me-3' />LOGOUT
          </p>
        </div>
      </div>
    </div>
  </div>

        <div style={{width:'100%'}}>

        <div className='table-responsive mx-auto my-auto mt-5' style={{ overflowY: 'auto', overflowX: 'auto'}}>
      <table className='verifier_product_table1'>
        <thead>
          <tr className='verifierproduct_tr'>
            <th className='verifierproduct_th'></th>
            <th className='verifierproduct_th'>Product Name</th>
            <th className='verifierproduct_th'>Price</th>
            <th className='verifierproduct_th'>Product Type</th>
            <th className='verifierproduct_th'>Category</th>
            <th className='verifierproduct_th'>Brand</th>
            <th className='verifierproduct_th'>Image</th>
            <th className='verifierproduct_th'>Status</th>
            <th className='verifierproduct_th'>Reason</th>
            <th className='verifierproduct_th'></th>
          </tr>
        </thead>
        <tbody>
          {product.map((product, index) => (
            <tr key={index} className='verifier_table_tr'>
              <td className='verifier_product_td'>
                <BiEditAlt style={{ fontSize: '24px' }} onClick={() => editProduct(product._id)} />
              </td>
              <td className='verifier_product_td'>{product.productName}</td>
              <td className='verifier_product_td'>{product.price}</td>
              <td className='verifier_product_td'>{product.productType}</td>
              <td className='verifier_product_td'>{product.category}</td>
              <td className='verifier_product_td'>{product.brand}</td>
              <td className='verifier_product_td'>
                <img src={`${product.image}`} alt="Product" className="img-fluid custom-img" />
              </td>
              <td className='verifier_product_td'>{product.status}</td>
              <td className='verifier_product_td'>{product.reason}</td>
              <td className='verifier_product_td'>
                <MdDelete size={24} className='deleteicon' onClick={() => deleteProduct(product._id)} />
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

export default ProductMnagement