import "./navbar.scss"
import {useContext} from 'react';
import {Link} from "react-router-dom"
import { Context } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
const testserver = "http://localhost:3000/api/v1/user"
function Navbar() {
  const {isAuthenticated, setIsAuthenticated, setLoading} = useContext(Context)
  console.log(isAuthenticated)

  const logoutHandler = async () => {
    setLoading(true)
    try {
      await axios.get(`${testserver}/logout`,
        {
          withCredentials: true,
        }
      );
      toast.success("Logged Out Successfully");
      setLoading(false);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error("error.response.message");
      console.log(error);
      setIsAuthenticated(true);
      setLoading(false);
    }

  };


  return (
    //main class of navbar
    <div className="navbar">
      {/* logo for the navbar  */}
      <div className="logo">
        <img src="logo.svg" alt="" />
        {/* name */}
        <span>React Admin</span>
      </div>
      {/* icons  */}
      <div className="icons">
        <img src="/search.svg" alt="" className="icon" />
        <img src="app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        {/* users  */}
        <div className="user">
        <img src="/profile.jpg" alt=""/>
        <span>Jane</span>
        </div>
        {isAuthenticated ? <button onClick={logoutHandler} className="btn" style={{ padding: '5px', background:"transparent", color:"white",borderRadius:"5px" }}>Logout</button>
         : <Link to={"/"}>Login</Link>}
      </div>
    </div>
  )
}

export default Navbar