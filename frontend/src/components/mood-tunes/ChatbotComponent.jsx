import React from "react";

const ChatbotComponent = () => {
  const [username, setUsername] = useState(""); // 사용자 이름을 관리하는 상태
  const [message, setMessage] = useState(""); // 사용자가 입력한 메시지를 관리하는 상태
  const [chatHistory, setChatHistory] = useState([]); // 채팅 내역을 관리하는 상태

  const sendMessage = async (username, message) => {
    const response = await fetch("http://3.36.159.136:8080/chatbot", {
      // 변경된 엔드포인트
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, message: message }),
    });
    const data = await response.json();
    setChatHistory([
      ...chatHistory,
      { user: "me", message: message },
      { user: "bot", message: data.response },
    ]);
    setMessage(""); // 메시지 전송 후 입력 필드를 비웁니다.
  };

  const handleSendClick = () => {
    if (username && message) {
      sendMessage(username, message);
    }
  };

  return (
    <div className="chat-wrapper">
      <main className="chat-contents">
        <div className="chat-box">
          <h2>Chatbot Service</h2>
          <p className="desc">
            Share your opinions and thoughts about our recommended <br />
            music lists with our chatbot
          </p>
          <section>
            <div className="chat-item-inner">
              {/* 채팅 내역 표시 */}
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={chat.user === "me" ? "chat-me" : "chat-you"}
                >
                  {chat.user === "bot" && (
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
                      <p>{chat.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* <!-- 메시지 입력 --> */}
          <div className="chat-input">
            <div>
              <input
                type="text"
                placeholder="Type your message here…"
                className="input"
                value={message}
                onChange={(e) => setMessage(e.target.value)} // 입력 필드 변경 핸들러
              />
            </div>
            <button className="send-btn" onClick={handleSendClick}>
              <img src="/images/icon_send.svg" alt="send" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatbotComponent;
