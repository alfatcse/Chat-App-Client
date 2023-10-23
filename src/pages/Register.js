import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";
import { useForm } from "react-hook-form";
const FormContainer = styled.div`
  height: 100vh;
  width: 250vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;
const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);
  const handleRegister = async (event) => {
    if (handleValidation()) {
      const { password, confirmPassword, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data?.status !== "Success") {
        toast.error(data.msg, toastOptions);
      }
      if (data?.status === "Success") {
        localStorage.setItem("chat-app-user", JSON.stringify(data?.data));
        navigate("/");
      }
    }
  };
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("Password not Matched", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("User not three character", toastOptions);
      return false;
    } else if (password.length < 3) {
      toast.error("Password not three character", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email needed", toastOptions);
      return false;
    }
    return true;
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div className="h-[600px] flex justify-center items-center ">
      <div className="w-96 p-7">
        <h1 className="text-3xl text-center font-bold">Register</h1>
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">User Name</span>
            </label>
            <input
              type="text"
              placeholder="UserName"
              name="username"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Repeat Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              name="confirmPassword"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => handleChange(e)}
            ></input>
            <label className="label">
              <span className="label-text">
                <Link className="text-primary">Forget Password?</Link>{" "}
              </span>
            </label>
          </div>
          <input
            className="btn w-full btn-accent"
            value="Register"
            type="submit"
          />
        </form>
        <p>
          Already have ChatApp Account
          <Link className="text-primary" to="/login">
            {" "}
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
{
  /* <>
<FormContainer>
  <form onSubmit={(event) => handleSubmit(event)}>
      <div className="brand">
          <img src={Logo} alt="Logo"></img>
          <h1>ChatApp</h1>
      </div>
      <input type='text' placeholder="UserName" name="username" onChange={e=>handleChange(e)}></input>
      <input type='email' placeholder="Email" name="email" onChange={e=>handleChange(e)}></input>
      <input type='password' placeholder="Password" name="password" onChange={e=>handleChange(e)}></input>
      <input type='password' placeholder="Confirm Password" name="confirmPassword" onChange={e=>handleChange(e)}></input>
      <button type="submit">Create User</button>
      <br></br>
      <span>Already have an Account ? <Link to='/login'>Log in</Link></span>
  </form>
</FormContainer>
<ToastContainer/>
</> */
}
