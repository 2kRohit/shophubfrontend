// frontend/Signup.jsx
import { BiUser } from 'react-icons/bi';
import { RiLockPasswordFill } from 'react-icons/ri';
import { CiMail } from 'react-icons/ci';
import axios from "axios";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Styles/style.css';

function Signup() {
  const navigate = useNavigate();

  const [formDataReg, setFormDataReg] = useState({ name: '', email: '', password: '', repassword: '', trade: '', securityQuestion: '', securityAnswer: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataReg((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
          securityQuestion: '',
          securityAnswer: '',
        });
        alert("Registration successfully");
        navigate('/login');
      } else {
        alert("Password and retype password should be the same");
      }
    } catch (error) {
      console.error("Existing user:", error);
      alert("Existing user");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="d">
            <div className="d1">
              <div className="d2" />
              <div className="d3">
                <h2>Registration</h2>
                <form onSubmit={handleSubmitReg}>
                  <BiUser className='ic' />
                  <input
                    className="form-control big-screen-input"
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={formDataReg.name}
                    onChange={handleChange}
                    required
                  />
                  <br />
                  <CiMail className='ic' />
                  <input className="t1"
                    type="email"
                    placeholder="E-mail"
                    name="email"
                    value={formDataReg.email}
                    onChange={handleChange}
                    required
                  />
                  <br />
                  <RiLockPasswordFill className='ic' />
                  <input className="t1"
                    type="password"
                    name="password"
                    placeholder="Password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    value={formDataReg.password}
                    onChange={handleChange}
                    required
                  />
                  <br />
                  <RiLockPasswordFill className='ic' />
                  <input className="t1"
                    type="password"
                    name="repassword"
                    placeholder="Re-type Password"
                    value={formDataReg.repassword}
                    onChange={handleChange}
                    required
                  />
                  <br />
                  <br />
                  <br />
                  <div className="wrap">
                    Trade Type:
                    <input className='radioinput'
                      type="radio"
                      id="buy"
                      name="trade"
                      value="buy"
                      checked={formDataReg.trade === 'buy'}
                      onChange={handleChange}
                      required
                    />
                    <label className='but' for="buy">Buy</label>
                    <input className='radioinput'
                      type="radio"
                      id="sell"
                      name="trade"
                      value="sell"
                      checked={formDataReg.trade === 'sell'}
                      onChange={handleChange}
                      required
                    />
                    <label className='but' for="sell">Sell</label>
                    
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>
                  <button className="reg" role="button"><span className="text1">SIGN UP</span></button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup;
