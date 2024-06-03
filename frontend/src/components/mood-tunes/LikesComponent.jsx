import React, { useEffect, useState } from "react";

const LikesComponent = () => {
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    // 로컬 스토리지에서 좋아요한 곡들의 정보를 가져옵니다.
    const storedLikedSongs = JSON.parse(localStorage.getItem('likedSongs')) || [];
    setLikedSongs(storedLikedSongs);
  }, []);

  const handleClearLikes = () => {
    // 로컬 스토리지의 좋아요한 곡들의 정보를 삭제합니다.
    localStorage.removeItem('likedSongs');
    // 상태를 업데이트하여 화면을 갱신합니다.
    setLikedSongs([]);
  };

  return (
    <div className="likes-wrapper">
      <main className="likes-contents">
        <div className="likes-box">
          <h2>"좋아요" 를 누른 음악 목록</h2>
          <p>{likedSongs.length} 개의 음악</p>
          <button onClick={handleClearLikes}>좋아요 초기화하기</button>
          <ul className="music-list">
            <li class="music-list-table">
              <dl class="table-header">
                <dd>
                  <span>곡명</span>
                </dd>
                <dd>
                  <span>재생</span>
                </dd>
              </dl>
              <div class="table-body">
                {likedSongs.map((song, index) => (
                  <dl class="table-row" key={index}>
                    <dd>{song.songName}</dd>
                    <dd>
                      <div className="play-btn">
                        <a href={song.songUrl} target="_blank" rel="noopener noreferrer">
                          <img src="/images/play.svg" alt="play" width={30}/>
                        </a>
                      </div>
                    </dd>
                  </dl>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default LikesComponent;