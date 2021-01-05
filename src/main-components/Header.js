import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { styled } from '@glitz/react';
import CookieService from "../services/CookieService";
//let cookie = browser.cookies.onChanged.addListener(CookieService.get("access_token"));

export default function Header(props){
    //const [isAuthed, setIsAuthed] = useState(props.isAuthed);
    //const [redirect, setRedirect] = useState(false);

    // useEffect(() => {
    //     setIsAuthed(props.isAuthed);
    // },[props.isAuthed]);

    function handleLogout(){
        CookieService.remove("access_token");
    }



    return(

        <Content>
            <HomeBox>
                <Link to="/">
                    <p>Home</p>
                </Link>
            </HomeBox>
            <LogoBox>
                <h1>Logo</h1>
            </LogoBox>
            <NavBox>                
                
                    <NavReviews>
                    {props.isAuthed ?
                        <Link to="my-reviews">
                            <p>My Reviews</p>
                        </Link>
                        :
                        null
                    }
                        <Link to="create-review">
                            <p>Create review</p>
                        </Link>
                    </NavReviews>
                {props.isAuthed ? 
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                : 
                    <Link to="login">
                        <LoginButton>Login</LoginButton>
                    </Link>
                }
                
            </NavBox>
        </Content>
    );
}



const Content = styled.div({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100vw",
    height: "20vh",
    backgroundColor: "#EFA292",
    fontSize: '18px',
    color: "white",
});

const HomeBox = styled.div({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "20vw",
    height: "20vh",
    backgroundColor: "lightred",
    fontSize: '18px',
    color: "white",
});

const LogoBox = styled.div({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "55vw",
    height: "20vh",
    backgroundColor: "lightgreen",
    fontSize: '18px',
    color: "black",
});

const NavBox = styled.div({
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    width: "25vw",
    height: "20vh",
    backgroundColor: "dodgerblue",
    fontSize: '18px',
    color: "white",
});

const LoginButton = styled.button({
   
});


const NavReviews = styled.div({
    width: "15vw",
    height: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    //flexDirection: "row",

});