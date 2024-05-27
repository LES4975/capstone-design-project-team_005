import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const pageRender = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { path } = e.currentTarget.dataset;
    navigate(path);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !username || !password || !confirmPassword) {
      setError('모든 필드를 입력해주세요.');
      return;
    }
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    setIsLoading(true);
    setError('');

    // 여기에 회원가입 로직 추가 (예: API 호출)

    setTimeout(() => {
      // 회원가입 성공 시
      setIsLoading(false);
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="login-wrapper">
      <header className="login-header">
        <div className="inner">
          <div className="header-logo">
            {/* 로고 */}
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
      <main className="register-contents">
        <div className="register-box">
          <h2>회원가입</h2>
          <form onSubmit={handleRegister} className="register-input">
            <div className="input-include-label">
              <input
                className="input"
                type="text"
                placeholder="이름을 입력해주세요."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label>이름</label>
            </div>
            <div className="input-include-label">
              <input
                className="input"
                type="text"
                placeholder="아이디를 입력해주세요."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label>아이디</label>
            </div>
            <div className="input-include-label">
              <input
                className="input"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>비밀번호</label>
            </div>
            <div className="input-include-label">
              <input
                className="input"
                type="password"
                placeholder="비밀번호를 다시 한번 입력해주세요."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <label>비밀번호 확인</label>
            </div>
            {error && <p className="error-desc">{error}</p>}
            <button type="submit" className="register-btn" disabled={isLoading}>
              {isLoading ? '가입 중...' : '가입하기'}
            </button>
          </form>
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
