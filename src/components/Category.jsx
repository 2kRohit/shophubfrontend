import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import { useNavigate,useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import UserNavbar from './User/Navbar/UserNavbar';
import MiniNavbarFooter from './User/Navbar/MiniNavbarFooter';
import NavbarCategory from './User/Navbar/NavbarCategory';
import MiniNavBar from './User/Navbar/MiniNavBar';

function Category() {

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const selectedTheme = localStorage.getItem("selectedTheme");
  const isMobile = useMediaQuery({ query: '(max-width: 980px)' });
  const category = searchParams.get('category');
  const [product,setproduct]= useState([])
  const fetchproduct=async()=>{
    const res=await axios.get(`https://shophubbackend.onrender.com/api/products/getcategory/${category}`)
    setproduct(res.data)
  }

  useEffect(() => {
    
  fetchproduct()
  }, [category])

  const handleCardClick = (productId) => {
    console.log(productId);
    navigate(`/productdetails?productId=${productId}`);
  };

  const isLatestProduct = (date) => {
    const currentDate = new Date();
    const productDate = new Date(date);
    const timeDifference = Math.abs(currentDate - productDate);
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference <= 7; // Highlight products added in the last 7 days
  };


  return (
    <div className='user-home' data-theme={selectedTheme}>
      <div>
        {isMobile ? <MiniNavBar /> : <UserNavbar />}
      </div>
      <div>
        <NavbarCategory/>
      </div>
      <div className='container border-0 mt-3'>
      <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-lg-4 g-4 product-card'>
      {product.map((cardData, index) => (
  <div className={`col ${isLatestProduct(cardData.date) ? 'latest-product' : ''}`} key={index}>
    <div className='card h-100 border-0 home-card' onClick={() => handleCardClick(cardData._id)} data-theme={selectedTheme}>
      {isLatestProduct(cardData.date) && <div className='new-label'>New</div>}
      <img className='home-card-img' src={`${cardData.image}`} alt='Card' style={{ height: '300px' }} />
      <div className='card-body d-flex'>
        <h5 className='text-left'>{cardData.productName}</h5>
      </div>
      <div className='d-flex justify-content-between'>
        <p className='col-lg-11 col-md-11 col-sm-11' style={{ textAlign: 'left', paddingTop: '10px', paddingLeft: '1%', fontSize: 'larger' }}>₹{cardData.price}</p>
        <p className={`col-lg-1 col-md-1 col-sm-1 ${selectedTheme === 'dark' ? 'order-1' : ''}`} style={{ textAlign: 'right' }}>{cardData.rating}★</p>
      </div>
    </div>
  </div>
))}
      </div>
    </div>
    <div>
        {isMobile && <MiniNavbarFooter />}      
      </div>
    </div>
  )
}

export default Category