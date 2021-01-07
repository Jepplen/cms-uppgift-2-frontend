import React, {useState} from "react";
import { styled } from '@glitz/react';
import axios from "axios";
import {Link} from "react-router-dom";
import CookieService from "../services/CookieService";
//import DefaultProfilePicture from "../resources/profile_pictures/default.jpg";
import {updateToken} from "../services/store.js";

export default function RegisterPage(props){
    //const [token, setToken] = useState(CookieService.get("access_token"));
    const [state, setState] = useState({
        username: "",
        email: "",
        password: "",
        profile_description: "This is my profile",
        profile_picture: null,
      })
    

    function onChange (e) {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    }

    function onSubmit(e){
        e.preventDefault();
        axios.post("/auth/local/register", {
            "username": state.username,
            "email": state.email,
            "password": state.password,
        })
        .then(response => {
            const token = response.data.jwt;
            CookieService.set("access_token", token);
            updateToken(token);
            //setToken(token);
            createProfile({token: token, userId: response.data.user.id});
        })
        .catch(error => {
            console.log(error);
        });
        //setState({username: "", email: "", password: ""});
    }

    function createProfile(args){
        const config = {
            headers: { Authorization: `Bearer ${args.token}` }
        };
        
        const bodyParameters = {
            profile_name: state.username,
            profile_description: state.profile_description,
            //profile_picture: state.profile_picture ? state.profile_picture : DefaultProfilePicture
        };

        axios.post("/profiles", bodyParameters, config
        ).then((response) => {
            console.log(response);
            updateUserData(response.data);
            //addProfilePicture({token: args.token, userId: args.userId, profileId: response.data.id})
        }).catch(error => {
            console.log(error);
        });
    }

    function updateUserData(data){
        const userData = {
            userId: data.author.id,
            email: data.author.email,
            profileId: data.id,
            username: data.profile_name,
            description: data.profile_description, 
        };
        props.updateUserData(userData);
    }

    return(
        <ContentBox>
            {!props.isAuthed ? <Register>Register a new account</Register> : null}
            {props.isAuthed ? 
                <Blank>
                    <Text>Great! Now you can start writing reviews.</Text>
                    <Link to={"/create-review"}
                    >
                        <Button>Write a review</Button>
                    </Link>
                </Blank>
                :
                <Form onSubmit={onSubmit}> 
                    <FormBox>
                        <label htmlFor={"username"}>Username</label>   
                        <InputField 
                            id={"username"}                   
                            type="text"
                            name={"username"}
                            value={state.user}
                            onChange={onChange}
                        />
                        <label htmlFor={"email"}>Email</label>    
                        <InputField
                            id={"email"}
                            type="text"
                            name={"email"}
                            value={state.email}
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
                        {/*<label for={"profile_picture"}>Profile picture</label>    
                        <InputField
                            id={"profile_picture"}
                            type="file"
                            name={"profile_picture"}
                            value={state.profile_picture}
                            onChange={onChange}
                        />*/}
                        <LoginButton type="submit">Register</LoginButton>
                        <Link to="/login"><p>Already have an account? Login</p></Link>
                    </FormBox>
                </Form>
            }
        </ContentBox>
    );
}



const Button = styled.button({
    margin: {
        top: "50px",
    },
    width: "150px",
    height: "50px",
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
});

const Register = styled.p({
    fontSize: "25px",
    margin: {
        right: "20%",
        top: "100px",
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
        top: "50px",
    },
});

const Text = styled.p({

});


const Blank = styled.div({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: {
        right: "20%",
        top: "150px",
    },
});

