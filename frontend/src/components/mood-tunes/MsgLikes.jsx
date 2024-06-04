import React, { useEffect, useState } from "react";
import styled from "styled-components";

const MsgLikes = () => {
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    // 로컬 스토리지에서 좋아요한 곡들의 정보를 가져옵니다.
    const storedLikedSongs =
      JSON.parse(localStorage.getItem("likedSongs")) || [];
    setLikedSongs(storedLikedSongs);
  }, []);

  const LikeList = styled.ul`
    font-size: inherit;
    width: 100%;
    padding: 10px;
  `;
  const LikeSong = styled.li``;

  return (
    <main>
      <div className="likes-box">
        <LikeList>
          {likedSongs.map((song, index) => (
            <LikeSong key={index}>{song.songName}</LikeSong>
          ))}
        </LikeList>
      </div>
    </main>
  );
};

export default MsgLikes;
