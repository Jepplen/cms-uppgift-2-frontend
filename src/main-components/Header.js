import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import { styled } from '@glitz/react';
import CookieService from "../services/CookieService";
import IconLogo from "../resources/icon_logo.png";
import BobOmb from "../resources/bob-omb.png";
import Logo from "../resources/logo.png";
//let cookie = browser.cookies.onChanged.addListener(CookieService.get("access_token"));

export default function Header(props){
    function handleLogout(){
        CookieService.remove("access_token");
    }

    return(
        <Content>
            <HomeBox>
                <Link to="/">
                    <ButtonLogo><IconLogoImg src={BobOmb}/></ButtonLogo>
                </Link>
            </HomeBox>
            <LogoBox>
                <LogoImg src={Logo}/>
            </LogoBox>
            <NavBox>    
            {!props.isAuthed ?               
                <NavReviews>
                    <Link to="create-review">
                        <Button>Write a review</Button>
                    </Link>
                </NavReviews>
                :
                <NavReviews>
                    <Link to="my-reviews">
                        <Button>My reviews</Button>
                    </Link>
                    <Link to="create-review">
                    <Button>Write a review</Button>
                    </Link>
                </NavReviews>
                }
                    {props.isAuthed ? 
                    <Link>
                        <LogButton onClick={handleLogout}>
                            Logout
                        </LogButton>
                        </Link>
                    : 
                        <Link to="login">
                            <LogButton>Login</LogButton>
                        </Link>
                    }
                
            </NavBox>
            {props.isAuthed ? <LoggedInUser>Hello {props.userData}</LoggedInUser> : null}
        </Content>
    );
}

const LoggedInUser = styled.p({
    position: "absolute",
   // zIndex: "3",
    top: "20px",
    right: "54px",
    color: "white",

});

const LogoImg = styled.img({
    height: "90px",
    transform: "translateX(30%)",
});

const IconLogoImg = styled.img({
    width: "75px"
});

const ButtonLogo = styled.button({
    margin: {
        top: "10px",
    },
    
    backgroundColor: "#9100ff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    outline: "none",
    ':active': {
        backgroundColor: "#450078",
    },
    margin: {
        x: "10px",
    },
    padding: {
        xy: "10px",
    },
    cursor: "pointer",
});

const Button = styled.button({
    margin: {
        top: "10px",
    },
    width: "120px",
    height: "25px",
    backgroundColor: "#9100ff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    outline: "none",
    ':hover': {
        backgroundColor: "#c981ff",
    },
    ':active': {
        backgroundColor: "#450078",
    },
    margin: {
        x: "10px",
    },
    cursor: "pointer",
});

const LogButton = styled.button({
    margin: {
        top: "10px",
    },
    width: "120px",
    height: "25px",
    backgroundColor: "#9100ff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    outline: "none",
    ':hover': {
        backgroundColor: "#c981ff",
    },
    ':active': {
        backgroundColor: "#450078",
    },
    margin: {
        x: "10px",
    },
    cursor: "pointer",
});


const Content = styled.div({
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100vw",
    height: "20vh",
    backgroundColor: "#EFA292",
    fontSize: '18px',
    color: "white",
    zIndex: "2",
});

const HomeBox = styled.div({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "20vw",
    height: "20vh",
    backgroundColor: "#2a2a2a",
    fontSize: '18px',
    color: "white",
});

const LogoBox = styled.div({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "45vw",
    height: "20vh",
    backgroundColor: "#2a2a2a",
    fontSize: '18px',
    color: "black",
});

const NavBox = styled.div({
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    width: "35vw",
    height: "20vh",
    backgroundColor: "#2a2a2a",
    fontSize: '18px',
    color: "white",
});

const LoginButton = styled.button({
   width: "100px",
   margin: {
       right: "50px",
   },
});


const NavReviews = styled.div({
    width: "21vw",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
});