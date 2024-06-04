import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import MsgLikes from "./MsgLikes.jsx";

const ChatbotComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    const savedMessages =
      JSON.parse(localStorage.getItem("chatMessages")) || [];
    setMessages(savedMessages);
  }, []);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "me", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post("http://localhost:8000/chatbot", {
        message: input,
        history: newMessages.map((msg) => ({
          role: msg.sender === "me" ? "user" : "assistant",
          content: msg.text,
        })),
      });

      // JSON으로 파싱하여 데이터 추출
      const responseData = response.data;
      const botMessage = responseData.response;
      const specialComponent = responseData.special_component;

      // 특정 컴포넌트가 있는 경우 함께 렌더링
      setMessages([
        ...newMessages,
        { sender: "bot", text: botMessage, specialComponent: specialComponent },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }, [input, messages]);

  return (
    <div className="chat-wrapper">
      <main className="chat-contents">
        <div className="chat-box">
          <h2>챗봇 서비스 이용하기</h2>
          <p className="desc">
            추천받은 음악 플레이리스트에 대한 의견과 생각을 챗봇과 나눠보세요.
          </p>
          <section>
            <div className="chat-item-inner">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={msg.sender === "me" ? "chat-me" : "chat-you"}
                >
                  {msg.sender === "bot" && (
                    <div className="chat-user">
                      <div className="profile">
                        <img
                          src="/images/chatbot.svg"
                          alt="profile"
                          width={30}
                        />
                      </div>
                    </div>
                  )}
                  <div className="chat-row">
                    <div className="chat">
                      <p>{msg.text}</p>
                      {msg.specialComponent === "playlist" && (
                        <div className="playlist-component">
                          <MsgLikes />
                        </div>
                      )}
                      {/* 특정 컴포넌트가 있을 경우 렌더링
                      {msg.specialComponent && (
                        <div className="special-component">
                          {msg.specialComponent}
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </section>
          <div className="chat-input">
            <input
              type="text"
              placeholder="MoodTunes 챗봇에게 무엇이든 물어보세요!"
              className="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="send-btn" onClick={sendMessage}>
              <img src="/images/icon_send.svg" alt="send" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatbotComponent;
