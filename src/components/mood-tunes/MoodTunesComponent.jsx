import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const MoodTunesComponent = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [isOpenCamera, setIsOpenCamera] = useState(true);

  const pageRender = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { path } = e.currentTarget.dataset;
    navigate(path);
  };

  useEffect(() => {
    const getVideo = async () => {
      try {
        const constraints = { video: true };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          // 비디오 준비가 완료되었는지 확인
          videoRef.current.addEventListener("loadedmetadata", () => {
            videoRef.current.play().catch((error) => {
              // 여기에 실패 처리 로직을 추가할 수 있습니다.
              setIsOpenCamera(false);
            });
          });
        }
      } catch (error) {
        alert("비디오 사용을 허용해주세요.");
        setIsOpenCamera(false);
      }
    };

    getVideo();
  }, []);

  return (
    <div className="music-wrapper">
      <main className="music-contents">
        <div className="recognition-box">
          <h2>Face Recognition</h2>
          <p>
            Please allow camera access to analyze your facial <br /> expression
            and determine your mood.
          </p>
          {isOpenCamera ? (
            <div className="video-on">
              <video
                ref={videoRef}
                style={{ width: "100%", height: "300px" }}
                autoPlay
                muted
              />
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
            <h3>Your mood:</h3>
            <div className="mood-icon">
              <div class="material-icons smile">sentiment_very_satisfied</div>
              <span>Happy</span>
            </div>
          </div>
        </div>
        <div className="music-box">
          <h2>Recommended Music Lists</h2>
          <p>
            Based on your mood, we’ve curated personalized playlists <br /> for
            you to enjoy.
          </p>
          <ul className="music-list">
            <li class="music-list-table">
              <dl class="table-header">
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
              <div class="table-body">
                <dl class="table-row">
                  <dd>모두 행복해져라</dd>
                  <dd>한올</dd>
                  <dd>
                    <div className="like-btn">
                      <input type="checkbox" id={`music-1`} />
                      <label role="button" htmlFor={`music-1`}></label>
                    </div>
                  </dd>
                  <dd>
                    <div className="play-btn">
                      <input type="checkbox" id={`play-1`} />
                      <label role="button" htmlFor={`play-1`}></label>
                    </div>
                  </dd>
                </dl>
                <dl class="table-row">
                  <dd>My mistake</dd>
                  <dd>Gabriel Aplin</dd>
                  <dd>
                    <div className="like-btn">
                      <input type="checkbox" id={`music-2`} />
                      <label role="button" htmlFor={`music-2`}></label>
                    </div>
                  </dd>
                  <dd>
                    <div className="play-btn">
                      <input type="checkbox" id={`play-2`} />
                      <label role="button" htmlFor={`play-2`}></label>
                    </div>
                  </dd>
                </dl>
                <dl class="table-row">
                  <dd>Thursday</dd>
                  <dd>Jess Glynne</dd>
                  <dd>
                    <div className="like-btn">
                      <input type="checkbox" id={`music-3`} />
                      <label role="button" htmlFor={`music-3`}></label>
                    </div>
                  </dd>
                  <dd>
                    <div className="play-btn">
                      <input type="checkbox" id={`play-3`} />
                      <label role="button" htmlFor={`play-3`}></label>
                    </div>
                  </dd>
                </dl>
              </div>
            </li>
          </ul>
          <div className="bottom-btn">
            <button
              className="btn btn--reverse"
              data-path="/chatbot"
              onClick={pageRender}
            >
              Move to Chatbot Service
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MoodTunesComponent;
