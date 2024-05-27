import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarComponent from "./SidebarComponent";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userId, setUserId] = useState('suyun0601'); // 사용자 ID를 상태로 관리

  const pageRender = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { path } = e.currentTarget.dataset;
    navigate(path);
  };

  return (
    <div className="layout-wrapper">
      <div className="inner">
        <main className="layout-contents">
          <SidebarComponent />
          <div className="layout-right">
            <div className="layout-header">
              <div className="mypage">
                <div
                  className="material-icons"
                  aria-label="Toggle menu"
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                >
                  account_circle
                </div>
                {isMenuOpen && (
                  <div className="side-header-menu">
                    <div className="menu-item my">{userId}</div>
                    <div
                      className="menu-item logout"
                      data-path="/"
                      onClick={pageRender}
                    >
                      <div className="material-icons">logout</div>
                      로그아웃
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Outlet />
          </div>
        </main>
      </div>
      <footer className="main-footer">
        <p className="copyright">
          &copy; MoodTunes <span className="this-year">2024</span>
        </p>
      </footer>
    </div>
  );
};

export default Layout;
