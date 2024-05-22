import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarComponent from "./SidebarComponent";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                  class="material-icons"
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                >
                  account_circle
                </div>
                {isMenuOpen && (
                  <div className="side-header-menu">
                    <div className="menu-item my">suyun0601</div>
                    <div
                      className="menu-item logout"
                      data-path="/"
                      onClick={pageRender}
                    >
                      <div class="material-icons">logout</div>
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
