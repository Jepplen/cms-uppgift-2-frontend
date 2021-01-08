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
                    <Button>Home</Button>
                </Link>
            </HomeBox>
            <LogoBox>
                <h1>Logo</h1>
            </LogoBox>
            <NavBox>                   
            <NavReviews>
            <Link to="create-review">
                    <Button>Write a review</Button>
                </Link>
            {props.isAuthed ?
                <Link to="my-reviews">
                    <Button>My reviews</Button>
                </Link>
                :
                null
            }
                
            </NavReviews>
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
        backgroundColor: "#450079",
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
    backgroundColor: "lightred",
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
    backgroundColor: "lightgreen",
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
    backgroundColor: "dodgerblue",
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
    width: "15vw",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    //flexDirection: "row",

});