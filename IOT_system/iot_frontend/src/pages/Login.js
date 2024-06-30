import ParkLeft from "../assets/park_left.jpg";
import "../styles/Login.css";
import React, { useState } from "react";
import USER_service from "../services/USER_service";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
  const [user_tk, setAccount] = useState('');
  const [user_mk, setPass] = useState('');
  const navigate = useNavigate();

  
  const login = (e) => {
    e.preventDefault();
    try {
        axios.post("http://localhost:8082/user/login", {
          user_tk: user_tk,
          user_mk: user_mk,

        }).then((res) => 
        {
         console.log(res.data);
         
         if (res.data.message === "Login Ok"  && res.data.role === "ROLE_USER") {
            navigate("/");

            localStorage.setItem('res', JSON.stringify(res));
          } else if(res.data.message === "Login Ok"  && res.data.role === "ROLE_ADMIN"){
            navigate("/list_dto");
            localStorage.setItem('res', JSON.stringify(res));
          }else {
            navigate("/login");
          } 

        }, fail => {
       console.error(fail); // Error!
      });
    }

     catch (err) {
      alert(err);
    }
    // let LoginDTO = { user_tk,user_mk};
    // console.log('user => ' + JSON.stringify(LoginDTO));
    // USER_service.login(LoginDTO).then((res) => {
    //   const userId = res.data.id;
    //   const message = res.data.message;
    //   const role = res.data.Role;
      
    //   if (message === "Login Ok"  && role === "ROLE_USER") {
    //     const { history } = this.props;
    //     this.props.history.push("/menu");
    //     localStorage.setItem('res', JSON.stringify(res));
    //   } else if(message === "Login Ok"  && role === "ROLE_ADMIN"){
    //     const { history } = this.props;
    //     this.props.history.push("/list_dto");
    //     localStorage.setItem('res', JSON.stringify(res));
    //   }else {
    //     this.props.history.push("/login");
    //   }
    // });
  };

 

  // const login_PassHandler = (event) => {
  //   setPass(event.target.value);
  // };

  // const login_AccountHandler = (event) => {
  //   setAccount(event.target.value);
  // };
  


  return (
    // <div className="login">
    //   <div
    //     className="leftSide"
    //     style={{ backgroundImage: `url(${ParkLeft})` }}
    //   ></div>
    //   <div className="rightSide">
    //     <h1> Login to use our system</h1>

    //     <form id="login-form" method="POST">
    //       <label htmlFor="account">Account</label>
    //       <input name="account" placeholder="Enter account..." className="form-control" value={user_tk} type="text" onChange={login_PassHandler}/>
    //       <label htmlFor="password">Password</label>
    //       <input name="password" placeholder="Enter Password..." className="form-control" value={user_mk} type="text" onChange={login_AccountHandler}/>
          
    //       <button type="submit"> Send</button>
    //     </form>
    //     <button className="link-btn" onClick={login}>Already have an account? Submit here.</button>
    //   </div>
    // </div>


    <div>
            <div class="container">
            <div class="row">
                <h2>Login</h2>
             <hr/>
             </div>
             <div class="row">
             <div class="col-sm-6">
 
            <form>
        <div class="form-group">
          <label>Account</label>
          <input type="account"  class="form-control" id="email" placeholder="Enter account"
          
          value={user_tk}
          onChange={(event) => {
            setAccount(event.target.value);
          }}
          
          />
        </div>
        <div class="form-group">
            <label>password</label>
            <input   class="form-control" id="password" placeholder="Enter Pass"
            
            value={user_mk}
            onChange={(event) => {
              setPass(event.target.value);
            }}
            
            />
          </div>
                  <button type="submit" class="btn btn-primary" onClick={login} >Login</button>
              </form>
            </div>
            </div>
            </div>
     </div>
    );

}

export default Login;