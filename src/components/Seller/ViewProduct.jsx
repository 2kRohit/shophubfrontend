import React, { useState ,useEffect } from 'react';
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { BiEditAlt } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';

function ViewProduct() {

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

    const navigate=useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };

  return  (
<div className='table-responsive' style={{ maxHeight: '500px', overflowY: 'auto', overflowX: 'auto'}}>
      <table className='table custom-table-width'>
        <thead>
          <tr>
            <th></th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Product Type</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Image</th>
            <th>Status</th>
            <th>Reason</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {product.map((product, index) => (
            <tr key={index} className='view_table_tr'>
              <td>
                <BiEditAlt style={{ fontSize: '24px' }} onClick={() => editProduct(product._id)} />
              </td>
              <td>{product.productName}</td>
              <td>{product.price}</td>
              <td>{product.productType}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <img src={`${product.image}`} alt="Product" className="img-fluid custom-img" />
              </td>
              <td>{product.status}</td>
              <td>{product.reason}</td>
              <td>
                <MdDelete size={24} className='deleteicon' onClick={() => deleteProduct(product._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  
)
}

export default ViewProduct