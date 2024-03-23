import React, {  useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineHome} from 'react-icons/ai';
import { FaTag } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import { IoIosListBox } from "react-icons/io";
import { BsDatabaseFillAdd } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddProduct() {

  const navigate = useNavigate();
  const authid = localStorage.getItem('authid');
  const authrole = localStorage.getItem('authrole');
    if(authrole!='seller'){
      navigate('*')
    }
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    sellerid: authid,
    productName: '',
    price: '',
    productType: '',
    category: '',
    brand: '',
    quantity: '',
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
    description: '',
  });
  

  
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const form = new FormData();
      form.append('sellerid', formData.sellerid);
      form.append('productName', formData.productName);
      form.append('price', formData.price);
      form.append('productType', formData.productType);
      form.append('category', formData.category);
      form.append('brand', formData.brand);
      form.append('quantity', formData.quantity);
      form.append('image1', formData.image1);
      form.append('image2', formData.image2);
      form.append('image3', formData.image3);
      form.append('image4', formData.image4);
      form.append('image5', formData.image5);
      form.append('description', formData.description);

      if (
        formData.image1 instanceof File ||
        formData.image2 instanceof File ||
        formData.image3 instanceof File ||
        formData.image4 instanceof File ||
        formData.image5 instanceof File
      ) {
        await axios.post('https://shophubbackend.onrender.com/api/products/addproduct', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setLoading(false);
        

        setFormData({
          sellerid: authid,
          productName: '',
          price: '',
          productType: '',
          category: '',
          brand: '',
          quantity: '',
          image1: null,
          image2: null,
          image3: null,
          image4: null,
          image5: null,
          description: '',
        });

        toast.success("Product Added successfully!");
        console.log('product added');
      } else {
        console.error('image1 is not a file');
        setLoading(false);
      }
      window.location.reload(); 
    } catch (error) {
      setLoading(false);
      console.error('Error adding product:', error);
      toast.error("Error adding product:");
    }
  };

  const logout = () => {
    localStorage.removeItem('authid')
    navigate('/')
  };

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
        <div className='admin-option-active ms-5' onClick={() => { navigate('/addproduct') }}>
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
        <div className='admin-option3 ms-5' onClick={() => { navigate('/productmanagement') }}>
          <p className='option-p mt-3'>
            <FaTag style={{ fontSize: '15' }} className='me-3' />MANAGE PRODUCT
          </p>
        </div>
      </div>
      <div className='admin-option'>
        <div className='admin-option4 ms-5' onClick={() => { navigate('/vieworder') }}>
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

        <div className='d-flex justify-content-center align-items-center main-form-div' style={{width:'100%'}}>
    <div className="usform d-flex justify-content-center align-items-center ">
  <form className="usraddform ms-md-5 col-sm-8 col-md-8 mt-5" onSubmit={handleSubmit}>
  
      <p className='add-prd-p'>
        <BsDatabaseFillAdd style={{ color: 'green', fontSize: '28px' }} /> Add Product
      </p>
  
      <div className='mb-3 row mx-3'>
        <div className="col-md-6 col-sm-6 ">
          <label htmlFor="productName" className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Product Name"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </div>
  
        <div className="col-md-6 col-sm-6">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
      </div>
  
      <div className='mb-3 row mx-3'>
        <div className="col-md-6 col-sm-6 protype">
          <label htmlFor="productType">Type</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                id="fresh"
                name="productType"
                value="fresh"
                checked={formData.productType === 'fresh'}
                onChange={handleChange}
                required
              />
              Fresh
            </label>
            <label>
              <input
                type="radio"
                id="used"
                name="productType"
                value="used"
                checked={formData.productType === 'used'}
                onChange={handleChange}
                required
              />
              Used
            </label>
          </div>
        </div>
  
        <div className="col-md-6 col-sm-6">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            className="form-select"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="car">Car</option>
            <option value="Refrigerator">Refrigerator</option>
            <option value="Watch">Watch</option>
            <option value="sports">Sports</option>
            <option value="mobile">Mobile</option>
            <option value="tv">TV</option>
            <option value="headphone">Headphone</option>
            <option value="washing machine">Washing Machine</option>
          </select>
        </div>
      </div>
  
      <div className='mb-3 row mx-3'>
        <div className="col-md-6 col-sm-6 protype">
          <label htmlFor="brand" className="form-label">Brand</label>
          <input
            type="text"
            placeholder='Brand'
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </div>
  
        <div className="col-md-6 col-sm-6">
          <label htmlFor="image1" className="form-label">Image 1</label>
          <input
            type="file"
            className="form-control"
            name="image1"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
      </div>
  
      <div className='mb-3 row mx-3'>
        <div className="col-md-6 col-sm-6">
          <label htmlFor="image2" className="form-label">Image 2</label>
          <input
            type="file"
            className="form-control"
            name="image2"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
  
        <div className="col-md-6 col-sm-6">
          <label htmlFor="image3" className="form-label">Image 3</label>
          <input
            type="file"
            className="form-control"
            name="image3"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
      </div>
  
      <div className='mb-3 row mx-3'>
        <div className="col-md-6 col-sm-6">
          <label htmlFor="image4" className="form-label">Image 4</label>
          <input
            type="file"
            className="form-control"
            name="image4"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
  
        <div className="col-md-6 col-sm-6">
          <label htmlFor="image5" className="form-label">Image 5</label>
          <input
            type="file"
            className="form-control"
            name="image5"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
      </div>
  
      <div className="mb-3 row mx-3 d-flex">
        <div className="col-md-4 col-sm-4 d-flex flex-column">
        <label htmlFor="quantity" className="form-label">Quantity</label>
              <input
                type="number"
                placeholder='Quantity'
                name="quantity"
                min="1" max="120"
                value={formData.quantity}
                onChange={handleChange}
              />
        </div>
        <div className="col-md-8 col-sm-8">
          <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
        </div>
      </div>
  
      {loading && (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}

        <button type="submit" className="btn btn-danger mb-3 mt-2 fw-bold" hidden={loading}>
          Add Product
        </button>
    </form>
  </div>
</div>
<ToastContainer />
</div>
  

  )
}

export default AddProduct