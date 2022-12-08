import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import config from '../config';
import profilepic from '../images/man.png'

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  //       //     //fetch user info
  function fetchUserData() {
    try {
      const token = localStorage.getItem('token');
      fetch(config.profileURL, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setUser(data);
          localStorage.setItem('profile',JSON.stringify(data))
        })
    }
    catch (error) {
      console.error(error.response.data);
    }

  }

  useEffect(()=>{
    if(localStorage.getItem('token')){
      fetchUserData()
    }
  },[]);

//   //end of fetch function

  //Logout
  function logout() {
    localStorage.clear();
    navigate('/')
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }} className="navbar-brand">BlogSpot.Com</h1>

          {!(localStorage.getItem('token'))
            ?
            <div className="d-flex">
              <button onClick={() => navigate('/signup')} className="btn btn-outline-success ">Sign Up</button> &nbsp;&nbsp;
              <button onClick={() => navigate('/signin')} className="btn btn-outline-success">Sign In</button>
            </div>
            :
           

            <div class="dropdown show">
              <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <b>{user?.firstname}&nbsp;{user?.lastname}</b>
              </a>

              <div style={{ margin: "0px 20px 0px 0px " }} className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <button onClick={() => { navigate('/') }} className="dropdown-item btn btn-primary" type="button" >Home</button>
                <button className="dropdown-item btn btn-primary" type="button" data-toggle="modal" data-target="#exampleModalLong">Profile</button>
                <button onClick={() => { navigate('/postarticle') }} className="dropdown-item" type="button">Post Article</button>
                <button onClick={() => logout()} className="dropdown-item" type="button">Logout</button>
              </div>
            </div>

          }


        </div>
      </nav>


      {/* using bootstrap modal for user profile */}

      <div className='row'>
        <div className='col-md-4'>
          <div className="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">WELCOME TO CRYPTODATA</h5>
                </div>
                <div className="modal-body d-flex flex-column ">
                  <div style={{ textAlign: 'center' }}>
                    <img style={{ height: "200px" }} src={profilepic} alt="profilepic" />
                  </div>
                  <div style={{ margin: "25px 0px 0px 17px" }}>
                    <h4> Name:  {user.firstname}&nbsp;{user.lastname}</h4>
                    <h4>Email: {user.email}</h4>
                    <h4>Phone: {user.phone}</h4>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
