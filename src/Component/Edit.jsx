import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, Toaster } from "sonner";

const Edit = () => {
  const [userData, setUserData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    mobile: "",
    password: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/userRegister/${id}`
        );
        const userData = res.data;
        setUserData(userData);
      } catch (err) {
        toast.error("Error While Fetching Data");
      }
    };
    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/api/userRegister/${id}`, userData);
      toast.success("User Updated Successfully");
      setTimeout(() => {
        navigate("/alluser");
      }, 2000);
    } catch (err) {
      toast.error("Error Updating User");
    }
  };

 

  return (
    <div>
      <Toaster richColors />
      <div className="container">
        <div className="row">
          <div className="col-md-6 pt-4">
            <form onSubmit={handleUpdate}>
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
                  name="password" // Add name attribute for the password field
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
    </div>
  );
};

export default Edit;
