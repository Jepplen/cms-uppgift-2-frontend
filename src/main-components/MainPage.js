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
import GenrePage from "../sub-components/GenrePage";
import Footer from "./Footer";
import CreateReviewPage from "../sub-components/CreateReviewPage";
import EditReviewPage from "../sub-components/EditReviewPage";
import ReviewPage from "../sub-components/ReviewPage";
import GamePage from "../sub-components/GamePage";
import CookieService from "../services/CookieService";
import axios from "axios";


export default function MainPage(props) {
  const [token, setToken] = useState(CookieService.get("access_token"));
  const [isAuthed, setIsAuthed] = useState(!!CookieService.get("access_token"));
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    description: "",
    userId: "",
    profileId: "",
  });

  useEffect(() => {
    cookieJar();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  function cookieJar(){
    let current_cookie = document.cookie;
    setInterval(() => {
      if (current_cookie !== document.cookie) {
        current_cookie = document.cookie
        changedCookie();
      }
    }, 500);

    if (isAuthed && !userData.profileId){
      getUserData();
    }
  }

  const changedCookie = () => {
    console.log("COOKIE HAS CHANGED");
    setToken(CookieService.get("access_token"))
    setIsAuthed(!!CookieService.get("access_token"));
  };

  const updateUserData = (data) => {
    setUserData({
      username: data.username,
      email: data.email,
      description: data.description,
      userId: data.userId,
      profileId: data.profileId,
    });
  };

  function getUserData(){
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.get("/users/me", config
        ).then((response) => {
            getProfileData(response.data.profile);
        }).catch(error => {
            console.log(error);
        });
  }

  function getProfileData(profileId){
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.get(`/profiles/${profileId}`, config
    ).then((response) => {
        const data = {
          userId: response.data.author.id,
          email: response.data.author.email,
          profileId: response.data.author.profile,
          username: response.data.author.username,
          description: response.data.profile_description,
        };
        updateUserData(data);
    }).catch(error => {
        console.log(error);
    });
  }
  
  return (
      <Router>
        <Header isAuthed={isAuthed} token={token} userData={userData.username}/>
        <PrimaryContent>
          <GenresNav />
          <ContentBox>
            <Content>
              <Switch>            
                <Route path="/" exact render={() => (<Home isAuthed={isAuthed} token={token} />)}/>
                <Route path="/my-reviews" render={() => (<MyReviews isAuthed={isAuthed} userData={userData} token={token}/>)}/>
                <Route path="/login" render={() => (<LoginPage isAuthed={isAuthed} updateUserData={updateUserData} token={token}/>)}/>
                <Route path="/register" render={() => (<RegisterPage isAuthed={isAuthed} updateUserData={updateUserData} token={token}/>)}/>
                <Route path="/genre" render={() => (<GenrePage isAuthed={isAuthed} token={token}/>)}/>
                <Route path="/create-review" render={(props) => (<CreateReviewPage {...props} isAuthed={isAuthed} userData={userData} token={token}/>)}/>
                <Route path="/edit-review" render={(props) => (<EditReviewPage {...props} isAuthed={isAuthed} userData={userData} token={token}/>)}/>
                <Route path="/game" render={(props) => (<GamePage {...props} isAuthed={isAuthed} userData={userData} token={token}/>)}/>
                <Route path="/review" render={(props) => (<ReviewPage {...props} isAuthed={isAuthed} userData={userData} token={token}/>)}/>
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
});

const ContentBox = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "85vw",
  backgroundColor: "blanchedalmond"
});