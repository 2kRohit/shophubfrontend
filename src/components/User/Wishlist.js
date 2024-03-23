import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import UserNavbar from './UserNavbar';

function Wishlist() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [product, setProduct] = useState([]);

  const deleteProduct = async (productId) => {
    const authid = localStorage.getItem('authid');
    try {
      await axios.delete(`https://shophubbackend.onrender.com/api/wishlist/wishlist/${authid}/${productId}`);
      fetchProduct();
    } catch (error) {
      console.error('Error deleting product from wishlist:', error);
    }
  };

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`https://shophubbackend.onrender.com/api/wishlist/getwishlistbyuserid/${localStorage.getItem('authid')}`);
      setProduct(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('Error fetching wishlist products:', error);
    }
  };

  useEffect(() => {
    const authid = localStorage.getItem('authid');
    if (!authid) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleCardClick = (productId) => {
    console.log(productId);
    navigate(`/ProductDetail?productId=${productId}`);
  };

  return (
    <div>
      <div>
        <UserNavbar />
      </div>
      <div className='wishlist-container'>
        <div className='wishlisthead'>
          <h1>
            <BsFillBookmarkHeartFill className='wishlistheadicon' size={52} color="red" />
            My Wishlist
          </h1>
        </div>
        <div className='cardbox'>
          {product.map((wishlist, index) => (
            <div className='col-lg-4 col-md-6 col-sm-12' key={index}>
              <div className='card mb-4' onClick={() => handleCardClick(wishlist.productDetails._id)}>
                <img className='card-img-top' src={`https://shophubbackend.onrender.com/${wishlist.productDetails.image}`} alt='Card' style={{ height: '250px' }} />
                <div className='card-body'>
                  <h5 className='card-title'>{wishlist.productDetails.productName}</h5>
                  <p className='card-text'>₹{wishlist.productDetails.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
