import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
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
const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [loginError, setloginError] = useState("");
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const handleLogin = async (data) => {
    const username = data.username;
    const password = data.password;
    if (handleValidation()) {
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.userlogin));
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
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);
  const handleValidation = () => {
    const { password, username } = values;
    if (password === "") {
      toast.error("Password is required", toastOptions);
      return false;
    } else if (username === "") {
      toast.error("User required", toastOptions);
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
        <h1 className="text-3xl text-center font-bold">login</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
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
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => handleChange(e)}
            ></input>
            <label className="label">
              <span className="label-text">
                <Link className="text-primary">Forget Password ?</Link>{" "}
              </span>
            </label>
          </div>
          <input
            className="btn w-full btn-accent"
            value="Log In"
            type="submit"
          />
          <div>
            {loginError && <p className="text-red-500">{loginError}</p>}
          </div>
        </form>
        <p>
          New to ChatApp{" "}
          <Link className="text-primary" to="/register">
            Create New Account Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
