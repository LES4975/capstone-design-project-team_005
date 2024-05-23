import React from "react";
import { useNavigate } from "react-router-dom";

const HomeComponent = () => {
  const navigate = useNavigate();

  const pageRender = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { path } = e.currentTarget.dataset;
    navigate(path);
  };

  return (
    <main className="home-wrapper">
      <section className="home-contents">
        <div
          className="home-menu1"
          data-path="/mood-tunes"
          onClick={pageRender}
        >
          <div className="">
            <h2 className="title">Facial Recognition</h2>
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="80px"
                viewBox="0 -960 960 960"
                width="80px"
                fill="#5f6368"
              >
                <path d="M480-800q134 0 227 93t93 227q0 134-93 227t-227 93q-134 0-227-93t-93-227q0-134 93-227t227-93Zm0 560q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70Zm0-100q48 0 86-27.5t54-72.5H340q16 45 54 72.5t86 27.5ZM340-560q0 17 11.5 28.5T380-520q17 0 28.5-11.5T420-560q0-17-11.5-28.5T380-600q-17 0-28.5 11.5T340-560Zm200 0q0 17 11.5 28.5T580-520q17 0 28.5-11.5T620-560q0-17-11.5-28.5T580-600q-17 0-28.5 11.5T540-560ZM40-720v-120q0-33 23.5-56.5T120-920h120v80H120v120H40ZM240-40H120q-33 0-56.5-23.5T40-120v-120h80v120h120v80Zm480 0v-80h120v-120h80v120q0 33-23.5 56.5T840-40H720Zm120-680v-120H720v-80h120q33 0 56.5 23.5T920-840v120h-80ZM480-480Z" />
              </svg>
            </div>
            <h2>Face Recognized</h2>
            <p>Your face has been successfully recognized.</p>
          </div>
          <div className="">
            <h2 className="title">Music Playlist</h2>
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="80px"
                viewBox="0 -960 960 960"
                width="80px"
                fill="#5f6368"
              >
                <path d="M640-160q-50 0-85-35t-35-85q0-50 35-85t85-35q11 0 21 1.5t19 6.5v-328h200v80H760v360q0 50-35 85t-85 35ZM120-320v-80h320v80H120Zm0-160v-80h480v80H120Zm0-160v-80h480v80H120Z" />
              </svg>
            </div>
            <h2>Personalized Playlist</h2>
            <p>Your personalized music playlist is ready.</p>
          </div>
        </div>
        <div className="home-box" data-path="/chatbot" onClick={pageRender}>
          <h2 className="title">Chatbot</h2>
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="80px"
              viewBox="0 -960 960 960"
              width="80px"
              fill="#5f6368"
            >
              <path d="M280-240q-17 0-28.5-11.5T240-280v-80h520v-360h80q17 0 28.5 11.5T880-680v600L720-240H280ZM80-280v-560q0-17 11.5-28.5T120-880h520q17 0 28.5 11.5T680-840v360q0 17-11.5 28.5T640-440H240L80-280Zm520-240v-280H160v280h440Zm-440 0v-280 280Z" />
            </svg>
          </div>
          <h2>Chatbot Enabled</h2>
          <p>You can now with the AI assistant.</p>
        </div>
        <div className="home-box" data-path="/likes" onClick={pageRender}>
          <h2 className="title">Likes</h2>
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="80px"
              viewBox="0 -960 960 960"
              width="80px"
              fill="#5f6368"
            >
              <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
            </svg>
          </div>
          <h2>Favorite Tracks</h2>
          <p>You can check the playlists you have liked.</p>
        </div>
      </section>
    </main>
  );
};

export default HomeComponent;
