import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem('token');
    
   
    navigate('/login');
  };

  // Check if user is authenticated
  const isAuthenticated = !!localStorage.getItem('token');

  if (!isAuthenticated) {
    // If user is not authenticated, show a message and redirect to login page
    setTimeout(() => {
      alert('Please login to access the dashboard');
      navigate('/login');
    }, 0);
    return null;
  }

  return (
    <div>
      <h1>Welocome to Dashboard</h1>
      <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
