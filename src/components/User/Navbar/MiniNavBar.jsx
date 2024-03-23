import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/style.css';



function MiniNavBar() {
  const selectedTheme = localStorage.getItem("selectedTheme");
  const [userName, setUserName] = useState('');
  const [searchData, setSearchData] = useState('');
  const [isInputClicked, setIsInputClicked] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  // useEffect(() => {
  //   const authid = localStorage.getItem('authid');
  //   if (!authid) {
  //     navigate('/login');
  //   }
  // }, []);

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleInputClick = () => {
    setIsInputClicked(true);
  };

  const handleInputBlur = () => {
    setIsInputClicked(false);
  };

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        console.log('user id : ', localStorage.getItem('authid'));
        const res = await axios.get(`https://shophubbackend.onrender.com/api/user/getname/${localStorage.getItem('authid')}`);
        const userData = res.data;

        if (userData && userData.username) {
          setUserName(userData.username);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUserName();
  }, []);

  const imgclick = () => {
    console.log('clicked')
    navigate('/')
  }

  const searchProduct = () => {
    navigate(`/SearchPro?searchdata=${searchData}`);
  };

  return (
    <div className='mini-nav-bar' data-theme={selectedTheme} >
      <div className='container'>
        <div className='d-flex' style={{ marginLeft: '12px',paddingRight:'25px'}}>
            <div className='col-sm-5' onClick={imgclick}>
                <img src='/logo2.png' alt='ShopHub Logo' className='nav-logo'/>
            </div>
            <div className="mt-3 col-sm-7 d-flex" style={{ borderRadius: '20px', border: '1px solid gray', width: '240px', height:'45px', paddingLeft:'1px',marginLeft:'20px' }}>
                <input
                    type="text"
                    name="search"
                    value={searchData}
                    onChange={(e) => setSearchData(e.target.value)}
                    onClick={handleInputClick}
                    onBlur={handleInputBlur}
                    placeholder="Find your items"
                    className={`mt-1 rounded-0 align-items-center ${isInputClicked ? 'no-border' : 'no-border'}`}
                    style={{ width: '140px', border: 'none', backgroundColor: 'transparent',outline: 'none', paddingLeft: '5px' }}
                />
                <button
                    className="mt-2 navbutton2"
                    onClick={searchProduct}
                    style={{ borderRadius: '50px',backgroundColor:'transparent', color: 'orangered', border: 'none' }}
                >
                    <FaSearch />
                </button>
            </div>
        </div> 
      </div>  
    </div>
  );
}

export default MiniNavBar;
