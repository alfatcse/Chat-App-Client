import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { SetAvatarRoute } from "../utils/APIRoutes";
import loader from "../assets/loader.gif";
import { Buffer } from "buffer";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
const SetAvatar = () => {
  const api = process.env.REACT_APP_AVATAR;
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const setProfilePicture = async () => {
    if (selectedAvatar === null) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const img = avatars[selectedAvatar];
      const data = await axios.post(`${SetAvatarRoute}/${user?._id}`, {
        avatarImage: img,
      });

      if (data?.data?.isSet === true) {
        user.isAvatarImageSet = true;
        user.avatarImage = data?.data?.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error select an avatar again", toastOptions);
      }
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  });
  useEffect(() => {
    async function fetchData() {
      const data = [];
      for (let i = 0; i < 4; i++) {
        try {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
          const buffer = new Buffer(image.data);
          data.push(buffer.toString("base64"));
        } catch (error) {
          console.error("Error fetching image:", error);
        }
        // Introduce a delay between requests (e.g., 1 second)
        await new Promise((resolve) => setTimeout(resolve, 4000));
      }
      setAvatars(data);
      setIsLoading(false);
    }
    fetchData();
  }, []); // Empty dependency array to run once on component mount
  const navigate = useNavigate();
  const ava = (index) => {
    setSelectedAvatar(index);
  };
  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader"></img>
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your Profile Picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar${
                    selectedAvatar === index ? " selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => ava(index)}
                    key={index}
                  ></img>
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Set as Your Profile Picture
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
};

export default SetAvatar;
