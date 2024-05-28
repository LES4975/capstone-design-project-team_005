import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const pageRender = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { path } = e.currentTarget.dataset;
    navigate(path);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('아이디와 비밀번호를 입력해주세요.');
      return;
    }
    setIsLoading(true);
    setError('');

    // 여기에 로그인 로직 추가 (예: API 호출)

    setTimeout(() => {
      // 로그인 성공 시
      setIsLoading(false);
      navigate('/home');
    }, 1000);
  };

  return (
    <div className="login-wrapper">
      <header className="login-header">
        <div className="inner">
          <div className="header-logo">
            <a href="/#header-logo" data-path="/" onClick={pageRender} aria-label="MoodTunes 로고">
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
          <h2>MoodTunes</h2>
          <form onSubmit={handleLogin} className="login-input">
            {/* <!-- 아이디 입력 --> */}
            <input
              className="input"
              type="text"
              placeholder="아이디"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {/* <!-- 비밀번호 입력 --> */}
            <input
              className="input"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? '로그인 중...' : '로그인'}
            </button>
          </form>
          <div className="login-bottom">
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
