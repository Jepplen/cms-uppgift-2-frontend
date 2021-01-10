import React, {useState} from "react";
import { styled } from '@glitz/react';
import axios from "axios";
import {Link} from "react-router-dom";
import CookieService from "../services/CookieService";


export default function LoginPage(props){
    //const [token, setToken] = useState(props.isAuthed);
    const [state, setState] = useState({
        user: "",
        password: "",
      });

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
            const token = response.data.jwt;
            CookieService.set("access_token", token);
            updateUserData(response.data);
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
            <PageTitle>Login</PageTitle>
            {props.isAuthed ? 
                <LoginText>You're logged in!</LoginText>
                :
                <Form onSubmit={onSubmit}> 
                    <FormBox>
                        <label htmlFor={"user"}>User name or email</label>   
                        <InputField 
                            id={"user"}                   
                            type="text"
                            name={"user"}
                            value={state.user}
                            onChange={onChange}
                        />
                        <label htmlFor={"password"}>Password</label>    
                        <InputField
                            id={"password"}
                            type="password"
                            name={"password"}
                            value={state.password}
                            onChange={onChange}
                        />
                        
                        <LoginButton type="submit">Login</LoginButton>
                        <Link to="/register"><LinkText>Don't have an account?</LinkText></Link>
                    </FormBox>
                </Form>
            }
        </ContentBox>
    );
}

const LinkText = styled.p({
    width: "100%",
    padding: {
        top: "10px",
        left: "20%",
    },
    fontSize: "14px",
});

const PageTitle = styled.p({
    textAlign: "center",
    width: "20%",
    //width: "200px",
    padding: {
        x: "15px",
        y: "15px",
    },
    animationName: {
        from: {
            transform: "translate(-49%, -60px)",

        },
        to: {
            transform: "translate(-49%, 0px)",
        },
    },
    animationDuration: "1s",
    backgroundColor: "#2A2A2A",
    color: "#E1E1E1",
    transform: "translateX(-49%)",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
    borderTop: "1px solid #E1E1E1",
});

const LoginText = styled.p({
    fontSize: "20px",
    margin: {
        right: "20%",
        top: "150px",
    },
});

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

        margin: {
            right: "15%",
        },

});

const LoginButton = styled.button({
    alignSelf: "stretch",
});

const InputField = styled.input({
    alignSelf: "stretch",
})

const Form = styled.form({
    margin: {
        right: "20%",
        top: "125px",
    },
});