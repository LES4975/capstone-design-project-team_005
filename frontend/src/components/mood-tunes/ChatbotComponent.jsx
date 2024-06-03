import React, { useState, useEffect } from "react";
import axios from "axios";

const ChatbotComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // 로컬 스토리지에서 대화 기록 불러오기
    const savedMessages =
      JSON.parse(localStorage.getItem("chatMessages")) || [];
    setMessages(savedMessages);
  }, []);

  useEffect(() => {
    // 대화 기록이 변경될 때마다 로컬 스토리지에 저장
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === "") return;

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

      const botMessage = response.data.response;
      setMessages([...newMessages, { sender: "bot", text: botMessage }]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <div className="chat-input">
            <div>
              <input
                type="text"
                placeholder="MoodTunes 챗봇에게 무엇이든 물어보세요!"
                className="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
            </div>
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
