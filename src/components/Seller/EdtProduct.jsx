import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BsDatabaseFillAdd } from 'react-icons/bs';
import { IoIosListBox } from "react-icons/io";
import { FaTag } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import '../Styles/style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function EdtProduct() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get('productId');
  const navigate = useNavigate();
  const authrole = localStorage.getItem('authrole');
  if(authrole!='seller'){
    navigate('*')
  }
  const [product, setProduct] = useState({
    productName: '',
    price: '',
    productType: '',
    category: '',
    brand: '',
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
    description: '',
    quantity: 0,
  });

  useEffect(() => {
    const authid = localStorage.getItem('authid');
    if (!authid) {
      navigate('/login');
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('authid');
    navigate('/');
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const fetchProduct = async () => {
    try {
      const res = await axios.post(`https://shophubbackend.onrender.com/api/products/display/${productId}`);
      setProduct(res.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error("Error fetching product!");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setProduct((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('productName', product.productName);
      formData.append('price', product.price);
      formData.append('productType', product.productType);
      formData.append('category', product.category);
      formData.append('brand', product.brand);
      formData.append('description', product.description);
      formData.append('quantity', product.quantity);

      if (product.image1) {
        formData.append('image1', product.image1);
      }
      if (product.image2) {
        formData.append('image2', product.image2);
      }
      if (product.image3) {
        formData.append('image3', product.image3);
      }
      if (product.image4) {
        formData.append('image4', product.image4);
      }
      if (product.image5) {
        formData.append('image5', product.image5);
      }

      const res = await axios.put(`https://shophubbackend.onrender.com/api/products/updateproduct/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.status === 200) {
        console.log('Response = ', res.data);
        toast.success('Product updated successfully');
      }

      navigate('/ViewProduct');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Error updating product');
    }
  };

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
              <div className='admin-option-active ms-5' onClick={()=>{navigate('/productmanagement')}}>
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
        <div className='d-flex justify-content-center align-items-center main-form-div' style={{width:'77%'}}>
    <div className="usform d-flex justify-content-center align-items-center ">
  <form className="usraddform ms-md-5 col-sm-8 col-md-8 mt-5" onSubmit={handleSubmit}>
  
      <p className='add-prd-p'>
        <BsDatabaseFillAdd style={{ color: 'green', fontSize: '28px' }} /> Update Product
      </p>

      <div className='mb-3 row mx-3'>
        <div className="col-md-6 col-sm-6 ">
          <label htmlFor="productName" className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Product Name"
              name="productName"
              value={product.productName}
              onChange={handleChange}
              required
            />
        </div>

        <div className="col-md-6 col-sm-6">
          <label htmlFor="price" className="form-label">Price</label>
            <input
              type="text"
              className="form-control"
              placeholder="Price"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
        </div>
      </div>

      <div className='mb-3 row mx-3'>
        <div className="col-md-6 col-sm-6">
            <label htmlFor="image1">Image 1</label>
            <input
              type="file"
              className="form-control"
              name="image1"
              accept="image/*"
              onChange={handleChange}
            />
        </div>

        <div className="col-md-6 col-sm-6">
            <label htmlFor="image2">Image 2</label>
            <input
              type="file"
              className="form-control"
              name="image2"
              accept="image/*"
              onChange={handleChange}
            />
        </div>
      </div>

      <div className='mb-3 row mx-3'>
        <div className="col-md-6 col-sm-6">
            <label htmlFor="image3">Image 3</label>
            <input
              type="file"
              className="form-control"
              name="image3"
              accept="image/*"
              onChange={handleChange}
            />
        </div>

        <div className="col-md-6 col-sm-6">
            <label htmlFor="image4">Image 4</label>
            <input
              type="file"
              className="form-control"
              name="image4"
              accept="image/*"
              onChange={handleChange}
            />
        </div>
      </div>

      <div className='mb-3 row mx-3'>
        <div className="col-md-6 col-sm-6">
            <label htmlFor="image5">Image 5</label>
            <input
              type="file"
              className="form-control"
              name="image5"
              accept="image/*"
              onChange={handleChange}
            />
        </div>

        <div className="col-md-6 col-sm-6">
          <label htmlFor="brand" className="form-label">Brand</label>
            <input
              type="text"
              placeholder="Brand"
              name="brand"
              value={product.brand}
              onChange={handleChange}
            />
        </div>
      </div>

      <div className="col-md-11 col-sm-8 ms-4">
        <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              placeholder="Description"
              value={product.description}
              onChange={handleChange}
              required
            />
      </div>

      <div className="mb-3 row mx-3 d-flex">
        <div className="col-md-4 col-sm-4 ms-5 d-flex flex-column">
        <label htmlFor="quantity" className="form-label">Quantity</label>
            <input
              type="number"
              placeholder="Quantity"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              required
            />
        </div>

        <div className="col-md-4 col-sm-4 ms-4 mt-4 ">
            <button type="submit">Update Product</button>
        </div>
      </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EdtProduct;