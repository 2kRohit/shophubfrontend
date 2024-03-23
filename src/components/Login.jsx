import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { BiUser } from 'react-icons/bi';
import { RiLockPasswordFill } from 'react-icons/ri';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { CiMail } from 'react-icons/ci';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [formDataReg, setFormDataReg] = useState({ name: '', email: '', password: '', repassword: '', trade: '' });
  const [isValid, setIsValid] = useState(true);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post('https://shophubbackend.onrender.com/api/user/login', formData);

      console.log(response.data);
      if (response) {
        localStorage.setItem('authid', response.data._id);
        localStorage.setItem('authrole', response.data.role);
        setFormData({ email: '', password: '' });
        if (response.data.role === 'user') {
          toast.success("Login successful!");
          navigate('/userhome');
        } else if (response.data.role === 'seller') {
          toast.success("Login successful!");
          navigate('/SellerHome');
        } else {
          toast.success("Login successful!");
          navigate('/adminhome');
        }
      }
    } catch {
      toast.error("Invalid Mail id or Password");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowRegistrationForm = () => {
    setShowRegistrationForm(true);
    setShowModal(false);
  };

  const handleCloseRegistrationForm = () => {
    setShowRegistrationForm(false);
  };

  const handleChangeReg = (e) => {
    const { name, value } = e.target;
    setFormDataReg((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'email') {
      setIsValid(validateEmail(value));
    }
  };

  const handleSubmitReg = async (e) => {
    e.preventDefault();
    try {
      if (formDataReg.password === formDataReg.repassword) {
        console.log(formDataReg);
        await axios.post('https://shophubbackend.onrender.com/api/user/reguser', formDataReg);
        setFormDataReg({
          name: '',
          email: '',
          password: '',
          trade: '',
        });
        toast.success("Registration successful!");
        navigate('/login');
      } else {
        toast.error("Password and retype password should be the same");
      }
    } catch (error) {
      console.error("Existing user:", error);
      toast.error("Existing user");
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <div>
       <a className='pnav' onClick={handleShowModal}>
          <FaShoppingCart size={22} className='pnav-icon'/>  Cart</a>
          <a className='pnav' onClick={handleShowModal}>
          <AiFillHeart size={24} className='pnav-icon'/> Wishlist
        </a>
      <a className="pnav" onClick={handleShowModal}>
        <FaUser size={22} className="pnav-icon" style={{ color: 'initial' }} /> Login
      </a>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title >SIGN IN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
        
            <div className="mb-3 d-flex align-items-center">
              <BiUser className="icon1" size={22}/> &nbsp;
              <input
                id="logint"
                className="form-control"
                type="email"
                placeholder="E-Mail"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3 d-flex align-items-center">
              <RiLockPasswordFill className="icon1" size={22} /> &nbsp;
              <input
                id="logint"
                className="form-control"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                style={{ borderWidth: '0px', backgroundColor: 'transparent' }}
              >
                {showPassword ? <BsEyeSlashFill size={24} color="black" /> : <BsEyeFill size={24} color="black" />}
              </button>
            </div>

            <div style={{ textAlign: 'left', paddingLeft: '15px', marginTop: '10px' }}>
              <button className="btn btn-primary log-btn" role="button" onClick={handleSubmit} style={{ backgroundColor: 'orangered', border: 'none' }}>
                Login
              </button>
              <a className="logina2" onClick={handleShowRegistrationForm} style={{ paddingLeft: '60px', cursor: 'pointer' }}>
                Sign up
              </a>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={showRegistrationForm} onHide={handleCloseRegistrationForm}>
        <Modal.Header closeButton>
          <Modal.Title>REGISTER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmitReg}>
            <div className="mb-3 d-flex align-items-center">
              <BiUser className='icon1' size={22}/>
              <input
                className="form-control big-screen-input"
                type="text"
                placeholder="Name"
                name="name"
                value={formDataReg.name}
                onChange={handleChangeReg}
                required
              />
            </div>
        
            <div className="mb-3 d-flex align-items-center">
              <CiMail className="icon1" size={22}/> &nbsp;
              <input
                id="logint"
                className="form-control"
                type="email"
                placeholder="E-Mail"
                name="email"
                value={formDataReg.email}
                onChange={handleChangeReg}
                required
                style={{ borderColor: isValid ? 'initial' : 'red' }}
              />
                      {!isValid && <p style={{ color: 'red' }}>Please enter a valid email address</p>}

            </div>

            <div className="mb-3 d-flex align-items-center">
              <RiLockPasswordFill className="icon1" size={22} /> &nbsp;
              <input
                id="logint"
                className="form-control" 
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                name="password"
                value={formDataReg.password}
                onChange={handleChangeReg}
                required
              />
            </div>
        
            <div className="mb-3 d-flex align-items-center">
              <RiLockPasswordFill className='icon1' size={22}/>
              <input className="form-control"
                type="password"
                name="repassword"
                placeholder="Re-type Password"
                value={formDataReg.repassword}
                onChange={handleChangeReg}
                required
              />
            </div>
        
            <div className="mb-3 d-flex align-items-center">
              Trade Type:
              <input className='radioinput'
                type="radio"
                id="buy"
                name="trade"
                value="buy"
                checked={formDataReg.trade === 'buy'}
                onChange={handleChangeReg}
                required
              />
              <label className='but' for="buy">Buy</label>
              <input className='radioinput'
                type="radio"
                id="sell"
                name="trade"
                value="sell"
                checked={formDataReg.trade === 'sell'}
                onChange={handleChangeReg}
                required
              />
              <label className='but' for="sell">Sell</label>
            </div>

            <div className="login-btn">
        <br />
        <button
          className="btn btn-primary log-btn"
          role="button"
          type="submit"
          disabled={!isValid}
          style={{ backgroundColor: 'orangered', border: 'none' }}
        >
          SIGN UP
        </button>
        <br />
      </div>
          </form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default Login;
