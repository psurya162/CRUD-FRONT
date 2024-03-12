import React from 'react'
import {BrowserRouter as Router , Routes,Route} from 'react-router-dom'
import Login from './Component/Login'
import Register from './Component/Register'
import Dashboard from './Dashboard'
import Edit from './Component/Edit'
import AllUser from './Component/AllUser'
import Navbar from './Navbar'
import BasicExample from './card'


const App = () => {
  return (
    <div>
      <Router>
        <Navbar/>

        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/edit/:id' element={<Edit/>}/>
          <Route path='/alluser' element={<AllUser/>}/>
          <Route path='/card' element={<BasicExample/>}/>
        </Routes>
      </Router>

    </div>
  )
}

export default App