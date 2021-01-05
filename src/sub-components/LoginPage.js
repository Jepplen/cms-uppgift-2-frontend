import React, {useState, useEffect} from "react";
import { styled } from '@glitz/react';
import axios from "axios";
import {Link} from "react-router-dom";
import CookieService from "../services/CookieService";


export default function LoginPage(props){
    //const [token, setToken] = useState(props.isAuthed);
    const [state, setState] = useState({
        user: "",
        password: "",
      })

    // useEffect(() => {
    //     setToken(props.isAuthed);
    // },[props.isAuthed]);

    function onChange(e) {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    }

    function onSubmit(e) {
        e.preventDefault();
        axios.post("/auth/local", {
            identifier: state.user,
            password: state.password,
        })
        .then(response => {
            console.log(response);
            const token = response.data.jwt;
            CookieService.set("access_token", token);
            updateUserData(response.data);
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
        setState({user: "", password: ""});
    }   

    function updateUserData(data){
        const userData = {
            userId: data.user.id,
            email: data.user.email,
            profileId: data.user.profile.id,
            username: data.user.profile.profile_name,
            description: data.user.profile.profile_description, 
        };
        props.updateUserData(userData);
    }

    return(
        <ContentBox>
            <h1>Login Page</h1>
            {props.isAuthed ? 
                <h3>You're logged in!</h3>
                :
                <form onSubmit={onSubmit}> 
                    <FormBox>
                        <label for={"user"}>User name or email</label>   
                        <InputField 
                            id={"user"}                   
                            type="text"
                            name={"user"}
                            value={state.user}
                            onChange={onChange}
                        />
                        <label for={"password"}>Password</label>    
                        <InputField
                            id={"password"}
                            type="password"
                            name={"password"}
                            value={state.password}
                            onChange={onChange}
                        />
                        
                        <LoginButton type="submit">Login</LoginButton>
                        <Link to="/register"><p>Don't have an account? Register</p></Link>
                    </FormBox>
                </form>
            }
        </ContentBox>
    );
}

const ContentBox = styled.div({
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
});

const FormBox = styled.div({
    width: "200px",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
});

const LoginButton = styled.button({
    alignSelf: "stretch",
});

const InputField = styled.input({
    alignSelf: "stretch",
})