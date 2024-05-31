import React, { useState, useEffect, useRef } from "react";

const ChatbotComponent = () => {
  const [messages, setMessages] = useState([
    { sender: "you", text: "안녕하세요." },
    { sender: "you", text: "메시지를 입력해주세요." },
  ]);
  const [inputText, setInputText] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const handleSendMessage = async () => {
    if (inputText.trim() !== "") {
      const newMessages = [...messages, { sender: "me", text: inputText }];
      setMessages(newMessages);
      setInputText("");
      setIsBotTyping(true);

      try {
        const response = await fetch("/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: "user", message: inputText }),
        });
        const data = await response.json();
        const botResponse = data.response;
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "you", text: botResponse },
        ]);
      } catch (error) {
        setError("챗봇 응답 중 오류가 발생했습니다. 다시 시도해주세요.");
      } finally {
        setIsBotTyping(false);
      }
    }
  };

  const getBotResponse = (input) => {
    // 간단한 응답 예제
    // const lowerCaseInput = input.toLowerCase();
    // if (lowerCaseInput.includes("안녕")) {
    //   return "안녕하세요! 무엇을 도와드릴까요?";
    // } else if (lowerCaseInput.includes("음악")) {
    //   return "좋아하는 음악 장르가 무엇인가요?";
    // } else {
    //   return "죄송해요, 잘 이해하지 못했어요. 다른 질문을 해주세요.";
    // }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
                  className={`chat-${msg.sender === "me" ? "me" : "you"}`}
                >
                  {msg.sender === "you" && (
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
              {isBotTyping && (
                <div className="chat-you">
                  <div className="chat-row">
                    <div className="chat">
                      <p>챗봇이 응답 중입니다...</p>
                    </div>
                  </div>
                </div>
              )}
              {error && (
                <div className="chat-error">
                  <p>{error}</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </section>
          <div className="chat-input">
            <div>
              <input
                type="text"
                placeholder="MoodTunes 챗봇에게 무엇이든 물어보세요!"
                className="input"
                value={inputText}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
            </div>
            <button className="send-btn" onClick={handleSendMessage}>
              <img src="/images/icon_send.svg" alt="send" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatbotComponent;
