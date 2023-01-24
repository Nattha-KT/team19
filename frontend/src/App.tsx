import React, { useEffect, useState } from "react";
import { Router, Routes, Route, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./App.css";

// Components
import Navbar from "./components/Navbar";
import ShowCardBlog from "./components/blog/ShowCardBlog";
import Article from "./components/blog/Article";
import SignIn from "./components/SignIn";
import CreateArticle from "./components/blog/CreateArticle";
import UpdateArticle from "./components/blog/UpdateArticle";
import Home from "./components/Home";
import ShowCardCourseService from "./components/CourseService/ShowCardCourseService";

function App() {
  const [token, setToken] = useState<String>("");
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return <SignIn />;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="articles" element={<ShowCardBlog />} />
          <Route path="article/:id" element={<Article />} />
          <Route path="course" element={<ShowCardCourseService  />} />
          <Route path="article/create-article" element={<CreateArticle />} />
          <Route path="article/:id/update-article" element={<UpdateArticle />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
