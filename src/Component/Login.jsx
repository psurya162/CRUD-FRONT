import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

const Login = () => {
  const [userData, setUserdata] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserdata({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = userData;
      if (!email || !password) {
        toast.error("Email and password are required");
        return;
      }
  
      setLoading(true); // Set loading to true when form is submitted
      
  
      const res = await axios.post(
        "http://localhost:5000/api/userRegister/login",
        userData
      );
      if (res.status === 200) {
        toast.success("Successfully Logged in");
        localStorage.setItem("token", res.data.token);
  
       
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      }
    } catch (err) {
      setLoading(false); 
      if (err.response && err.response.status === 401) {
        toast.error("Incorrect email or password");
      } else {
        console.log("Error:", err);
      }
    }
  };
  
  

  return (
    <div>
      <Toaster richColors />
      {loading ? ( 
        <div className="text-center mt-5">
          <ScaleLoader color="green" />
        </div>
      ) : (
        <div className="container">
          <div className="row">
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
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={handleChange}
                    name="password"
                    value={userData.password}
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

export default Login;
