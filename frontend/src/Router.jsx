import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
// import NotFound from "./components/common/NotFound";
import Layout from "./components/layout/Layout";
import MainComponent from "./components/main/MainComponent";
import LoginComponent from "./components/auth/LoginComponent";
import RegisterComponent from "./components/auth/RegisterComponent";
import HomeComponent from "./components/home/HomeComponent";
import MoodTunesComponent from "./components/mood-tunes/MoodTunesComponent";
import ChatbotComponent from "./components/mood-tunes/ChatbotComponent";
import LikesComponent from "./components/mood-tunes/LikesComponent";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/login" element={<LoginComponent />} />

        <Route path="/" element={<Layout />}>
          {/* Home */}
          <Route path="/home" element={<HomeComponent />} />

          {/* Facial Recognition & Music Playlist */}
          <Route path="/mood-tunes" element={<MoodTunesComponent />} />

          {/* Chatbot */}
          <Route path="/chatbot" element={<ChatbotComponent />} />

          {/* Likes */}
          <Route path="/likes" element={<LikesComponent />} />

          {/* 브랜드 */}
          {/* <Route path="/brand" element={<Brand />} />
          <Route path="/brand/detail/" element={<BrandDetail />} />
          <Route path="/brand/detail/:id" element={<BrandDetail />} /> */}
        </Route>
        {/* <Route path="*" element={<NotFound />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
