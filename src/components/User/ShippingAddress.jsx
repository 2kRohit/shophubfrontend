import  React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useMediaQuery } from 'react-responsive';
import MiniNavbarFooter from './Navbar/MiniNavbarFooter';
import UserNavbar from './Navbar/UserNavbar';
import MiniNavBar from './Navbar/MiniNavBar';
import DarkMode from '../DarkMode';
import '../Styles/style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ShippingAddress() {

    const navigate= useNavigate();
    const authid= localStorage.getItem('authid');
    const authrole = localStorage.getItem('authrole');
    if(authrole!='user'){
      navigate('*')
    }
    const isMobile = useMediaQuery({ query: '(max-width: 980px)' });
    const selectedTheme = localStorage.getItem("selectedTheme");
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

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
      setIsOpen(!isOpen);
  };

  const fetchBio = async () => {
        try {
          const res = await axios.get(`https://shophubbackend.onrender.com/api/profile/profile/${localStorage.getItem('authid')}`);
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

        console.log("name : ",res.data[0].name)}

          else{
            alert("thenj poyi gooyis")
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
      if(bio.mobile1===bio.mobile2){
        toast.warning("use different mobile number as secondary")
      }
      else{
        console.log(bio)
        await axios.post(`https://shophubbackend.onrender.com/api/profile/update/${localStorage.getItem('authid')}`, bio)
        toast.success("Address Added successfully");
      }   
    } catch (error) {
      console.error('Error adding Address:', error);
      toast.error("Error adding Address:");
    }
  };


  return (
    <div className='ship-add-div' data-theme={selectedTheme}>
        <div>
          {isMobile ? <MiniNavBar /> : <UserNavbar />} 
        </div>
        <div class="container">
  <div class="row mt-5">
    <div class="col-md-8 mx-auto">
      <div class="shipping-address-form">
        <p class="form-title mt-3">SHIPPING ADDRESS</p>
        <form onSubmit={handleSubmit} className='mx-4'>
        <div className="mb-3 my-3">
          <div className="row">
            <div className="col text-start">
              <label htmlFor="name" className="form-label">Name:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                value={bio.name}
                onChange={handlechange}
                required
              />
            </div>
            <div className="col text-start">
              <label htmlFor="mobile1" className="form-label">Mobile Number:</label>
              <input
                type="number"
                className="form-control"
                placeholder="Primary number"
                name="mobile1"
                pattern="[5-9]{1}[0-9]{9}"
                maxLength="10"
                title="Must contain 10 numbers and first digit greater than 5"
                value={bio.mobile1}
                onChange={handlechange}
                required
              />
            </div>
          </div>

          <div className="my-3 text-start">
            <label htmlFor="address" className="form-label">Address:</label>
            <textarea
              className="form-control"
              rows="5"
              placeholder="Address"
              name="address"
              value={bio.address}
              onChange={handlechange}
              required
            />
          </div>

          <div className="row my-3">
            <div className="col text-start">
              <label htmlFor="pincode" className="form-label">Pin Code:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Pin Code"
                name="pincode"
                value={bio.pincode}
                onChange={handlechange}
                required
              />
            </div>
            <div className="col text-start">
              <label htmlFor="place" className="form-label">Place:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Place"
                name="place"
                value={bio.place}
                onChange={handlechange}
                required
              />
            </div>
          </div>

          <div className="row my-3">
            <div className="col text-start">
              <label htmlFor="city" className="form-label">City:</label>
              <input
                type="text"
                className="form-control"
                placeholder="City"
                name="city"
                value={bio.city}
                onChange={handlechange}
                required
              />
            </div>
            <div className="col text-start">
              <label htmlFor="state" className="form-label">State:</label>
              <input
                type="text"
                className="form-control"
                placeholder="State"
                name="state"
                value={bio.state}
                onChange={handlechange}
                required
              />
            </div>
          </div>

          <div className="row my-3">
            <div className="col text-start">
              <label htmlFor="landmark" className="form-label">Landmark:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Landmark"
                name="landmark"
                value={bio.landmark}
                onChange={handlechange}
                required
              />
            </div>
            <div className="col text-start">
              <label htmlFor="mobile2" className="form-label">Secondary Number:</label>
              <input
                type="tel"
                className="form-control"
                placeholder="Secondary number"
                name="mobile2"
                pattern="[5-9]{1}[0-9]{9}"
                maxLength="10"
                title="Must contain 10 numbers and first digit greater than 5"
                value={bio.mobile2}
                onChange={handlechange}
                required
              />
            </div>
          </div>

          <button className="btn btn-primary mt-3" type="submit">Submit</button>
        </div>
        </form>
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

export default ShippingAddress