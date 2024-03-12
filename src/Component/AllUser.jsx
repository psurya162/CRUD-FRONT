import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { InfinitySpin } from "react-loader-spinner";

const AllUser = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();
  const [dataa,setDataa]=useState("No data is available")

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate loading delay for 3 seconds
        setTimeout(async () => {
          const res = await axios.get("http://localhost:5000/api/userRegister/alluser");
          
          
          setUserData(res.data);
          setLoading(false); // Hide spinner after data is loaded
        }, 3000);
      } catch (error) {
        console.log("Error:", error);
        toast.error("Error fetching user data");
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/userRegister/${id}`);
      toast.success("Deleted Successfully");
      // After deletion, refetch user data
      const res = await axios.get("http://localhost:5000/api/userRegister/alluser");
      setUserData(res.data);
    } catch (err) {
      toast.error("Error in Deleting");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <>
      <Toaster richColors />
     
      {loading ? (
        <div className="loader">
        <InfinitySpin color="green" />
      </div>
      ) : (
        <div>
          {/* Display user data after loading */}
          {userData.map((item, index) => (
            <table className="table" key={index}>
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">FirstName</th>
                  <th scope="col">LastName</th>
                  <th scope="col">Email</th>
                  <th scope="col">Number</th>
                  <th scope="col">Password</th>
                  <th scope="col">Delete</th>
                  <th scope="col">Update</th>
                </tr>
              </thead>
              <tbody key={index}>
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{item.email}</td>
                  <td>{item.mobile}</td>
                  <td>{item.password}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                  </td>
                  <td>
                    <Link to={`/edit/${item._id}`} className="btn btn-success" onClick={() => handleEdit(item._id)}>
                      Update
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
      )}
    </>
  );
};

export default AllUser;
