import React from "react";

const LikesComponent = () => {
  return (
    <div className="likes-wrapper">
      <main className="likes-contents">
        <div className="likes-box">
          <h2>Liked Playlists</h2>
          <p>32 songs</p>
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
                  <span>재생</span>
                </dd>
              </dl>
              <div class="table-body">
                <dl class="table-row">
                  <dd>모두 행복해져라</dd>
                  <dd>한올</dd>

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
                    <div className="play-btn">
                      <input type="checkbox" id={`play-3`} />
                      <label role="button" htmlFor={`play-3`}></label>
                    </div>
                  </dd>
                </dl>
                <dl class="table-row">
                  <dd>모두 행복해져라</dd>
                  <dd>한올</dd>

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
                    <div className="play-btn">
                      <input type="checkbox" id={`play-3`} />
                      <label role="button" htmlFor={`play-3`}></label>
                    </div>
                  </dd>
                </dl>
                <dl class="table-row">
                  <dd>모두 행복해져라</dd>
                  <dd>한올</dd>

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
                    <div className="play-btn">
                      <input type="checkbox" id={`play-3`} />
                      <label role="button" htmlFor={`play-3`}></label>
                    </div>
                  </dd>
                </dl>
                <dl class="table-row">
                  <dd>모두 행복해져라</dd>
                  <dd>한올</dd>

                  <dd>
                    <div className="play-btn">
                      <input type="checkbox" id={`play-1`} />
                      <label role="button" htmlFor={`play-1`}></label>
                    </div>
                  </dd>
                </dl>
              </div>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default LikesComponent;
