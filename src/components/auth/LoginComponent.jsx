import React from "react";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
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
      <main className="login-contents">
        <div className="login-box">
          <h2>Login</h2>
          <div className="login-input">
            {/* <!-- 아이디 입력 --> */}
            <input className="input" type="email" placeholder="아이디" />
            {/* <!-- 비밀번호 입력 --> */}
            <input className="input" type="password" placeholder="비밀번호" />
          </div>
          <button
            type="button"
            className="login-btn"
            data-path="/home"
            onClick={pageRender}
          >
            로그인
          </button>

          <div className="login-bottom">
            {/* <a
              className="hover:text-primary focus:text-primary"
              role="button"
              href="#login-find-password"
              // data-path="/reset-password"
              onClick={pageRender}
            >
              비밀번호찾기
            </a> */}
            {/* <span className="mx-3.5 text-gray-darken">|</span> */}
            <a
              className="hover:text-primary focus:text-primary"
              role="button"
              href="#login-signup"
              data-path="/register"
              onClick={pageRender}
            >
              회원가입
            </a>
          </div>

          {/* <div className="divide"></div>

          <button className="spotify-login relative flex w-full items-center justify-center rounded px-6 py-4 lg:py-4.5">
            <img
              src="/images/spotify.svg"
              alt="spotify sign in"
              className="absolute"
            />
            <span className="font-bold">spotify로 계속하기</span>
          </button> */}
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

export default LoginComponent;
