import React, {useState, useEffect} from "react";
import { styled } from '@glitz/react';
import axios from "axios";
import {Link} from "react-router-dom";
import CookieService from "../services/CookieService";
import DropDown from "../shared/DropDown";

export default function EditReviewPage(props){
    const [content,] = useState(props.location.state.content);
    console.log(props);
    const [games, setGames] = useState([]);
    const [success, setSuccess] = useState(false);
    const [state, setState] = useState({
        gameId: content.gameId,
        name: content.gameName,
        header: content.reviewHeader,
        content: content.reviewContent,
        rating: content.rating,
        author: content.author,
        boxArtUrl: content.boxArtUrl,
        game: "",
      });

    useEffect(() => {
        if (props.isAuthed){
            GetGames();
        }
    },[]);

    function handleChange (e) {
        let value = e.target.value;

        if(e.target.name === "rating"){
            const reg = /^\d+$/;
            value = parseInt(value);

            if(!reg.test(value)){
                value = "";
                console.log("DSAD");
            } else {
                if (value > 5){
                    value = 5;
                }
            }
        }
        setState({
            ...state,
            [e.target.name]: value
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        createReview();
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

        axios.put(`/reviews/${content.reviewId}`, bodyParameters, config
        ).then(() => {
            setSuccess(true);
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
            let sortedGames = response.data.sort((a, b) => (a.title > b.title) - (a.title < b.title));
            setGames(sortedGames);
        }).catch(error => {
            console.log(error);
        });
    }

    function handleDropDownValueChange(game){
        setState({...state, game: game});  
    }

    if (success){
        return(
            <ContentBox>
                <PageTitle>Edit review</PageTitle>
                <AltText>Success! Your review has been updated.</AltText>
            </ContentBox>
        );
    }

    return(
        <ContentBox>
            <PageTitle>Edit review</PageTitle>
            {props.isAuthed ? 
                <InnerBox>
                    <ImageBox>
                        {state.game ? <Img src={state.game.box_art.url}/> : <Img src={state.boxArtUrl}/>}
                    </ImageBox>                    
                    <FormBox onSubmit={handleSubmit}> 
                        <DropDown
                            header={"Choose a game"}
                            category={"Game"}
                            data={games}
                            updateValue={handleDropDownValueChange}
                            currentGame={content.gameId}
                        />
                        <label htmlFor={"rating"}>Rate the game</label>    
                        <InputField
                            style={{width: "22px"}} 
                            maxLength={1}
                            id={"rating"}
                            type="text"
                            name={"rating"}
                            value={state.rating}
                            onChange={handleChange}
                        />
                        <label htmlFor={"header"}>Header</label>    
                        <InputField
                            id={"header"}
                            type="text"
                            name={"header"}
                            value={state.header}
                            onChange={handleChange}
                        />
                        <label htmlFor={"content"}>Content</label>    
                        <InputTextArea
                            id={"content"}
                            type="textarea"
                            name={"content"}
                            value={state.content}
                            onChange={handleChange}
                        />
                        <SubmitButton type="submit">Update review</SubmitButton>
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

const AltText = styled.p({
    margin: {
        top: "225px",
        right: "20%",
    },
});

const PageTitle = styled.p({
    textAlign: "center",
    //width: "200px",
    padding: {
        x: "15px",
        y: "15px",
    },
    animationName: {
        from: {
            transform: "translate(-100%, -60px)",

        },
        to: {
            transform: "translate(-100%, 0px)",
        },
    },
    animationDuration: "1s",
    backgroundColor: "#2A2A2A",
    color: "#E1E1E1",
    transform: "translateX(-100%)",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
    borderTop: "1px solid #E1E1E1",
});

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
    margin:{
        right: "30px",
    }
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
    height: "30px",
});

const InputField = styled.input({
    alignSelf: "stretch",
})

const InputTextArea = styled.textarea({
    alignSelf: "stretch",
    height: "200px",
    textAlign: "left",
})