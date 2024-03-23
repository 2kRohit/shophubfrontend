import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserNavbar from './Navbar/UserNavbar';
import MiniNavBar from './Navbar/MiniNavBar';
import MiniNavbarFooter from './Navbar/MiniNavbarFooter';
import '../Styles/style.css'

function Checkout() {

  const isMobile = useMediaQuery({ query: '(max-width: 980px)' });
  const selectedTheme = localStorage.getItem("selectedTheme");
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const authrole = localStorage.getItem('authrole');
    if(authrole!='user'){
      navigate('*')
    }
        const [bio, setBio]= useState({ name:'',
                                        mobile1:'',
                                        pincode:'',
                                        place:'',
                                        address:'',
                                        city:'',
                                        state:'',
                                        landmark:'',
                                        mobile2:''
                                     });

      const fetchBio = async () => {
        try {
          const res = await axios.get(`https://shophubbackend.onrender.com/api/profile/profile/${localStorage.getItem('authid')}` );
          /*setFormFields(res.data)
          console.log(formFields)*/
          if(res){
            setBio({name:res.data[0].name,
          mobile1:res.data[0].mobile1,
          pincode:res.data[0].pincode,
          place:res.data[0].place,
          address:res.data[0].address,
          city:res.data[0].city,
          state:res.data[0].state,
          landmark:res.data[0].landmark,
          mobile2:res.data[0].mobile2});

        console.log(res.data[0].fname)}

        else {
          toast.error('error fetching address', {
            position: "top-right",
            autoClose: 3000, // Close the toast after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        
          
          /*console.log('profile',bio);*/
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      };
      useEffect(() => {
        fetchBio()
    },[])

    const handlechange = (e) => {
      const { name, value, type } = e.target;
      setBio((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (bio.mobile1===bio.mobile2){
        alert("use different mobile number as secondary")
        }
      else{
        console.log(bio)
        const res = await axios.get(`https://shophubbackend.onrender.com/api/order/getOrderDetails/${localStorage.getItem('authid')}`);
        const orderId = res.data.orderId;
        console.log('order id : ',orderId)
        await axios.post(`https://shophubbackend.onrender.com/api/order/profile/${orderId}`, bio)
        toast.success("Address Added successfully");
      }
    
    } catch (error) {
      console.error('Error adding Address:', error);
      toast.error("Error adding Address:");
    }
};

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`https://shophubbackend.onrender.com/api/order/dsplywaiting/${localStorage.getItem('authid')}`);
      setProduct(res.data);
      console.log('Order ID: ', res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteOrders = async () => {
    try {
      await axios.delete(`https://shophubbackend.onrender.com/api/order/delete/${localStorage.getItem('authid')}`, {
        params: { status: 'waiting for confirmation' },
      });
      console.log('Orders with status "waiting for confirmation" deleted.');
    } catch (error) {
      console.error('Error deleting orders:', error);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      deleteOrders();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleCheckout = async () => {
    try {
      console.log('Handle Checkout called');
      const res = await axios.get(`https://shophubbackend.onrender.com/api/order/getOrderDetails/${localStorage.getItem('authid')}`);
      console.log(" address : ",res.data.address);
      if(res.data.address){
      const { orderId, productId } = res.data;
  
      if (orderId && productId) {
        navigate(`/creditcardform?orderId=${orderId}&productId=${productId}`);
      } else {
        console.error('Order ID or Product ID not found in the response');
      }
    }
    else {
      toast.error('Please select the delivery address', {
        position: "top-right",
        autoClose: 3000, // Close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };


  return (
    <div className='checkout-div' data-theme={selectedTheme}>
        <div>
          {isMobile ? <MiniNavBar /> : <UserNavbar />} 
        </div>
        <div className='container'>
          <h1>YOUR ORDER</h1>
          <div className='d-flex flex-md-row flex-column'> 
        <div className='checkformdiv ms-3'>
          <form className='checkform' onSubmit={handleSubmit}>
            <div className='vertical1'>
              <div className='checkform1'>
                <label className="fname">Name*</label>
                <input
                  className="checktxt"
                  type="text"
                  name="name"
                  value={bio.name}
                  onChange={handlechange}
                />
              </div>
              <div className='checkform2'>
                <label className="fname">Mobile Number*</label>
                <input
                  className="checktxt"
                  type="number"
                  name="mobile1"
                  pattern="[5-9]{1}[0-9]{9}"
                  maxLength="10"
                  title="Must contain 10 numbers and first digit in greater than 5"
                  value={bio.mobile1}
                  onChange={handlechange}
                />
              </div>
            </div>
            <div className='vertical2'>
                <div className='checkform3'>
                  <label className="fname">Pincode*</label>
                  <input className="checktxt" 
                    type="number" 
                    placeholder="pincode"
                    name="pincode"
                    maxLength="6"
                    value={bio.pincode}
                    onChange={handlechange}
                  />
                </div>
                <div className='checkform4'>
                  <label className="fname">Locality*</label>
                  <input className="checktxt" 
                    type="text" 
                    placeholder="place"
                    name="place"
                    value={bio.place}
                    onChange={handlechange}
                  />
                </div>
                </div>
                <div className='checkform5'>
                  <label className="fname">Address*</label>
                  <textarea className="checktxt1" 
                    type="text" 
                    placeholder="Address"
                    name="address"
                    rows="4" cols="16"
                    value={bio.address}
                    onChange={handlechange}
                  />
                </div>
                <div className='vertical3'>
                <div className='checkform6'>
                  <label className="fname">City*</label>
                  <input className="checktxt" 
                    type="text" 
                    placeholder="City"
                    name="city"
                    value={bio.city}
                    onChange={handlechange}
                  />
                </div>
                <div className='checkform7'>
                  <label className="fname">State*</label>
                  <input className="checktxt" 
                    type="text" 
                    placeholder="State"
                    name="state"
                    value={bio.state}
                    onChange={handlechange}
                  />
                </div>
                </div>            
              <div className='vertical4'>
              <div className='checkform8'>
                <label className="fname">Landmark</label>
                <input
                  className="checktxt"
                  type="text"
                  placeholder="Landmark"
                  name="landmark"
                  value={bio.landmark}
                  onChange={handlechange}
                />
              </div>
              <div className='checkform9'>
                <label className="fname text-left" style={{textAlign:'center'}}>Alternate Mobile number</label>
                <input
                  className="checktxt"
                  type="number"
                  placeholder="Secondary Number"
                  name="mobile2"
                  pattern="[5-9]{1}[0-9]{9}"
                  maxLength="10"
                  title="Must contain 10 numbers and first digit in greater than 5"
                  value={bio.mobile2}
                  onChange={handlechange}
                />
              </div>
            </div>
            <button className="button-65" type="submit">Save & Delivery here</button>
          </form>
        </div>
        <div className='cartdiv ms-md-5 mt-md-0 mt-3'>
          <div id="overflowTest">
            {product.map((order, index) => (
              <table key={index} className='table'>
                <thead>
                <tr>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {product.map((order, index) => (
                  <tr key={index}>
                    <td>
                      <img className='card-img-top' src={`${order.productDetails.image}`} alt='Card' style={{ height: '80px', width: '80px' }} />
                    </td>
                    <td>{order.productDetails.productName}</td>
                    <td>₹{order.price}</td>
                    <td>{order.quantity}</td>
                    <td>₹{order.total}</td>
                  </tr>
                ))}
              </tbody>
              </table>
            ))}
            <button className="button-37" type="submit" onClick={handleCheckout} style={{ marginTop: '70px' }}>Check Out</button>
          </div>
        </div>
      </div>
    </div>
    <div>
        {isMobile && <MiniNavbarFooter />}      
      </div>
      <ToastContainer />
    </div>
  )
}

export default Checkout