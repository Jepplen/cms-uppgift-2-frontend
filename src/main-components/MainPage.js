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
import ReviewPage from "../sub-components/ReviewPage";
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
    let current_cookie = document.cookie;
    setInterval(() => {
      if (current_cookie !== document.cookie) {
        current_cookie = document.cookie
        changedCookie();
      }
    }, 500);

    console.log(isAuthed, !!userData.profileId);

    if (isAuthed && !userData.profileId){
      getUserData();
    }
  },[]);

  

  const changedCookie = () => {
    console.log("COOKIE HAS CHANGED");
    setToken(CookieService.get("access_token"))
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

  function getUserData(){
    console.log("NEW: " + token);
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.get("/users/me", config
        ).then((response) => {
            console.log(response);
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
        console.log(response);

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


  

//   function updateUserDataInMainPage(data){
//     const userData = {
//         userId: data.user.id,
//         email: data.user.email,
//         profileId: data.user.profile.id,
//         username: data.user.profile.profile_name,
//         description: data.user.profile.profile_description, 
//     };
//     updateUserData(userData);
// }

  
  return (
    
      <Router>
        <Header isAuthed={isAuthed} token={token}/>
        <PrimaryContent>
          <GenresNav />
          <ContentBox>
            {isAuthed ? <p>Logged in</p> : <p>Logged out</p>}
            <Content>
              <Switch>            
                <Route path="/" exact render={() => (<Home isAuthed={isAuthed} token={token} />)}/>
                <Route path="/my-reviews" render={() => (<MyReviews isAuthed={isAuthed} userData={userData} token={token}/>)}/>
                <Route path="/login" render={() => (<LoginPage isAuthed={isAuthed} updateUserData={updateUserData} token={token}/>)}/>
                <Route path="/register" render={() => (<RegisterPage isAuthed={isAuthed} updateUserData={updateUserData} token={token}/>)}/>
                <Route path="/genre" render={() => (<Genre isAuthed={isAuthed} token={token}/>)}/>
                <Route path="/create-review" render={() => (<CreateReviewPage isAuthed={isAuthed} userData={userData} token={token}/>)}/>
                <Route path="/review" render={() => (<ReviewPage isAuthed={isAuthed} userData={userData} token={token}/>)}/>
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
  //height: "80vh",
});

const ContentBox = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "85vw",
  //height: "80vh",
  backgroundColor: "blanchedalmond"
});