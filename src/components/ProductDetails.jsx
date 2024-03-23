import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import UserNavbar from './User/Navbar/UserNavbar';
import MiniNavBar2 from './User/Navbar/MiniNavBar2';
import MiniNavbarFooter from './User/Navbar/MiniNavbarFooter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { HiShoppingCart } from 'react-icons/hi';
import { IoIosStar } from "react-icons/io";
import { IoArrowRedoCircle } from 'react-icons/io5';
import { BiUserCircle } from 'react-icons/bi';


function ProductDetails() {
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ query: '(max-width: 980px)' });
    const authrole = localStorage.getItem('authrole');
    const selectedTheme = localStorage.getItem("selectedTheme");
  const [showUser, setShowUser] = useState(false);
  const [showUser1, setShowUser1] = useState(false);
  const [product, setProduct] = useState({});
  const [userCount, setUserCount] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [starCounts, setStarCounts] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  });
  if(authrole==='admin'){
    navigate('*')
  }

  const getFormattedDeliveryDate = (date) => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();
  
    return `${dayOfWeek}, ${month} - ${dayOfMonth}`;
  };
  
  const [deliveryDate, setDeliveryDate] = useState('');
  //const [ratingCounts, setRatingCounts] = useState({});
  

  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get('productId');

  const [isSaved, setIsSaved] = useState(false);
  const [isCart, setIsCart] = useState(false);

  const handleCheck = async () => {

    const authid = localStorage.getItem('authid');
    if (authid){
      setShowUser(true);
    }
    else{
      setShowUser1(true);
    }
  }

  useEffect(() => {
    handleCheck();
  }, []);

  const handleButtonClick = async () => {
    const authid = localStorage.getItem('authid');
    if (!authid) {
      navigate('/login');
    } else {
      try {
        if (isSaved) {
          await axios.delete(`https://shophubbackend.onrender.com/api/wishlist/delete/${authid}/${productId}`);
        } else {
          await axios.post('https://shophubbackend.onrender.com/api/wishlist/add', { userid: authid, productid: productId });
        }
        setIsSaved(!isSaved);
      } catch (error) {
        console.error('Error updating wishlist:', error);
      }
    }
  };

  const handleCartClick = async  () => {
    const authid = localStorage.getItem('authid');
    if (!authid) {
      navigate('/login');
    } else {
      try {
            const res=await axios.post('https://shophubbackend.onrender.com/api/cart/carts', { userid: authid, productid: productId });
            if(res.status===202){
              console.log('isCart:', isCart);
              setIsCart(!isCart);
            }
      } catch (error) {
        console.error('Error updating cart:', error);
      }
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.post(`https://shophubbackend.onrender.com/api/products/display/${productId}`);
        console.log(' product : ',res)
        setProduct(res.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const authid = localStorage.getItem('authid');
    if (authid) {
      const fetchWishlistStatus = async () => {
        try {
          const res = await axios.get(`https://shophubbackend.onrender.com/api/wishlist/wishlist/${authid}/${productId}`);
          setIsSaved(res.data.exists);
        } catch (error) {
          console.error('Error fetching wishlist status:', error);
        }
      };

      fetchWishlistStatus();
    }
  }, [productId]);

 useEffect(() => {
    const authid = localStorage.getItem('authid');
    if (authid) {
      const fetchcartStatus = async () => {
        try {
          const res = await axios.get(`https://shophubbackend.onrender.com/api/cart/cart/${authid}/${productId}`);
          setIsCart(res.data.exists);
        } catch (error) {
          console.error('Error fetching cart status:', error);
        }
      };

      fetchcartStatus();
    }
  }, [productId]);

  const handleShare = async (pId,pName) => {
    try {
      await navigator.share({
        title: pName,
        url: `http://localhost:3000/ProductDetail?productId==${pId}`,
      });
      console.log('Shared successfully');
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const [comment, setComment] = useState('');

  const handleSubmitComment = async () => {
    try {
      if (comment.trim() === '') {
        return;
      }
  
      const response = await axios.post('', {
        comment: comment,
      });
  
      if (response.status === 201) {
        console.log('Comment saved to the database');
      }
    } catch (error) {
      console.error('Error saving comment:', error);
    }
  };

  const rateProduct = () => {
    console.log('id: ',product._id)
    navigate(`/review?productId=${product._id}`);
  };

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await axios.get(`https://shophubbackend.onrender.com/api/review/averagerating/${productId}`);
        if (response.data) {
          setAverageRating(response.data.averageRating);
        }
      } catch (error) {
        console.error('Error fetching average rating:', error);
      }
    };

    fetchAverageRating();
  }, [productId]);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get(`https://shophubbackend.onrender.com/api/review/usercount/${productId}`);
        if (response.data) {
          setUserCount(response.data.userCount);
        }
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchUserCount();
  }, [productId]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://shophubbackend.onrender.com/api/review/reviewproduct/${productId}`);
        if (response.data) {
          setReviews(response.data);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    async function fetchStarCounts() {
      try {
        console.log("product id  : ",productId)
        const res = await axios.get(`https://shophubbackend.onrender.com/api/review/eachstar/${productId}`);
        console.log("rating : ",res)
        setStarCounts(res.data);
      } catch (error) {
        console.error('Error fetching star counts:', error);
      }
    }

    fetchStarCounts();
  }, [productId]);

  useEffect(() => {
    const today = new Date();
    const deliveryDays = 2;
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + deliveryDays);

    const formattedDeliveryDate = getFormattedDeliveryDate(deliveryDate);

    setDeliveryDate(formattedDeliveryDate);
  }, []);


  return (
<div>
    <div>
        {isMobile ? <MiniNavBar2/> : <UserNavbar/>}
    </div>
    <div className='product-details' data-theme={selectedTheme}>
        <div className='container'>
          <div className='d-flex col-sm-12 col-md-12 col-lg-12 productdiv8'>
            <div className='d-flex align-items-center justify-content-left col-sm-9 col-md-9 col-lg-9 product-name'>
              <h2 className='h1h1 mt-3 ms-3'>{product.productName}</h2>
            </div>
            <div className='col-sm-3 col-md-3 col-lg-3 mt-3 d-flex justify-content-end product-header'>
              <div className='share-cart-wishlist'>
                <a className='mx-3 share-button' onClick={() => { handleShare(product._id, product.productName) }}>
                  <IoArrowRedoCircle size={26} />
                  Share
                </a>
                <button className="cart-button mx-3" onClick={handleCartClick} >
                  <span className='cart-el'><HiShoppingCart style={{ color: isCart ? 'blue' : 'black', fontSize: isCart ? '20px' : '20px' }}/>
                  <span className="cartbutton-text" style={{ color: isCart ? 'blue' : 'black', fontSize: isCart ? '20px' : '20px' }}>Cart</span>
                  </span>
                </button>
                <button className={`mx-3 wishlist-button`} onClick={handleButtonClick} >
                  <span className='wishlist-el' >  <FontAwesomeIcon icon={faHeart} style={{color: isSaved ? 'red' : 'black'}}  />
                  <span className="wishlistbutton-text" style={{color: isSaved ? 'red' : 'black'}}>{isSaved ? 'Saved' : 'Save'} </span></span>
                </button>
              </div>
            </div>
          </div>
          <div className='col-sm-1 col-md-1 col-lg-1'>
            <div className='product-rating'>
                <h2>{averageRating} ★ </h2>
            </div>
          </div>
          <div className='responsive-gallery'>
      {/* <div className='gallery-item'>
        <img className='gallery-img' src={product.image} alt='Product' />
        <div className='overlay'>
          <p>Image 1</p>
        </div>
      </div>

      <div className='gallery-item'>
        <img className='gallery-img' src={product.image2} alt='Product' />
        <div className='overlay'>
          <p>Image 2</p>
        </div>
      </div>

      <div className='gallery-item'>
        <img className='gallery-img' src={product.image3} alt='Product' />
        <div className='overlay'>
          <p>Image 3</p>
        </div>
      </div>

      <div className='gallery-item'>
        <img className='gallery-img' src={product.image4} alt='Product' />
        <div className='overlay'>
          <p>Image 4</p>
        </div>
      </div>

      <div className='gallery-item'>
        <img className='gallery-img' src={product.image5} alt='Product' />
        <div className='overlay'>
          <p>Image 5</p>
        </div>
      </div> */}
      <div className="row">
      <div className="col-md-6 mb-3" style={{overflow:'hidden'}}>
          <img src={product.image} className="img-fluid product-img" alt="Image 1" style={{ objectFit: 'cover', width: '100%', height: '100%' }}/>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-6 mb-3" style={{overflow:'hidden'}}>
              <img src={product.image2} className="img-fluid product-img" alt="Image 2" style={{ objectFit: 'cover', width: '100%', height: '100%' }}/>
            </div>
            <div className="col-md-6 mb-3" style={{overflow:'hidden'}}>
              <img src={product.image3} className="img-fluid product-img" alt="Image 3" style={{ objectFit: 'cover', width: '100%', height: '100%', overflow:'hidden' }}/>
            </div>
            <div className="col-md-6 mb-3" style={{overflow:'hidden'}}>
              <img src={product.image4} className="img-fluid product-img" alt="Image 4" style={{ objectFit: 'cover', width: '100%', height: '100%', overflow:'hidden' }}/>
            </div>
            <div className="col-md-6 mb-3" >
              <img src={product.image5} className="img-fluid product-img" alt="Image 5" style={{ objectFit: 'cover', width: '100%', height: '100%', overflow:'hidden' }}/>
            </div>
          </div>
        </div>
      </div>
    </div>
          <div className="product-detail">
            <div style={{ borderBottom: '1px solid rgb(225, 217, 217)', display: 'flex', flexDirection: 'row', height: '100px' }}>
              <div style={{ flexBasis: '80%' }}>
                <h1 className='price' style={{ paddingLeft: '20px', paddingTop: '20px', textAlign:'left' }}> ₹ {product.price}</h1>
              </div>
              <div className='prd-dtl-day'>
                {deliveryDate && (
                  <p style={{ fontWeight: 'bold', fontFamily: 'inherit', paddingTop: '30px', textAlign: 'left !important' }}>
                    Get it by: 2 days ( {deliveryDate} )
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
              <div>
                  <div> 
                      <div className='testdiv' style={{borderBottom:'1px solid rgb(225, 217, 217)', width:'100%'}}>
                        <h1 className='prh1' style={{ textAlign:'left', paddingLeft:'20px', paddingTop:'20px', }}>Description </h1>
                        <div className='descri' style={{marginLeft:'140px', textAlign:'left'}}>
                          {product.description?.split(/[|,]/).map((i)=> (
                            <div>
                              <p>. {i}</p>
                            </div>
                            ))}
                        </div>
                      </div>
                  <div>
                    <div style={{borderBottom:'1px solid rgb(225, 217, 217)'}}>
                      <button onClick={rateProduct} style={{border:'none', backgroundColor:'transparent', fontWeight:'bold', color:'green' ,fontFamily:'time new roman', fontSize:'18px'}}>RATE PRODUCT ?</button>
                      <h1 style={{ textAlign:'left', paddingLeft:'20px'}}>Ratings & Reviews</h1>
                      <div style={{display:'flex', width:'60%', marginLeft:'50px'}}>
                          <div>
                          <p style={{textAlign:'left', paddingTop:'25px', fontWeight:'bold'}}>Average Rating</p>
                          <h1 style={{ color:'red', textAlign:'left', borderRadius:'10px'}}>{averageRating} <IoIosStar style={{color:'red', fontSize:'32px', paddingBottom:'5px'}}/>  </h1>
                          <p >        
                            Total users who rated the product: {userCount}
                          </p>
                          </div>
                        </div>
                    </div>
                    <div style={{borderTop:'1px solid rgb(225, 217, 217)'}}>
                    <div style={{marginLeft:'50px',marginTop:'50px', textAlign:'left', marginTop:'40px'}}>
                    {reviews.map((review) => (
            <div key={review._id} style={{borderBottom:'1px solid rgb(225, 217, 217)'}}>
            <div style={{display:'flex', marginTop:'20px'}}>
              <div>
                <BiUserCircle size={40} style={{paddingTop:'5px', fontWeight:'lighter'}}/>
              </div>
              <div>
                <p style={{fontSize:'18px', paddingLeft:'5px'}}> {review.user}</p>
                <p style={{marginTop:'-10px', paddingLeft:'5px', fontSize:'15px'}}>
                {review.rating}★
                </p>
            </div>
            </div>
          
          <p style={{fontWeight:'bold', paddingLeft:'100px', paddingTop:'10px'}}> {review.comment}</p> 
          </div>
        ))}

          </div>
          
          </div>
                </div>
                </div>
              </div>
            </div>
            <div>
              {isMobile && <MiniNavbarFooter />}      
            </div>
            </div>
            </div>
      </div>
  )
}

export default ProductDetails