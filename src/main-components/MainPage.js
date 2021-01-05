import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { styled } from '@glitz/react';
import Header from "./Header";
import GenresNav from "./GenresNav";
import Content from "./Content";
import Home from "../sub-components/Home";
import MyReviews from "../sub-components/MyReviews";
import LoginPage from "../sub-components/LoginPage";
import RegisterPage from "../sub-components/RegisterPage";
import Genre from "../sub-components/Genre";
import Footer from "./Footer";
import CreateReviewPage from "../sub-components/CreateReviewPage";
import CookieService from "../services/CookieService";
import axios from "axios";


export default function MainPage(props) {
  //const [token, setToken] = useState(CookieService.get("access_token"));
  const [isAuthed, setIsAuthed] = useState(!!CookieService.get("access_token"));
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    description: "",
    userId: "",
    profileId: "",
  });


  let current_cookie = document.cookie;
  useEffect(() => {
    setInterval(() => {
      if (current_cookie !== document.cookie) {
        current_cookie = document.cookie
        changed()
      }
    }, 500)
  },[]);

  const changed = () => {
    console.log("COOKIE HAS CHANGED");
    //setToken(CookieService.get("access_token"))
    setIsAuthed(!!CookieService.get("access_token"));
  };

  const updateUserData = (data) => {
    console.log(data);
    setUserData({
      username: data.username,
      email: data.email,
      description: data.description,
      userId: data.userId,
      profileId: data.profileId,
    });
  };

  
  return (
      <Router>
        <Header isAuthed={isAuthed}/>
        <PrimaryContent>
          <GenresNav />
          <ContentBox>
            {isAuthed ? <p>Logged in</p> : <p>Logged out</p>}
            <Content>
              <Switch>            
                <Route path="/" exact render={() => (<Home isAuthed={isAuthed} />)}/>
                <Route path="/my-reviews" render={() => (<MyReviews isAuthed={isAuthed} />)}/>
                <Route path="/login" render={() => (<LoginPage isAuthed={isAuthed} updateUserData={updateUserData} />)}/>
                <Route path="/register" render={() => (<RegisterPage isAuthed={isAuthed} updateUserData={updateUserData} />)}/>
                <Route path="/genre" render={() => (<Genre isAuthed={isAuthed} />)}/>
                <Route path="/create-review" render={() => (<CreateReviewPage isAuthed={isAuthed} userData={userData}/>)}/>
            </Switch>
            </Content>
          </ContentBox>
        </PrimaryContent>
        <Footer />
      </Router>
  );
}


const PrimaryContent = styled.div({
  display: "flex",
  flexDirection: "row",
  width: "100vw",
  height: "80vh",
});

const ContentBox = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "85vw",
  height: "80vh",
  backgroundColor: "blanchedalmond"
});