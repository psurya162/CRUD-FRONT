import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";

const Register = () => {
  const [loading, setLoading] = useState(false); // Set loading to false initially
  const [userData, setUserdata] = useState({
    email: "",
    firstname: "",
    lastname: "",
    mobile: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserdata({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); 
      // Form validation
      if (userData.email === "") {
        toast.error("Email is required");
        setLoading(false); // Set loading back to false
        return;
      }
      if (userData.firstname === "") {
        toast.error("First Name is required");
        setLoading(false);
        return;
      }
      if(userData.lastname === ""){
        toast.error("Last Name is Required");
        setLoading(false);
        return;
      }
      if (userData.mobile === "") {
        toast.error("Mobile number is required");
        setLoading(false);
        return;
      }
      if (!/^\d{10}$/.test(userData.mobile)) {
        toast.error("Mobile number must be 10 digits");
        setLoading(false);
        return;
      }
    
      // Make API call to register user
      const res = await axios.post(
        "http://localhost:5000/api/userRegister/register",
        userData
      );
  
      // Check if the response contains a message indicating user already exists
      if (res.data.message === "User already exists") {
        setLoading(false); // Reset loading to false
        toast.error("User already exists with this email.");
      } else {
        toast.success("User Data submitted Successfully");
        console.log(res.data);
        setUserdata({
          email: "",
          firstname: "",
          lastname: "",
          mobile: "",
          password: "",
        });
  
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      console.log("Error", err);
      setLoading(false); 
        
      if (err.response) {
        if (err.response.status === 400) {
          toast.error("Invalid data provided. Please check your inputs.");
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      } else {
        toast.error("Network error. Please check your connection.");
      }
    }
  };
  
  

  return (
    <div>
      <Toaster richColors />
      {loading ? ( // Show loader if loading is true
        <div className="loader">
          <PacmanLoader color="green" />
        </div>
      ) : (
        // Render registration form if loading is false
        <div className="container-fluid register">
          <div className="row ">
            <div className="col-md-6 pt-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={userData.email}
                    onChange={handleChange}
                    name="email"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    name="firstname"
                    value={userData.firstname}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    name="lastname"
                    value={userData.lastname}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={handleChange}
                    name="password"
                    value={userData.password}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Mobile Number</label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={handleChange}
                    name="mobile"
                    value={userData.mobile}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
