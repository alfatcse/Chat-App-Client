import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Inputchat from "./Inputchat";
import axios from "axios";
import Logout from "./Logout";
import Messages from "./Messages";
import {
  sendMessageRoute,
  getAllMessagesRoute,
  
} from "../utils/APIRoutes";
import {v4 as uuidv4} from 'uuid';
const ChatContainer = ({ currentChat, currentUser,socket }) => {
  console.log('ssss',socket);
  const [message, setMessage] = useState([]);
  const scrollRef = useRef();
  const [arivalMessage, setArivalMessage] = useState(null);
  const handleSendMsg = async (msg) => {
    const { data } = await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
    const msgs = [...message];
    msgs.push({ fromSelf: true, message: msg });
    setMessage(msgs);
  };
  useEffect(() => {
    if (socket.current) {
      console.log('msg-ree');
      socket.current.on("msg-recieve", (msg) => {
        setArivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);
  useEffect(() => {
    arivalMessage && setMessage((prev) => [...prev, arivalMessage]);
  }, [arivalMessage]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  useEffect(() => {
    async function fetchData() {
      if (currentChat) {
        const response = await axios.post(getAllMessagesRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        console.log('response',response);
        setMessage(response.data.data);
      }
    }
    fetchData();
  }, [currentChat]);
  console.log("mes", message);
  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img 
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout></Logout>
          </div>
          <div className="chat-messages">
            {message.map((msg) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`message ${
                      msg.fromSelf ? "sended" : "recieved"
                    }`}
                  >
                    <div className="content">
                      <p>
                        {msg.fromSelf} {msg.message}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Inputchat handleSendMsg={handleSendMsg}> </Inputchat>
        </Container>
      )}
    </>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
export default ChatContainer;
