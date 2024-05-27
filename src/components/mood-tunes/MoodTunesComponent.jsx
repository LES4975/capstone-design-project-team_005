import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const MoodTunesComponent = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isOpenCamera, setIsOpenCamera] = useState(true);
  const [capturedImage, setCapturedImage] = useState(null);
  const [playlist, setPlaylist] = useState([
    { id: 1, title: "모두 행복해져라", artist: "한올", liked: false, playing: false },
    { id: 2, title: "My mistake", artist: "Gabriel Aplin", liked: false, playing: false },
    { id: 3, title: "Thursday", artist: "Jess Glynne", liked: false, playing: false },
  ]);

  const pageRender = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { path } = e.currentTarget.dataset;
    navigate(path);
  };

  const startVideoStream = async () => {
    try {
      const constraints = { video: { width: 640, height: 640 } };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      alert("비디오 사용을 허용해주세요.");
      setIsOpenCamera(false);
    }
  };

  useEffect(() => {
    startVideoStream();
  }, []);

  const toggleLike = (id) => {
    setPlaylist((prevPlaylist) =>
      prevPlaylist.map((song) =>
        song.id === id ? { ...song, liked: !song.liked } : song
      )
    );
  };

  const togglePlay = (id) => {
    setPlaylist((prevPlaylist) =>
      prevPlaylist.map((song) =>
        song.id === id ? { ...song, playing: !song.playing } : song
      )
    );
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      const imageDataUrl = canvasRef.current.toDataURL("image/png");
      setCapturedImage(imageDataUrl);
    }
  };

  const retakeImage = () => {
    setCapturedImage(null);
    startVideoStream();
  };

  return (
    <div className="music-wrapper">
      <main className="music-contents">
        <div className="recognition-box">
          <h2>표정 분석</h2>
          <p>표정 분석과 기분 진단을 위해 카메라 접근을 허용해주세요.</p>
          {isOpenCamera ? (
            <div className="video-on">
              {capturedImage ? (
                <div className="centered">
                  <img src={capturedImage} alt="캡처된 이미지" style={{ width: "300px", height: "300px" }} />
                  <button className="btn btn--reverse" onClick={retakeImage}>다시 찍기</button>
                </div>
              ) : (
                <div className="centered">
                  <video
                    ref={videoRef}
                    style={{ width: "100%", height: "300px" }}
                    autoPlay
                    muted
                  />
                  <button className="btn btn--reverse" onClick={captureImage}>화면 캡처하기</button>
                </div>
              )}
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
          ) : (
            <div className="video-off">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="80px"
                viewBox="0 -960 960 960"
                width="80px"
                fill="#5f6368"
              >
                <path d="M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z" />
              </svg>
            </div>
          )}
          <div className="mood">
            <h3><br/><br/><br/>당신의 기분:</h3>
            <div className="mood-icon">
              <div className="mood-item">
                <div className="material-icons" style={{ color: "limegreen" }}>sentiment_very_satisfied</div>
                <span> 기쁨</span>
              </div>
              <div className="mood-item">
                <div className="material-icons" style={{ color: "blue" }}>sentiment_dissatisfied</div>
                <span> 슬픔</span>
              </div>
              <div className="mood-item">
                <div className="material-icons" style={{ color: "red" }}>sentiment_very_dissatisfied</div>
                <span> 분노</span>
              </div>
              <div className="mood-item">
                <div className="material-icons" style={{ color: "grey" }}>sentiment_neutral</div>
                <span> 불안</span>
              </div>
            </div>
          </div>
        </div>
        <div className="music-box">
          <h2>맞춤형 플레이리스트</h2>
          <p>당신의 기분에 맞춰 준비한 음악 플레이리스트를 즐겨보세요.</p>
          <ul className="music-list">
            <li className="music-list-table">
              <dl className="table-header">
                <dd>
                  <span>곡명</span>
                </dd>
                <dd>
                  <span>아티스트</span>
                </dd>
                <dd>
                  <span>좋아요</span>
                </dd>
                <dd>
                  <span>재생</span>
                </dd>
              </dl>
              <div className="table-body">
                {playlist.map((song) => (
                  <dl key={song.id} className="table-row">
                    <dd>{song.title}</dd>
                    <dd>{song.artist}</dd>
                    <dd>
                      <div className="like-btn">
                        <input
                          type="checkbox"
                          checked={song.liked}
                          onChange={() => toggleLike(song.id)}
                          id={`music-${song.id}`}
                        />
                        <label role="button" htmlFor={`music-${song.id}`}></label>
                      </div>
                    </dd>
                    <dd>
                      <div className="play-btn">
                        <input
                          type="checkbox"
                          checked={song.playing}
                          onChange={() => togglePlay(song.id)}
                          id={`play-${song.id}`}
                        />
                        <label role="button" htmlFor={`play-${song.id}`}></label>
                      </div>
                    </dd>
                  </dl>
                ))}
              </div>
            </li>
          </ul>
          <div className="bottom-btn">
            <button
              className="btn btn--reverse"
              data-path="/chatbot"
              onClick={pageRender}
            >
              챗봇 서비스로 이동하기
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MoodTunesComponent;
