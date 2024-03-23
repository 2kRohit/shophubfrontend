import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import { useMediaQuery } from 'react-responsive';
import UserNavbar from './Navbar/UserNavbar';
import MiniNavBar from './Navbar/MiniNavBar';
import MiniNavbarFooter from './Navbar/MiniNavbarFooter';
import '../Styles/style.css'


function Wishlists() {

    const navigate = useNavigate();
    const authrole = localStorage.getItem('authrole');
    if(authrole!='user'){
      navigate('*')
    }
    const isMobile = useMediaQuery({ query: '(max-width: 980px)' });
    const selectedTheme = localStorage.getItem("selectedTheme");
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
    navigate(`/productdetails?productId=${productId}`);
  };


  return (
    
<div className='wishlist-div' style={{minHeight:'100vh'}}>
  <div>
    {isMobile ? <MiniNavBar /> : <UserNavbar />} 
  </div>
      <div className='container'>
        <div className='wishlisthead'>
          <h1 className='mt-5'>
            <BsFillBookmarkHeartFill className='wishlistheadicon' size={52} color="red" />
            My Wishlist
          </h1>
        </div>
        <div className='container'>
          <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-lg-4 mt-5 g-4'>
            {product.map((wishlist, index) => (
              <div className='col' key={index}>
                <div className='card h-100 border-0 home-card' onClick={() => handleCardClick(wishlist.productDetails._id)} data-theme={selectedTheme}>
                  <img className='home-card-img' src={`${wishlist.productDetails.image}`} alt='Card' style={{ height: '300px' }} />
                  <div className='card-body d-flex'>
                    <h5 className='text-left'>{wishlist.productDetails.productName}</h5>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <p className='col-lg-11 col-md-11 col-sm-11' style={{ textAlign: 'left', paddingLeft: '1%', fontSize: 'larger' }}>₹{wishlist.productDetails.price}</p>
                    <p className={`col-lg-1 col-md-1 col-sm-1 ${selectedTheme === 'dark' ? 'order-1' : ''}`} style={{ textAlign: 'right'}}>{wishlist.productDetails.rating}★</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        {isMobile && <MiniNavbarFooter />}      
      </div>
    </div>
    
    )
}

export default Wishlists