import React from "react";

const ChatbotComponent = () => {
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
              {/* 내가 보낸 챗 */}
              <div className="chat-me">
                <div className="chat-row">
                  <div className="chat">
                    <p>Hi</p>
                  </div>
                </div>
                <div className="chat-row">
                  <div className="chat">
                    <p>
                      I really enjoyed the “Happy Vibes” playlist. The upbeat
                      tracks really lifted my mood!
                    </p>
                  </div>
                </div>
              </div>

              {/* 상대방이 보낸 챗 */}
              <div className="chat-you">
                {/* 프로필 */}
                <div className="chat-user">
                  <div className="profile">
                    <img src="/images/chatbot.svg" alt="profile" width={30} />
                  </div>
                </div>

                {/* 말풍선 1 */}
                <div className="chat-row">
                  <div className="chat">
                    <p>hello</p>
                  </div>
                </div>
                {/* 말풍선 2 */}
                <div className="chat-row ">
                  <div className="chat">
                    <p>
                      That’s great to hear! Our team carefully curated that
                      playlist to bring joy and positivity. We’re glad it
                      resonated with you.
                    </p>
                  </div>
                </div>
              </div>

              {/* 내가 보낸 챗 */}
              <div className="chat-me">
                <div className="chat-row">
                  <div className="chat">
                    <p>Thank you!</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- 메시지 입력 --> */}
          <div className="chat-input">
            <div>
              <input
                type="text"
                placeholder="Type your message here…"
                className="input"
              />
            </div>
            <button className="send-btn">
              <img src="/images/icon_send.svg" alt="send" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatbotComponent;
