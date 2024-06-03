import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as faceapi from "face-api.js";

const MoodTunesComponent = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isOpenCamera, setIsOpenCamera] = useState(true);
  const [songs, setSongs] = useState({});
  const [emotion, setEmotion] = useState("");
  const handleLike = (songName, songUrl) => {
  const likedSongs = JSON.parse(localStorage.getItem('likedSongs')) || [];
  likedSongs.push({ songName, songUrl });
  localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
};

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

          videoRef.current.addEventListener("loadedmetadata", () => {
            if (videoRef.current) {
              videoRef.current.play().catch((error) => {
                setIsOpenCamera(false);
              });
            }
          });
        }
      } catch (error) {
        console.log("Error:", error)
        alert("비디오 사용을 허용해주세요.");
        setIsOpenCamera(false);
      }
    };
    getVideo();
  }, []);

  const captureImageAndPredict = useCallback(async () => {
  const video = videoRef.current;
  const canvas = document.createElement('canvas');
  canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  canvas.toBlob(async (blob) => {
    const formData = new FormData();
    formData.append('image', blob);
    const response = await axios.post('http://127.0.0.1:8000/predict/final', formData);
    console.log(response.data);
    setSongs(response.data.songs);
    setEmotion(response.data.emotion);
    });
  }, []);

  return (
    <div className="music-wrapper">
      <main className="music-contents">
        <div className="recognition-box">
          <h2>Face Recognition</h2>
          <p>
            Please allow camera access to analyze your facial <br/> expression
            and determine your mood.
          </p>
          {isOpenCamera ? (
              <div className="video-on">
                <video
                    ref={videoRef}
                    style={{width: "100%", height: "300px"}}
                    screenshotFormat="image/jpeg"
                    autoPlay
                    muted
                />
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                  <button className={"btn"} onClick={captureImageAndPredict}>
                    Capture and Predict
                  </button>

                  <div className="mood">
                    <h3>Your mood: <span>{emotion}</span></h3>
                  </div>
                </div>
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
                  <path
                      d="M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z"/>
                </svg>
              </div>
          )}

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
                  <span>좋아요</span>
                </dd>
                <dd>
                  <span>재생</span>
                </dd>
              </dl>
              <div class="table-body">
                {Object.entries(songs).map(([songName, songUrl], index) => (
                    <dl class="table-row" key={index}>
                      <dd>{songName}</dd>
                      <dd>
                        <div className="like-btn">
                          <input type="checkbox" id={`music-${index}`} onClick={() => handleLike(songName, songUrl)}/>
                          <label role="button" htmlFor={`music-${index}`}></label>
                        </div>
                      </dd>
                      <dd>
                        <div className="play-btn">
                          <a href={songUrl} target="_blank" rel="noopener noreferrer">
                            <img src="/images/play.svg" alt="play" width={30}/>
                          </a>
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
                data-path="/likes"
              onClick={pageRender}
            >
              Check Likes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MoodTunesComponent;
