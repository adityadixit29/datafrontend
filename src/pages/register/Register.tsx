import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../main"
import toast from 'react-hot-toast'
const testserver = "http://localhost:3000/api/v1/user"
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(Context);
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${testserver}/register`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error("error.message");
      console.log("error");
      setIsAuthenticated(false);
      setLoading(false);
    }

  };
  if(isAuthenticated) return <Navigate to={"/home"}/>
  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input type="name" placeholder='Name'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input type="email" placeholder='Email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input type="password" placeholder='Password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button disabled={loading} type='submit'>Sign Up</button>
          <h4>Or</h4>
          <Link to={"/"}>Login</Link>
        </form>
      </section>
    </div>
  )
}

export default Register