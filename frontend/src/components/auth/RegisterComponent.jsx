import React from "react";
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  const navigate = useNavigate();

  const pageRender = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { path } = e.currentTarget.dataset;
    navigate(path);
  };

  return (
    <div className="login-wrapper">
      <header className="login-header">
        <div className="inner">
          <div className="header-logo">
            {/* 로고 */}
            <a href="/#header-logo" data-path="/" onClick={pageRender}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="#5f6368"
              >
                <path d="M480-800q134 0 227 93t93 227q0 134-93 227t-227 93q-134 0-227-93t-93-227q0-134 93-227t227-93Zm0 560q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70Zm0-100q48 0 86-27.5t54-72.5H340q16 45 54 72.5t86 27.5ZM340-560q0 17 11.5 28.5T380-520q17 0 28.5-11.5T420-560q0-17-11.5-28.5T380-600q-17 0-28.5 11.5T340-560Zm200 0q0 17 11.5 28.5T580-520q17 0 28.5-11.5T620-560q0-17-11.5-28.5T580-600q-17 0-28.5 11.5T540-560ZM40-720v-120q0-33 23.5-56.5T120-920h120v80H120v120H40ZM240-40H120q-33 0-56.5-23.5T40-120v-120h80v120h120v80Zm480 0v-80h120v-120h80v120q0 33-23.5 56.5T840-40H720Zm120-680v-120H720v-80h120q33 0 56.5 23.5T920-840v120h-80ZM480-480Z" />
              </svg>
              <span>MoodTunes</span>
            </a>
          </div>
        </div>
      </header>
      <main className="register-contents">
        <div className="register-box">
          <h2>Register</h2>
          <div className="register-input">
            <div className="input-include-label">
              <input
                className="input"
                type="text"
                placeholder="Enter your name"
              />
              <label>Name</label>
            </div>
            <p className="error-desc">에러메시지를 넣어주세요.</p>
          </div>
          <div className="login-input">
            <div className="input-include-label">
              <input
                className="input"
                type="text"
                placeholder="Enter your id"
              />
              <label>ID</label>
            </div>
            <p className="error-desc"></p>
          </div>

          <div className="login-input">
            <div className="input-include-label">
              <input
                className="input"
                type="password"
                placeholder="Enter your password"
              />
              <label>Password</label>
            </div>
            <p className="error-desc"></p>
          </div>
          <div className="login-input">
            <div className="input-include-label">
              <input
                className="input"
                type="password"
                placeholder="Confirm your password"
              />
              <label>Confirm Password</label>
            </div>
            <p className="error-desc"></p>
          </div>
          <button
            type="button"
            className="register-btn"
            data-path="/login"
            onClick={pageRender}
          >
            가입하기
          </button>
        </div>
      </main>
      <footer className="main-footer">
        <p className="copyright">
          &copy; MoodTunes <span className="this-year">2024</span>
        </p>
      </footer>
    </div>
  );
};

export default RegisterComponent;
