import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import { FaKey } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { FaBalanceScale } from 'react-icons/fa';

import MiniNavbarFooter from './Navbar/MiniNavbarFooter';
import UserNavbar from './Navbar/UserNavbar';
import MiniNavBar from './Navbar/MiniNavBar';
import '../Styles/style.css';

function Review() {
  const isMobile = useMediaQuery({ query: '(max-width: 980px)' });
  const selectedTheme = localStorage.getItem("selectedTheme");
  const location = useLocation();
  const navigate = useNavigate();
  const authrole = localStorage.getItem('authrole');
    if(authrole!='user'){
      navigate('*')
    }
  const [product, setProduct] = useState({});
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [comment, setComment] = useState('');

  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get('productId');
  const userId = localStorage.getItem('authid');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.post(`https://shophubbackend.onrender.com/api/products/display/${productId}`);
        console.log(' product : ', res);
        setProduct(res.data);

        const userReviewResponse = await axios.get(`https://shophubbackend.onrender.com/api/review/display/${productId}/${userId}`);
        if (userReviewResponse.data) {
          setRating(userReviewResponse.data.review);
          setComment(userReviewResponse.data.comments);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleStarClick = async (selectedRating) => {
    setRating(selectedRating);
    console.log('pressed : ', selectedRating);
    console.log('product id : ', productId);
    try {
      if (selectedRating === 0) {
        return;
      }

      const response = await axios.post('https://shophubbackend.onrender.com/api/review/create', {
        userid: localStorage.getItem('authid'),
        productid: productId,
        review: selectedRating,
        comments: '',
      });

      if (response.status === 201) {
        console.log('Review and rating saved to the database');
      }
    } catch (error) {
      console.error('Error saving review and rating:', error);
    }
  };

  const handleStarHover = (hoveredIndex) => {
    setHoveredStar(hoveredIndex);
  };

  const handleSubmitComment = async (e) => {
    try {
      e.preventDefault();
      console.log("product id : ", productId);

      if (comment.trim() === '' || rating === 0) {
        return;
      }

      const res = await axios.post('https://shophubbackend.onrender.com/api/review/create', {
        userid: localStorage.getItem('authid'),
        productid: productId,
        review: rating,
        comments: comment,
      });

      if (res.status === 200) {
        console.log('Review and comment saved to the database');
        navigate(`/productdetails?productId=${productId}`);
      }
    } catch (error) {
      console.error('Error saving review and comment:', error);
    }
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

  return (
    <div data-theme={selectedTheme}>
  <div>
    {isMobile ? <MiniNavBar /> : <UserNavbar />}
  </div>
  <div  className='review-div'>
  <div className="container">
        <h1 className='text-center'>Rating & Review</h1>
        <div className='row mt-5'>
          <div className={'col-md-6 col-sm-12 order-${isMobile ? 1 : 2}'}>
            <h3 className='review-pro-name'>{product.productName}</h3>
            <h2 className='review-h2'>{averageRating} ★ ({userCount}) </h2>
            <img src={`${product.image}`} alt="Product" className="img-fluid" />
          </div>
          <div className={'col-md-6 col-sm-12 order-${isMobile ? 1 : 2}'}>
            <div className="col-md-12">
        <div className="row">
          <div className="col-md-12">
          <div className='d-flex'>
  <div className='card col-sm-3 col-md-3 flex-grow-1 me-3'>
    <h4 className='review-h2 text-center mt-4'>
      <FaKey size={20} className="icon" />Main Features
    </h4>
    <p className='review-p mt-3 mx-3'>Highlight the standout features or aspects that impressed you the most.</p>
  </div>
  <div className='card col-sm-3 col-md-3 flex-grow-1 me-3'>
    <h4 className='review-h2 mt-4 text-center'>
      <FaUser size={20} className="icon" /> Personal Touch
    </h4>
    <p className='review-p mb-4 mt-3 mx-3'>"Personalize your review, showcasing how the product exceeded expectations, making it buyer-relevant."</p>
  </div>
  <div className='card col-sm-3 col-md-3 flex-grow-1 me-3'>
    <h4 className='review-h2 mt-4 text-center'><FaBalanceScale size={20} className="icon" /> Pros and Cons</h4>
    <p className='review-p mb-4 mt-3 mx-3'>Provide a balanced overview by mentioning both the positive and negative aspects of the product.</p>
  </div>
</div>

          </div>
          <div className="col-md-12 mt-5">
  <div className="row">
    <div className="col-md-6">
      <div className='reviewleft'>
        <h4>Rate this product</h4>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? 'active' : ''} ${star <= hoveredStar ? 'hovered' : ''}`}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
              onMouseLeave={() => handleStarHover(0)}
            >★</span>
          ))}
        </div>
      </div>
    </div>
    <div className="col-md-6">
      <div>
        <h3>Review this product</h3>
        <form>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment..."
            ></textarea>
          </div>
          <div className="mb-3">
            <button
              className='btn'
              onClick={handleSubmitComment}
              style={{
                backgroundColor: 'orangered',
                color: 'white',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'darkred'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'orangered'}
            >
              <FaCloudUploadAlt size={20} className="me-2" />
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

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

  );
}

export default Review;