import React from "react";
import {Link} from "react-router-dom";
import { styled } from '@glitz/react';
import CookieService from "../services/CookieService";
//let cookie = browser.cookies.onChanged.addListener(CookieService.get("access_token"));

export default function Header(props){
//const [loggedIn, setLoggedIn] = useState(props.isAuthed);
    //const [redirect, setRedirect] = useState(false);

    // useEffect(() => {
    //     setIsAuthed(props.isAuthed);
    // },[props.isAuthed]);

    function handleLogout(){
        CookieService.remove("access_token");
        //setLoggedIn(false;)
    }

    // if (!loggedIn){
    //     return <Redirect to="/" />
    // }


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
                    <Button>My reviews</Button>
                </Link>
                :
                null
            }
                <Link to="create-review">
                    <Button>Write a review</Button>
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
        backgroundColor: "#450079",
    },
    margin: {
        x: "10px",
    },
    cursor: "pointer",
});


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