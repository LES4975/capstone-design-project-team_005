import React, { useState } from "react";

const LikesComponent = () => {
  const [likedSongs, setLikedSongs] = useState([
    { id: 1, title: "모두 행복해져라", artist: "한올" },
    { id: 2, title: "My mistake", artist: "Gabriel Aplin" },
    { id: 3, title: "Thursday", artist: "Jess Glynne" },
    { id: 4, title: "모두 행복해져라", artist: "한올" },
    { id: 5, title: "My mistake", artist: "Gabriel Aplin" },
    { id: 6, title: "Thursday", artist: "Jess Glynne" },
    { id: 7, title: "모두 행복해져라", artist: "한올" },
    { id: 8, title: "My mistake", artist: "Gabriel Aplin" },
    { id: 9, title: "Thursday", artist: "Jess Glynne" },
    { id: 10, title: "모두 행복해져라", artist: "한올" },
  ]);

  const handlePlaySong = (songId) => {
    console.log(`Playing song with id: ${songId}`);
    // 여기에 재생 로직을 추가
  };

  return (
    <div className="likes-wrapper">
      <main className="likes-contents">
        <div className="likes-box">
          <h2>"좋아요"를 누른 음악 목록 </h2>
          <p>{likedSongs.length}개의 음악</p>
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
                  <span>재생</span>
                </dd>
              </dl>
              <div className="table-body">
                {likedSongs.map((song) => (
                  <dl key={song.id} className="table-row">
                    <dd>{song.title}</dd>
                    <dd>{song.artist}</dd>
                    <dd>
                      <div className="play-btn">
                        <input
                          type="checkbox"
                          id={`play-${song.id}`}
                          onChange={() => handlePlaySong(song.id)}
                        />
                        <label role="button" htmlFor={`play-${song.id}`}></label>
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
