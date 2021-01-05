import React, {useState, useEffect} from "react";
import { styled } from '@glitz/react';
import axios from "axios";
import {Link} from "react-router-dom";
import CookieService from "../services/CookieService";
import DropDown from "../shared/DropDown";

export default function CreateReviewPage(props){
    const [games, setGames] = useState([]);
    const [game, setGame] = useState({});
    //const [dropDownValue, setDropDownValue] = useState("");
    const [state, setState] = useState({
        name: "",
        header: "",
        content: "",
        rating: "",
        game: "",
        author: "Tjohej",
      });

    useEffect(() => {
        GetGames();
    },[]);

    function handleChange (e) {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        createReview();
        setState({username: "", email: "", password: ""});
    }


    function createReview(){
        const config = {
            headers: { Authorization: `Bearer ${CookieService.get("access_token")}` }
        };
        console.log(props.userData.profileId);
        const bodyParameters = {
            game_name: state.name,
            rating: parseInt(state.rating),
            title: state.header,
            review_content: state.content,
            game: JSON.stringify(state.game),
            profile: JSON.stringify(props.userData.profileId),
        };

        axios.post("/reviews", bodyParameters, config
        ).then((response) => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }

    function GetGames(){
        const config = {
            headers: { Authorization: `Bearer ${CookieService.get("access_token")}` }
        };
        
        axios.get("/games", config
        ).then((response) => {
            setGames(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    function handleDropDownValueChange(game){
        console.log(game);
        setState({game: game});

    }



    return(
        
        <ContentBox>
            <h1>Create review</h1>
            {state.game ? <Img src={state.game.box_art.formats.url}/> : null}
            {
                props.isAuthed ? 
                <form onSubmit={handleSubmit}> 
                    <FormBox>
                        <DropDown
                            header={"Choose a game"}
                            category={"Game"}
                            data={games}
                            updateValue={handleDropDownValueChange}
                        />
                        {/*<label for={"name"}>Name of game</label>   
                        <InputField 
                            id={"name"}                   
                            type="text"
                            name={"name"}
                            value={state.name}
                            onChange={handleChange}
                        />*/}
                        <label for={"rating"}>Rate the game</label>    
                        <InputField
                            id={"rating"}
                            type="text"
                            name={"rating"}
                            value={state.rating}
                            onChange={handleChange}
                        />
                        <label for={"header"}>Header of review</label>    
                        <InputField
                            id={"header"}
                            type="text"
                            name={"header"}
                            value={state.header}
                            onChange={handleChange}
                        />
                        <label for={"content"}>Content of review</label>    
                        <InputTextArea
                            id={"content"}
                            type="textarea"
                            name={"content"}
                            value={state.content}
                            onChange={handleChange}
                        />
                        <SubmitButton type="submit">Publish review</SubmitButton>
                    </FormBox>
                </form>
                :
                <h3>
                    You need to <Link to="login">Login</Link> or <Link to="register">register</Link> an account before writing reviews</h3>
                
                
            }
        </ContentBox>
    );
}

const Img = styled.img({
    width: "20vw",
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
    width: "60vw",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
});

const SubmitButton = styled.button({
    alignSelf: "stretch",
});

const InputField = styled.input({
    alignSelf: "stretch",
})

const InputTextArea = styled.textarea({
    alignSelf: "stretch",
    height: "200px",
    textAlign: "left",
    height: "200px",
})