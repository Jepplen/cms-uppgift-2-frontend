import React, {useState, useEffect} from "react";
import { styled } from '@glitz/react';
import axios from "axios";
import {Link} from "react-router-dom";
import CookieService from "../services/CookieService";
import DropDown from "../shared/DropDown";

export default function EditReviewPage(props){
    console.log(props.review);
    const [games, setGames] = useState([]);
    //const [game, setGame] = useState({});
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
        if (props.isAuthed){
            GetGames();
        }
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

        const bodyParameters = {
            game_name: state.game.title,
            rating: parseInt(state.rating),
            title: state.header,
            review_content: state.content,
            game: JSON.stringify(state.game.id),
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
            {props.isAuthed ? 
                <InnerBox>
                    <ImageBox>
                        {state.game ? <Img src={state.game.box_art.url}/> : null}
                    </ImageBox>                    
                    <FormBox onSubmit={handleSubmit}> 
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
                        <label htmlFor={"rating"}>Rate the game</label>    
                        <InputField
                            id={"rating"}
                            type="text"
                            name={"rating"}
                            value={state.rating}
                            onChange={handleChange}
                        />
                        <label htmlFor={"header"}>Header of review</label>    
                        <InputField
                            id={"header"}
                            type="text"
                            name={"header"}
                            value={state.header}
                            onChange={handleChange}
                        />
                        <label htmlFor={"content"}>Content of review</label>    
                        <InputTextArea
                            id={"content"}
                            type="textarea"
                            name={"content"}
                            value={state.content}
                            onChange={handleChange}
                        />
                        <SubmitButton type="submit">Publish review</SubmitButton>
                    </FormBox> 
                </InnerBox>
            :
                <h3>
                    You need to <Link to="login">Login</Link> or <Link to="register">register</Link> an account before writing reviews.
                </h3>
}
        </ContentBox>
    );
}

const Img = styled.img({
    width: "25vh",
});

const ContentBox = styled.div({
    width: "85vw",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
});

const InnerBox = styled.div({
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
});

const ImageBox = styled.div({
    width: "15%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    //flexDirection: "column",
});

const FormBox = styled.form({
    width: "60%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    padding: {
        left: "2%",
    }
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
})